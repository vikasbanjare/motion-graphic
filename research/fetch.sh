#!/usr/bin/env bash
# Downloads every link in a list for the research workflow: the first 3 minutes, at most 720p.
# Direct .mp4 links use curl; pages (YouTube, X, raivcoo…) use yt-dlp. A failed link is logged
# and skipped so one dead link never stops the batch.
#
#   bash research/fetch.sh <links.txt> <out-dir> <failures.txt> <prefix>
set -u
links=$1
out=$2
fail=$3
prefix=${4:-v}
mkdir -p "$out" "$(dirname "$fail")"
: >"$fail"

n=0
while IFS= read -r url || [ -n "$url" ]; do
  url=$(printf '%s' "$url" | tr -d '\r' | xargs)
  [ -z "$url" ] && continue
  n=$((n + 1))
  id="$prefix-$(printf '%03d' "$n")"
  case "$url" in
  *.mp4 | *.mp4\?*)
    slug=$(basename "${url%%\?*}" .mp4 | python3 -c 'import re,sys,urllib.parse; print(re.sub(r"[^A-Za-z0-9_-]+", "-", urllib.parse.unquote(sys.stdin.read().strip()))[:60])')
    if ! curl -fsSL --max-time 300 -o "$out/$id-$slug.mp4" "$url"; then
      echo -e "$url\tcurl failed" >>"$fail"
      rm -f "$out/$id-$slug.mp4"
    fi
    ;;
  *)
    if ! yt-dlp --quiet --no-warnings --no-playlist --socket-timeout 30 \
      -f "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[height<=720][ext=mp4]/bv*[height<=720]+ba/b" \
      --merge-output-format mp4 --download-sections "*0-180" --js-runtimes node \
      -o "$out/$id-%(extractor)s-%(id)s.%(ext)s" "$url" 2>>"$fail.log"; then
      echo -e "$url\tyt-dlp failed (see failures.txt.log)" >>"$fail"
    fi
    ;;
  esac
done <"$links"
echo "downloaded $(find "$out" -name '*.mp4' | wc -l) of $n links; $(wc -l <"$fail") failed"
