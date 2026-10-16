#!/usr/bin/env bash
# Downloads every link in a list for the research workflow: the first 3 minutes, at most 720p.
# Direct .mp4 links use curl, then yt-dlp with browser impersonation if the host refuses curl;
# pages (YouTube, X, raivcoo…) use yt-dlp. A failed link is logged and skipped so one dead link
# never stops the batch.
#
# Each video is named after a stable id (first 8 hex of sha1(url)), so re-running a link
# replaces its earlier result instead of duplicating it. <map.tsv> records id → url.
#
#   bash research/fetch.sh <links.txt> <out-dir> <failures.txt> <map.tsv>
# Lines are "url" or "url<TAB>referer".
#   YT_COOKIES_FILE=cookies.txt bash research/fetch.sh …   (optional, for YouTube's bot check)
set -u
links=$1
out=$2
fail=$3
map=$4
mkdir -p "$out" "$(dirname "$fail")" "$(dirname "$map")"
: >"$fail"
: >"$map"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"
FORMAT="bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[height<=720][ext=mp4]/bv*[height<=720]+ba/b"
cookies=()
if [ -n "${YT_COOKIES_FILE:-}" ] && [ -s "$YT_COOKIES_FILE" ]; then cookies=(--cookies "$YT_COOKIES_FILE"); fi

n=0
while IFS= read -r line || [ -n "$line" ]; do
  line=$(printf '%s' "$line" | tr -d '\r')
  # A line is "url" or "url<TAB>referer" (research/crawl.py writes the page the video was on).
  url=$(printf '%s' "${line%%$'\t'*}" | xargs)
  page_ref=""
  case "$line" in *$'\t'*) page_ref=$(printf '%s' "${line#*$'\t'}" | xargs) ;; esac
  [ -z "$url" ] && continue
  n=$((n + 1))
  id=$(printf '%s' "$url" | sha1sum | cut -c1-8)
  printf '%s\t%s\n' "$id" "$url" >>"$map"
  case "$url" in
  *.mp4 | *.mp4\?*)
    slug=$(basename "${url%%\?*}" .mp4 | python3 -c 'import re,sys,urllib.parse; print(re.sub(r"[^A-Za-z0-9_-]+", "-", urllib.parse.unquote(sys.stdin.read().strip()))[:50])')
    dest="$out/$id-$slug.mp4"
    referer=${page_ref:-"https://$(echo "$url" | awk -F/ '{print $3}' | sed 's/^video\.//')/"}
    if ! curl -fsSL --max-time 300 -A "$UA" -e "$referer" -o "$dest" "$url" 2>>"$fail.log"; then
      rm -f "$dest"
      # Hosts behind bot protection refuse curl's TLS fingerprint; yt-dlp can impersonate Chrome.
      if ! yt-dlp --quiet --no-warnings --impersonate chrome --referer "$referer" -o "$dest" "$url" 2>>"$fail.log"; then
        echo -e "$url\tdownload refused (curl and impersonated yt-dlp)" >>"$fail"
        rm -f "$dest"
      fi
    fi
    ;;
  *)
    ref=()
    if [ -n "$page_ref" ]; then ref=(--referer "$page_ref"); fi
    if ! yt-dlp --quiet --no-warnings --no-playlist --socket-timeout 30 "${cookies[@]}" "${ref[@]}" \
      -f "$FORMAT" --merge-output-format mp4 --download-sections "*0-180" --js-runtimes node \
      -o "$out/$id-%(extractor)s-%(id)s.%(ext)s" "$url" 2>>"$fail.log"; then
      # Vimeo embeds often answer 401 to yt-dlp from datacenter IPs; ask the player config instead.
      stream=""
      case "$url" in *vimeo.com/*) stream=$(python3 "$(dirname "$0")/vimeo_config.py" "$url" "${page_ref:-https://vimeo.com/}" 2>>"$fail.log") ;; esac
      # Still refused: play it in headless Chromium and record the stream the player requests.
      if [ -z "$stream" ] && [ "${BROWSER_GRAB:-0}" = 1 ]; then
        stream=$(timeout 120 python3 "$(dirname "$0")/browser_grab.py" "$url" "${page_ref:-$url}" 2>>"$fail.log")
      fi
      if [ -n "$stream" ] && yt-dlp --quiet --no-warnings --referer "${page_ref:-https://vimeo.com/}" \
        -f "$FORMAT" --merge-output-format mp4 --download-sections "*0-180" \
        -o "$out/$id-stream.%(ext)s" "$stream" 2>>"$fail.log"; then
        :
      else
        echo -e "$url\tyt-dlp failed (see failures log)" >>"$fail"
      fi
    fi
    ;;
  esac
done <"$links"
echo "downloaded $(find "$out" -name '*.mp4' | wc -l) files from $n links; $(wc -l <"$fail") failed"
