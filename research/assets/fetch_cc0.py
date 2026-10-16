"""Fetch CC0 / public-domain assets on GitHub's open network (the session container can't reach these hosts).

    python3 research/assets/fetch_cc0.py assets/requests/<name>.json --out <dir>

Request file:
  { "polyhaven_models": ["suitcase", "globe", ...],   search terms matched against Poly Haven model names and tags
    "polyhaven_hdris": ["studio"],
    "met_images": ["engraving globe", ...],            The Met open-access search, public-domain works with images only
    "max_per_term": 2, "res": "1k" }
Every file is CC0 (Poly Haven) or public domain (Met open access). The script writes SOURCES.md listing
each file's origin URL and licence, so the repo records where everything came from.
"""

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request

UA = {"User-Agent": "motion-kit-asset-fetch/1.0 (CC0 asset research)"}


def get(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else json.loads(data)


def save(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "wb").write(get(url, binary=True))
    return os.path.getsize(path)


def match(assets, term, n):
    t = term.lower()
    scored = []
    for aid, a in assets.items():
        hay = " ".join([aid, a.get("name", "")] + a.get("tags", []) + a.get("categories", [])).lower()
        if t in hay:
            scored.append((0 if t in (aid + a.get("name", "")).lower() else 1, -a.get("download_count", 0), aid))
    return [aid for *_, aid in sorted(scored)[:n]]


def polyhaven(kind, terms, n, res, out, sources):
    assets = get(f"https://api.polyhaven.com/assets?t={kind}")
    for term in terms:
        for aid in match(assets, term, n):
            files = get(f"https://api.polyhaven.com/files/{aid}")
            if kind == "models":
                g = files["gltf"].get(res) or next(iter(files["gltf"].values()))
                g = g["gltf"]
                base = os.path.join(out, "polyhaven", aid)
                save(g["url"], os.path.join(base, os.path.basename(g["url"])))
                for rel, inc in g.get("include", {}).items():
                    save(inc["url"], os.path.join(base, rel))
            else:
                h = files["hdri"].get(res) or next(iter(files["hdri"].values()))
                h = h.get("hdr") or next(iter(h.values()))
                save(h["url"], os.path.join(out, "polyhaven", "hdri", f"{aid}.hdr"))
            sources.append(f"| polyhaven/{aid} | {assets[aid].get('name')} | https://polyhaven.com/a/{aid} | CC0 | term: {term} |")
            print("  ✔", kind, aid, flush=True)


def met(terms, n, out, sources):
    for term in terms:
        q = urllib.parse.quote(term)
        ids = (get(f"https://collectionapi.metmuseum.org/public/collection/v1/search?isPublicDomain=true&hasImages=true&q={q}").get("objectIDs") or [])
        got = 0
        for oid in ids[:40]:
            o = get(f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{oid}")
            url = o.get("primaryImage")
            if not (o.get("isPublicDomain") and url):
                continue
            save(url, os.path.join(out, "met", f"{oid}.jpg"))
            sources.append(f"| met/{oid}.jpg | {o.get('title','')[:60]} | {o.get('objectURL')} | Public domain (CC0) | term: {term} |")
            print("  ✔ met", oid, flush=True)
            got += 1
            if got >= n:
                break


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("request")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    r = json.load(open(a.request))
    n, res = r.get("max_per_term", 2), r.get("res", "1k")
    sources = ["| file | title | source | licence | why |", "|---|---|---|---|---|"]
    for fn, args in [
        (lambda: polyhaven("models", r.get("polyhaven_models", []), n, res, a.out, sources), None),
        (lambda: polyhaven("hdris", r.get("polyhaven_hdris", []), 1, res, a.out, sources), None),
        (lambda: met(r.get("met_images", []), n, a.out, sources), None),
    ]:
        try:
            fn()
        except Exception as e:  # one source failing must not lose the others
            print("  ✖", e, file=sys.stderr)
    os.makedirs(a.out, exist_ok=True)
    open(os.path.join(a.out, "SOURCES.md"), "w").write("# CC0 / public-domain assets\n\n" + "\n".join(sources) + "\n")


if __name__ == "__main__":
    main()
