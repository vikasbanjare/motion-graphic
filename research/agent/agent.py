"""Fetch agent: runs on your own machine, does the downloads the cloud can't (YouTube, logins).

    cd motion-kit && npm run agent                 # watch the queue, every 60 s (Ctrl+C to stop)
    npm run agent -- --once                        # process what is queued, then exit
    npm run agent -- --browser safari              # whose YouTube login to use (default chrome)
    npm run agent -- --install                     # macOS: start it automatically at login (launchd)
    npm run agent -- --uninstall

How it works: Claude (in a cloud session) writes a job to brands/queue/<name>.json on the working
branch and pushes. This agent fetches the branch, sees the job, runs research/scout/scout.py
here with your browser's cookies (so YouTube's bot check passes), then publishes the result to
the brand-scout branch exactly like the GitHub workflow does:
  brands/<slug>/dossier.json + dossier.md          (facts, measurements)
  brands/<slug>/private-<id>.tar.enc.partNN + .key.enc   (films, logos, contact sheets, encrypted
                                                   to research/research-key.pub.pem: the repo is public)
  brands/<slug>/job-<hash>.done                    (so each job runs once; edit the job to re-run)

Job file:
  { "company": "Acme", "site": "https://acme.com",        (optional: omit for a video-only job)
    "channels": ["https://www.youtube.com/@acme"],          (optional)
    "videos": ["https://www.youtube.com/watch?v=..."],      (optional: always downloaded and kept)
    "keep_media": true }                                    (keep the films themselves, encrypted)
Needs: git (with push access to the repo), python3 + numpy, ffmpeg, yt-dlp, OpenSSL 3
(macOS: brew install git ffmpeg yt-dlp openssl@3; pip3 install numpy).
"""

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
STATE = os.path.expanduser("~/.motion-kit/agent")
PLIST = os.path.expanduser("~/Library/LaunchAgents/ai.motionkit.fetch-agent.plist")


def sh(*cmd, cwd=None, check=True, capture=True, env=None):
    r = subprocess.run(cmd, cwd=cwd, capture_output=capture, text=True, env=env)
    if check and r.returncode != 0:
        raise RuntimeError(f"{' '.join(cmd[:4])}… failed: {(r.stderr or r.stdout or '').strip()[-400:]}")
    return r.stdout if capture else ""


def log(msg):
    print(time.strftime("%H:%M:%S"), msg, flush=True)


def openssl():
    """OpenSSL 3 (macOS ships LibreSSL, which lacks what the encryption needs)."""
    for c in ["/opt/homebrew/opt/openssl@3/bin/openssl", "/usr/local/opt/openssl@3/bin/openssl", shutil.which("openssl") or ""]:
        if c and os.path.exists(c) and "OpenSSL 3" in sh(c, "version", check=False):
            return c
    sys.exit("OpenSSL 3 not found. macOS: brew install openssl@3")


def preflight():
    missing = [t for t in ("git", "ffmpeg", "yt-dlp") if not shutil.which(t)]
    try:
        import numpy  # noqa: F401
    except ImportError:
        missing.append("numpy (pip3 install numpy)")
    if missing:
        sys.exit("Missing: " + ", ".join(missing) + "\nmacOS: brew install git ffmpeg yt-dlp openssl@3 && pip3 install numpy")
    return openssl()


def worktree(branch="brand-scout"):
    """A separate checkout of the results branch, so the user's own working copy is never touched."""
    wt = os.path.join(STATE, "brand-scout")
    sh("git", "fetch", "-q", "origin", branch, cwd=ROOT, check=False)
    if not os.path.isdir(os.path.join(wt, ".git")) and not os.path.isfile(os.path.join(wt, ".git")):
        os.makedirs(STATE, exist_ok=True)
        has = sh("git", "ls-remote", "--heads", "origin", branch, cwd=ROOT, check=False).strip()
        if has:
            sh("git", "worktree", "add", "-f", "-B", f"agent-{branch}", wt, f"origin/{branch}", cwd=ROOT)
        else:
            sh("git", "worktree", "add", "-f", "--detach", wt, cwd=ROOT)
            sh("git", "checkout", "-q", "--orphan", f"agent-{branch}", cwd=wt)
            sh("git", "rm", "-rqf", ".", cwd=wt, check=False)
    else:
        sh("git", "reset", "-q", "--hard", f"origin/{branch}", cwd=wt, check=False)
    return wt


def jobs(branch):
    sh("git", "fetch", "-q", "origin", branch, cwd=ROOT)
    names = sh("git", "ls-tree", "--name-only", f"origin/{branch}", "brands/queue/", cwd=ROOT, check=False).split()
    out = []
    for n in names:
        if n.endswith(".json"):
            body = sh("git", "show", f"origin/{branch}:{n}", cwd=ROOT)
            out.append((os.path.splitext(os.path.basename(n))[0], body))
    return out


def done(wt, slug, h):
    return os.path.exists(os.path.join(wt, "brands", slug, f"job-{h}.done"))


def run_job(name, body, browser, ossl):
    job = json.loads(body)
    h = hashlib.sha256(body.encode()).hexdigest()[:12]
    company = job.get("company") or name
    slug = name
    wt = worktree()
    if done(wt, slug, h):
        return False
    log(f"▶ job {name}: {company}")
    tmp = tempfile.mkdtemp(prefix="mk-agent-")
    out = os.path.join(tmp, slug)
    cmd = [sys.executable, os.path.join(ROOT, "research", "scout", "scout.py"), "--company", company, "--out", out]
    if job.get("site"):
        cmd += ["--site", job["site"]]
    for c in job.get("channels", []):
        cmd += ["--channel", c]
    for v in job.get("videos", []):
        cmd += ["--video", v]
    if job.get("keep_media", True):
        cmd += ["--keep-media"]
    env = {**os.environ, "YT_COOKIES_BROWSER": browser}
    r = subprocess.run(cmd, env=env, text=True)
    if r.returncode != 0 or not os.path.exists(os.path.join(out, "dossier.json")):
        log(f"✖ scout failed for {name} (see above); will retry next round")
        shutil.rmtree(tmp, ignore_errors=True)
        return False
    dest = os.path.join(wt, "brands", slug)
    os.makedirs(dest, exist_ok=True)
    for f in ("dossier.json", "dossier.md"):
        shutil.copy(os.path.join(out, f), dest)
    rid = f"agent-{time.strftime('%Y%m%d%H%M%S')}"
    if os.path.isdir(os.path.join(out, "private")):
        key = sh(ossl, "rand", "-hex", "32").strip()
        enc = os.path.join(dest, f"private-{rid}.tar.enc")
        tar = subprocess.run(["tar", "-C", out, "-cf", "-", "private"], capture_output=True, check=True).stdout
        subprocess.run([ossl, "enc", "-aes-256-cbc", "-pbkdf2", "-salt", "-pass", f"pass:{key}", "-out", enc], input=tar, check=True)
        subprocess.run([ossl, "pkeyutl", "-encrypt", "-pubin", "-inkey", os.path.join(ROOT, "research", "research-key.pub.pem"), "-pkeyopt", "rsa_padding_mode:oaep", "-out", os.path.join(dest, f"private-{rid}.key.enc")], input=key.encode(), check=True)
        del key
        # 90 MB parts (GitHub's file limit is 100 MB)
        with open(enc, "rb") as fh:
            i = 0
            while chunk := fh.read(90 * 1024 * 1024):
                open(f"{enc}.part{i:02d}", "wb").write(chunk)
                i += 1
        os.remove(enc)
    open(os.path.join(dest, f"job-{h}.done"), "w").write(json.dumps({"job": name, "at": time.strftime("%Y-%m-%dT%H:%M:%S"), "bundle": rid}) + "\n")
    shutil.rmtree(tmp, ignore_errors=True)
    sh("git", "add", "-A", "brands", cwd=wt)
    sh("git", "commit", "-qm", f"Fetch agent: {company} ({rid})", cwd=wt)
    for attempt in range(4):
        if subprocess.run(["git", "push", "-q", "origin", "HEAD:brand-scout"], cwd=wt).returncode == 0:
            log(f"✔ {name} published to brand-scout/brands/{slug}")
            return True
        time.sleep(2 ** (attempt + 1))
        sh("git", "pull", "-q", "--rebase", "origin", "brand-scout", cwd=wt, check=False)
    log("✖ push failed: check that this clone can push to GitHub (git push works by hand?)")
    return False


def install(browser, interval):
    if sys.platform != "darwin":
        sys.exit("--install is for macOS (launchd). Elsewhere run it in a terminal, or with cron / systemd.")
    os.makedirs(os.path.dirname(PLIST), exist_ok=True)
    os.makedirs(STATE, exist_ok=True)
    path = os.environ.get("PATH", "") + ":/opt/homebrew/bin:/usr/local/bin"
    open(PLIST, "w").write(f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>ai.motionkit.fetch-agent</string>
  <key>ProgramArguments</key><array><string>{sys.executable}</string><string>{os.path.abspath(__file__)}</string><string>--browser</string><string>{browser}</string><string>--interval</string><string>{interval}</string></array>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>{path}</string></dict>
  <key>WorkingDirectory</key><string>{ROOT}</string>
  <key>RunAtLoad</key><true/><key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>{STATE}/agent.log</string><key>StandardErrorPath</key><string>{STATE}/agent.log</string>
</dict></plist>
""")
    subprocess.run(["launchctl", "unload", PLIST], capture_output=True)
    subprocess.run(["launchctl", "load", PLIST], check=True)
    print(f"✔ installed: runs at login and now. Log: {STATE}/agent.log  ·  remove: npm run agent -- --uninstall")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--branch", default="claude/youthful-darwin-n1lt7l", help="branch Claude writes jobs to")
    ap.add_argument("--browser", default="chrome", help="browser whose YouTube login yt-dlp uses (chrome, safari, firefox, edge, brave)")
    ap.add_argument("--interval", type=int, default=60)
    ap.add_argument("--once", action="store_true")
    ap.add_argument("--install", action="store_true")
    ap.add_argument("--uninstall", action="store_true")
    a = ap.parse_args()
    if a.uninstall:
        subprocess.run(["launchctl", "unload", PLIST], capture_output=True)
        if os.path.exists(PLIST):
            os.remove(PLIST)
        print("✔ removed")
        return
    ossl = preflight()
    if a.install:
        install(a.browser, a.interval)
        return
    log(f"fetch agent: watching {a.branch}/brands/queue every {a.interval}s, YouTube login from {a.browser}")
    while True:
        try:
            for name, body in jobs(a.branch):
                run_job(name, body, a.browser, ossl)
        except Exception as e:  # keep running; report and retry next round
            log(f"✖ {e}")
        if a.once:
            break
        time.sleep(a.interval)


if __name__ == "__main__":
    main()
