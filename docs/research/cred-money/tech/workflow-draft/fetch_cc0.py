#!/usr/bin/env python3
"""Fetch CC0 / public-domain images and 3D models for a film, with licence evidence per file.

Runs on a GitHub Actions runner (open internet). Standard library only.

  python3 fetch_cc0.py --requests cc0-requests.json --out out/cc0 [--si-key $SI_API_KEY]

Every accepted asset gets a manifest line (out/cc0/manifest.jsonl) with the source record URL,
the exact licence field value that was checked, and sha256 of each file. Anything whose licence
cannot be confirmed as CC0 / public domain goes to manifest-rejected.jsonl and is NOT downloaded.

Sources and the licence check used for each:
  met        collectionapi.metmuseum.org /public/collection/v1.1/search (paginated; /v1/search retired
             2026-10-01), then /v1/objects/{id}: requires isPublicDomain == true and a primaryImage.
  cleveland  openaccess-api.clevelandart.org /api/artworks/?cc0=1&has_image=1: requires
             share_license_status == "CC0" (the API returns "CC0", not the documented "Open Access").
  si3d       3d-api.si.edu /api/v1.0/content/file/search (glb), licence from the Smithsonian Open
             Access record (api.si.edu, needs a free api.data.gov key): requires usage.access == "CC0"
             on the media item that names the 3D package. Without a key: rejected as unverified.
  polyhaven  api.polyhaven.com /info/{id} + /files/{id}; every Poly Haven asset is CC0
             (https://polyhaven.com/license), recorded as policy evidence.
  khronos    KhronosGroup/glTF-Sample-Assets Models/{name}/metadata.json: every "legal" entry must be
             CC0-1.0 (models with CC-BY parts are rejected unless --allow-cc-by).
"""
import argparse, hashlib, json, os, sys, time, urllib.parse, urllib.request

UA = "motion-graphic-cc0-fetch/1.0 (research; contact via repository issues)"
MAX_BYTES = 60 * 1024 * 1024  # keep every file under GitHub's 100 MB limit with margin


def get(url, timeout=60, raw=False, tries=3):
    for k in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                data = r.read(MAX_BYTES + 1)
                if len(data) > MAX_BYTES:
                    raise ValueError(f"file over {MAX_BYTES} bytes")
                return data if raw else json.loads(data.decode("utf-8"))
        except Exception as e:  # noqa: BLE001 - report and retry
            if k == tries - 1:
                raise
            time.sleep(1.5 * (k + 1))


def save(url, path):
    data = get(url, raw=True, timeout=180)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)
    return {"path": path, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(), "url": url}


class Out:
    def __init__(self, root):
        self.root = root
        os.makedirs(root, exist_ok=True)
        self.ok = open(os.path.join(root, "manifest.jsonl"), "a")
        self.bad = open(os.path.join(root, "manifest-rejected.jsonl"), "a")

    def accept(self, rec):
        rec["fetched_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        self.ok.write(json.dumps(rec) + "\n")
        self.ok.flush()
        print("  +", rec["source"], rec["id"], rec.get("title", "")[:60])

    def reject(self, rec, why):
        rec["rejected"] = why
        self.bad.write(json.dumps(rec) + "\n")
        self.bad.flush()
        print("  -", rec.get("source"), rec.get("id"), why)


def slug(s):
    return "".join(c if c.isalnum() else "_" for c in str(s))[:60]


# ---------------------------------------------------------------- Met
def met(req, out):
    base = "https://collectionapi.metmuseum.org/public/collection"
    params = {"q": req["q"], "hasImages": "true", "limit": str(min(500, req.get("scan", 100)))}
    for k in ("departmentId", "medium", "geoLocation", "dateBegin", "dateEnd", "isHighlight", "tags", "title"):
        if k in req:
            params[k] = str(req[k])
    res = get(f"{base}/v1.1/search?" + urllib.parse.urlencode(params))
    ids = res.get("objectIDs") or res.get("data") or []
    ids = [i if isinstance(i, int) else i.get("objectID") for i in ids]
    taken = 0
    for oid in ids:
        if taken >= req.get("max", 5):
            break
        time.sleep(0.05)  # docs: stay under 80 requests/s
        o = get(f"{base}/v1/objects/{oid}")
        rec = {"source": "met", "id": oid, "title": o.get("title", ""), "record": o.get("objectURL"),
               "licence": "CC0-1.0" if o.get("isPublicDomain") else None,
               "licence_evidence": {"isPublicDomain": o.get("isPublicDomain"), "rightsAndReproduction": o.get("rightsAndReproduction")},
               "credit": o.get("creditLine"), "medium": o.get("medium"), "date": o.get("objectDate"), "request": req["q"]}
        if not o.get("isPublicDomain"):
            out.reject(rec, "isPublicDomain is not true")
            continue
        img = o.get("primaryImage")
        if not img:
            out.reject(rec, "no primaryImage")
            continue
        rec["files"] = [save(img, os.path.join(out.root, "met", f"{oid}{os.path.splitext(img)[1] or '.jpg'}"))]
        out.accept(rec)
        taken += 1


# ---------------------------------------------------------------- Cleveland
def cleveland(req, out):
    params = {"q": req["q"], "cc0": "1", "has_image": "1", "limit": str(req.get("scan", 50))}
    for k in ("type", "department", "technique"):
        if k in req:
            params[k] = req[k]
    res = get("https://openaccess-api.clevelandart.org/api/artworks/?" + urllib.parse.urlencode(params))
    taken = 0
    for a in res.get("data", []):
        if taken >= req.get("max", 5):
            break
        rec = {"source": "cleveland", "id": a.get("accession_number") or a.get("id"), "title": a.get("title", ""),
               "record": a.get("url"), "licence": "CC0-1.0" if a.get("share_license_status") == "CC0" else None,
               "licence_evidence": {"share_license_status": a.get("share_license_status")},
               "credit": a.get("creditline"), "technique": a.get("technique"), "type": a.get("type"), "request": req["q"]}
        if a.get("share_license_status") != "CC0":
            out.reject(rec, f"share_license_status={a.get('share_license_status')}")
            continue
        imgs = a.get("images") or {}
        pick = (imgs.get("print") or imgs.get("web") or {}).get("url")
        if not pick:
            out.reject(rec, "no print/web image")
            continue
        rec["files"] = [save(pick, os.path.join(out.root, "cleveland", f"{slug(rec['id'])}.jpg"))]
        out.accept(rec)
        taken += 1


# ---------------------------------------------------------------- Smithsonian 3D
def _si_cc0(pkg_uuid, title, key):
    """Find the Open Access record naming this 3D package; return (ok, evidence)."""
    for q in (pkg_uuid, title):
        res = get("https://api.si.edu/openaccess/api/v1.0/search?" + urllib.parse.urlencode({"q": q, "rows": 10, "api_key": key}))
        for row in (res.get("response") or {}).get("rows", []):
            media = (((row.get("content") or {}).get("descriptiveNonRepeating") or {}).get("online_media") or {}).get("media") or []
            for m in media:
                if pkg_uuid in json.dumps(m):
                    acc = (m.get("usage") or {}).get("access")
                    return acc == "CC0", {"edan_id": row.get("id"), "media_usage_access": acc, "title": row.get("title")}
    return False, {"note": "no Open Access record found that names this package"}


def si3d(req, out, key):
    params = {"q": req["q"], "file_type": "glb", "rows": str(req.get("scan", 100))}
    res = get("https://3d-api.si.edu/api/v1.0/content/file/search?" + urllib.parse.urlencode(params))
    by_pkg = {}
    for r in res.get("rows", []):
        c = r.get("content") or {}
        by_pkg.setdefault(c.get("model_url"), []).append((r.get("title"), c))
    taken = 0
    want = req.get("quality", ["Medium", "High", "Low_resolution", "Low_Resolution"])
    for pkg, files in by_pkg.items():
        if taken >= req.get("max", 3) or not pkg:
            continue
        title = files[0][0] or ""
        uuid = pkg.split(":")[-1]
        rec = {"source": "si3d", "id": uuid, "title": title, "record": f"https://3d.si.edu/object/3d/{uuid}", "request": req["q"]}
        if not key:
            out.reject(rec, "licence unverified (no SI_API_KEY)")
            continue
        ok, ev = _si_cc0(uuid, title, key)
        rec["licence_evidence"] = ev
        rec["licence"] = "CC0-1.0" if ok else None
        if not ok:
            out.reject(rec, "Open Access usage.access is not CC0")
            continue
        files.sort(key=lambda t: want.index(t[1].get("quality")) if t[1].get("quality") in want else 99)
        title, c = files[0]
        rec["files"] = [save(c["uri"], os.path.join(out.root, "si3d", uuid, os.path.basename(urllib.parse.urlparse(c["uri"]).path)))]
        rec["draco"] = bool(c.get("draco_compressed"))
        out.accept(rec)
        taken += 1


# ---------------------------------------------------------------- Poly Haven
def polyhaven(req, out):
    for aid in req["ids"]:
        info = get(f"https://api.polyhaven.com/info/{aid}")
        files = get(f"https://api.polyhaven.com/files/{aid}")
        res = req.get("res", "1k")
        g = ((files.get("gltf") or {}).get(res) or {}).get("gltf")
        rec = {"source": "polyhaven", "id": aid, "title": info.get("name"), "record": f"https://polyhaven.com/a/{aid}",
               "licence": "CC0-1.0", "licence_evidence": {"policy": "https://polyhaven.com/license", "authors": info.get("authors")}}
        if not g:
            out.reject(rec, f"no gltf at {res}")
            continue
        d = os.path.join(out.root, "polyhaven", aid)
        saved = [save(g["url"], os.path.join(d, os.path.basename(g["url"])))]
        for rel, f in (g.get("include") or {}).items():
            saved.append(save(f["url"], os.path.join(d, rel)))
        rec["files"] = saved
        out.accept(rec)


# ---------------------------------------------------------------- Khronos
def khronos(req, out, allow_cc_by=False):
    base = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models"
    for name in req["names"]:
        meta = get(f"{base}/{urllib.parse.quote(name)}/metadata.json")
        spdx = sorted({l.get("spdx") or l.get("license") for l in meta.get("legal", [])})
        okset = {"CC0-1.0"} | ({"CC-BY-4.0"} if allow_cc_by else set())
        rec = {"source": "khronos", "id": name, "title": meta.get("name"), "record": f"https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/{name}",
               "licence": "+".join(spdx), "licence_evidence": {"legal": meta.get("legal")}}
        if not set(spdx) <= okset:
            out.reject(rec, f"licences {spdx}")
            continue
        rec["files"] = [save(f"{base}/{name}/glTF-Binary/{name}.glb", os.path.join(out.root, "khronos", f"{name}.glb"))]
        out.accept(rec)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--requests", required=True)
    ap.add_argument("--out", default="out/cc0")
    ap.add_argument("--si-key", default=os.environ.get("SI_API_KEY", ""))
    ap.add_argument("--allow-cc-by", action="store_true")
    ap.add_argument("--only", default="", help="comma list of sources to run")
    a = ap.parse_args()
    reqs = json.load(open(a.requests))
    out = Out(a.out)
    only = set(filter(None, a.only.split(",")))
    failures = 0
    for r in reqs["requests"]:
        if only and r["source"] not in only:
            continue
        print(f"[{r['source']}] {r.get('q') or r.get('ids') or r.get('names')}")
        try:
            {"met": lambda: met(r, out), "cleveland": lambda: cleveland(r, out), "si3d": lambda: si3d(r, out, a.si_key),
             "polyhaven": lambda: polyhaven(r, out), "khronos": lambda: khronos(r, out, a.allow_cc_by)}[r["source"]]()
        except Exception as e:  # noqa: BLE001 - one bad source must not stop the run
            failures += 1
            out.reject({"source": r["source"], "id": None, "request": r}, f"error: {type(e).__name__}: {e}")
    print(f"done; {failures} request(s) failed")


if __name__ == "__main__":
    sys.exit(main())
