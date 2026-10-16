#!/bin/bash
# usage: ./render.sh CompId out.png frame
cd "$(dirname "$0")"
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts "$1" "$2" --frame="$3" --gl=swangle --browser-executable="${REMOTION_BROWSER_EXECUTABLE:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}" --log=error
