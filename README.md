# Research results

Built by .github/workflows/research.yml from research/links.txt. Runs accumulate here.

- summary.csv: one row per video (size, shots, average shot, motion, tempo, palette, suggested style)
- data/<id>-*.json: full measurements per video, including a 10 fps motion curve
- urls.tsv: video id to source link
- failures/: links each run could not download, with the downloader's errors
- sheets/run-*: encrypted contact sheets (2 frames per second), readable only with the research private key
