# Reference notes: frame-by-frame review of 251 videos

These are the working notes behind [`style-playbook.md`](style-playbook.md) and [`motion-techniques.md`](motion-techniques.md).

**How they were made**
- `.github/workflows/research.yml` downloaded each link in `research/links.txt` on GitHub's runners and measured it: cuts, shot length, motion, colours and tempo.
- It also made contact sheets at 2 frames per second, so each tile is 0.5 s.
- Frames of other people's videos are never committed in readable form. The contact sheets are encrypted on the `research-results` branch, and only measurements and these text notes are public.
- Each unique video's sheets were then read in order and described here.

**What the numbers mean**
- A three-digit number (`152`) is the video's row in the index below.
- The first six notes are the pilot videos, reviewed before the full run.
- Rows that duplicate another link are marked "duplicate". Mirrors of the same file on raivcoo and X were removed before review: 96 of 347.
- Tags in `[brackets]` are the style families used in the playbook.

**Limits**
- The review is visual. Audio was only measured for tempo.
- Colours written as hex are estimates read off compressed frames, so they are close but not exact.
- 41 YouTube links could not be downloaded, because they need the `YT_COOKIES` repository secret.

## Index of reviewed videos

| # | Id | Host | Length (s) | Shots | Avg shot (s) | Brightness | Link |
|---|---|---|---|---|---|---|---|
| 001 | `02345161` | raivcoo.com | 34.3 | 1 | 34.3 | dark | https://raivcoo.com/media/f2611825-7433-49b4-b06f-6cfe0f5aaba3 |
| 002 | `03d636ce` | raivcoo.com | 32.18 | 5 | 6.44 | light | https://raivcoo.com/media/e0d5a275-21b7-43be-a9b3-2be2ccf02000 |
| 003 | `03d733d0` | x.com | 17.05 | 1 | 17.05 | dark | https://x.com/mnowakdesign/status/2034299213954289794 |
| 004 | `0403ca27` | raivcoo.com | 82.08 | 40 | 2.05 | mixed | https://raivcoo.com/media/5e25bc4b-56f0-4ca6-9415-9da14b4f5c02 |
| 005 | `049da733` | raivcoo.com | 71.44 | 13 | 5.5 | mixed | https://raivcoo.com/media/8ee6433f-1c35-490a-99f5-28b87acfde13 |
| 007 | `05851dac` | video.showreel.design | 114 | 57 | 2 | mixed | https://video.showreel.design/videos/Firm%20-%20Studio%20-%20Produc%20Showreel.mp4 |
| 008 | `062b35d2` | video.showreel.design | 42.05 | 8 | 5.26 | mixed | https://video.showreel.design/videos/Tonik%20Showreel.mp4 |
| 009 | `066f5835` | raivcoo.com | 4.67 | 1 | 4.67 | light | https://raivcoo.com/media/1f5806bd-477e-4a7f-89d2-79982885846d |
| 010 | `06ac01ec` | raivcoo.com | 4 | 1 | 4 | light | https://raivcoo.com/media/ad2e1277-148f-4001-84a9-23a1e33bb008 |
| 011 | `0706d45d` | x.com | 20.01 | 9 | 2.22 | light | https://x.com/adrianinmotion/status/2081777469690875946 |
| 012 | `07472e7d` | video.showreel.design | 50.43 | 11 | 4.58 | dark | https://video.showreel.design/launch/Agent28.mp4 |
| 013 | `093986ad` | x.com | 55.42 | 30 | 1.85 | mixed | https://x.com/figma/status/2069822938484986249 |
| 014 | `0a334e23` | raivcoo.com | 54.06 | 2 | 27.03 | light | https://raivcoo.com/media/9bf5470d-bd27-406d-a8df-b96f84f2e46a |
| 015 | `0a8977a8` | x.com | 39.38 | 1 | 39.38 | dark | https://x.com/ElevenLabs/status/2098457076410482971 |
| 016 | `0ac5413c` | raivcoo.com | 16.58 | 5 | 3.32 | dark | https://raivcoo.com/media/a3cf9a1f-0054-481a-aef8-5588203fd256 |
| 017 | `0af39016` | raivcoo.com | 57.13 | 4 | 14.28 | light | https://raivcoo.com/media/12a0549d-1895-4107-899b-4542f51ab4c7 |
| 018 | `0afc2695` | x.com | 114.48 | 19 | 6.03 | mixed | https://x.com/Lovable/status/2077032856514162709 |
| 019 | `0b1de34b` | x.com | 141 | 43 | 3.28 | mixed | https://x.com/Lovable/status/2079600915175399687 |
| 020 | `0bbedd7a` | video.showreel.design | 30.29 | 7 | 4.33 | light | https://video.showreel.design/launch/Iconly%20Pro.mp4 |
| 021 | `0cbbe2c2` | video.showreel.design | 103.34 | 92 | 1.12 | mixed | https://video.showreel.design/videos/FLOW%20STUDIO%20SHOWREEL%202025.mp4 |
| 022 | `0e39609e` | raivcoo.com | 20.01 | 1 | 20.01 | dark | https://raivcoo.com/media/64e654df-edcd-403f-af3a-f923bd52c888 |
| 023 | `0e9a74c3` | video.showreel.design | 54.87 | 5 | 10.97 | light | https://video.showreel.design/launch/Jurni%20AI%20by%20Alex%20Socoloff%20.mp4 |
| 024 | `0f6680bc` | video.showreel.design | 53 | 17 | 3.12 | mixed | https://video.showreel.design/videos/Outthought%20Showreel.mp4 |
| 025 | `0fc5462b` | video.showreel.design | 23.36 | 13 | 1.8 | mixed | https://video.showreel.design/videos/Adrian%20Van%20Cooten%20Showreel.mp4 |
| 026 | `103cba10` | raivcoo.com | 23.85 | 6 | 3.98 | mixed | https://raivcoo.com/media/6c0fd3c6-ce9e-406f-958d-9fc9623864e8 |
| 027 | `107787a5` | video.showreel.design | 35.22 | 5 | 7.04 | dark | https://video.showreel.design/launch/JTX.mp4 |
| 028 | `122815e3` | video.showreel.design | 43.93 | 30 | 1.46 | mixed | https://video.showreel.design/videos/Orbix%20showreel%202026.mp4 |
| 029 | `135f76d6` | video.showreel.design | 48.38 | 1 | 48.38 | dark | https://video.showreel.design/launch/The%20Hypernova%20Terminal.mp4 |
| 030 | `15a7a013` | raivcoo.com | 14.08 | 10 | 1.41 | dark | https://raivcoo.com/media/0c0671a2-7bdf-4dc8-844b-a86da9fe2441 |
| 031 | `15f37e0d` | raivcoo.com | 75.91 | 16 | 4.74 | dark | https://raivcoo.com/media/f5514c0c-1366-49ca-86c9-107d033ba1a4 |
| 032 | `166dce0a` | x.com | 5.97 | 4 | 1.49 | light | https://x.com/adrianinmotion/status/2057461992575910082 |
| 033 | `167d48e2` | raivcoo.com | 19.05 | 5 | 3.81 | light | https://raivcoo.com/media/685198a6-39fc-4400-9a87-c35f6c50317e |
| 034 | `1681da7c` | raivcoo.com | 38.08 | 14 | 2.72 | light | https://raivcoo.com/media/4340b36a-82ca-4a93-a40c-177b57d93412 |
| 035 | `16be3d41` | x.com | 40 | 2 | 20 | dark | https://x.com/ElevenLabs/status/2049493164902187301 |
| 036 | `16e747de` | video.showreel.design | 26.73 | 12 | 2.23 | mixed | https://video.showreel.design/videos/Launch%20any%20thing%20branding.mp4 |
| 037 | `183a01ca` | raivcoo.com | 5.77 | 1 | 5.77 | dark | https://raivcoo.com/media/7cd0b547-248d-4d39-955d-f35788e84f4d |
| 038 | `184e8a55` | video.showreel.design | 25 | 1 | 25 | dark | https://video.showreel.design/Logo%20Animation/Heidi--DixonBaxi.mp4 |
| 039 | `18698b15` | video.showreel.design | 5 | 1 | 5 | mixed | https://video.showreel.design/Logo%20Animation/Zenchef--Verve.mp4 |
| 040 | `1a0e560e` | x.com | 51.05 | 23 | 2.22 | mixed | https://x.com/figma/status/2069824816279154840 |
| 041 | `1a509dcb` | x.com | 30.02 | 10 | 3 | dark | https://x.com/AustinBauwens/status/2036899438497571253 |
| 042 | `1ac98a19` | raivcoo.com | 1.7 | 1 | 1.7 | dark | https://raivcoo.com/media/282866be-0731-4599-84cb-731c085d0685 |
| 043 | `1b463888` | raivcoo.com | 35.75 | 1 | 35.75 | light | https://raivcoo.com/media/d0910407-0999-4bc0-93cc-8a8ab9e0783b |
| 044 | `1b9f5630` | x.com | 60.03 | 20 | 3 | light | https://x.com/a16z/status/2093330303242965464 |
| 045 | `1bda9b0b` | raivcoo.com | 35.39 | 1 | 35.39 | dark | https://raivcoo.com/media/4f9d015b-0e8f-4ab9-8001-3d25ad21fb76 |
| 047 | `1d70c0e1` | raivcoo.com | 6.58 | 6 | 1.1 | light | https://raivcoo.com/media/b357af7d-0889-41c3-8344-f2dc8839a62b |
| 048 | `2086f52f` | raivcoo.com | 31.6 | 28 | 1.13 | dark | https://raivcoo.com/media/09dd7fec-4e8c-488e-87d2-690a84250c1a |
| 049 | `20b34a31` | raivcoo.com | 144.59 | 5 | 28.92 | mixed | https://raivcoo.com/media/b1db9fdb-9e6e-4bfc-93ab-bf5b1231b815 |
| 051 | `22d58955` | x.com | 22.55 | 1 | 22.55 | dark | https://x.com/fomo/status/2093380902751465572 |
| 052 | `23024162` | x.com | 8.5 | 1 | 8.5 | dark | https://x.com/benjitaylor/status/2072392028474994745 |
| 053 | `2382220e` | video.showreel.design | 30.06 | 14 | 2.15 | mixed | https://video.showreel.design/launch/Canva%20Code%202.mp4 |
| 054 | `26602a77` | x.com | 23.3 | 1 | 23.3 | light | https://x.com/routedotfun/status/2102432346762887200 |
| 055 | `27d748bc` | raivcoo.com | 2.8 | 1 | 2.8 | dark | https://raivcoo.com/media/5cadda5c-f7ab-4cb7-92ee-427f338c9ee7 |
| 056 | `28897c15` | video.showreel.design | 25.81 | 1 | 25.81 | dark | https://video.showreel.design/launch/X%20Android%20app.mp4 |
| 058 | `2a4aafd8` | x.com | 183 | 1 | 183 | dark | https://x.com/ElevenLabs/status/1952754097976721737 |
| 059 | `2c0d16e3` | raivcoo.com | 20.1 | 4 | 5.02 | dark | https://raivcoo.com/media/d689f04f-5f60-426c-9137-febcd7cc44a2 |
| 060 | `2c1ebc0f` | video.showreel.design | 68.14 | 19 | 3.59 | mixed | https://video.showreel.design/launch/Figma%20Motion.mp4 |
| 061 | `2c7c5e03` | raivcoo.com | 58.1 | 12 | 4.84 | light | https://raivcoo.com/media/68a26837-9e16-4944-b7b7-f4cc2f972391 |
| 062 | `2e337785` | raivcoo.com | 12.93 | 6 | 2.15 | mixed | https://raivcoo.com/media/1e8f9cb3-6584-4314-91cc-15de4f5ed42b |
| 063 | `2ee18a20` | raivcoo.com | 9.38 | 1 | 9.38 | light | https://raivcoo.com/media/3a30c9bf-f863-4536-b77d-8bc2e7e212aa |
| 064 | `2f5a44f1` | x.com | 124.41 | 26 | 4.79 | mixed | https://x.com/_adishj/status/2041918607454826735 |
| 065 | `2fc8c1c8` | raivcoo.com | 18.05 | 3 | 6.02 | light | https://raivcoo.com/media/35a14977-7107-458a-8922-21531c623aeb |
| 066 | `31e46b32` | raivcoo.com | 12.78 | 1 | 12.78 | light | https://raivcoo.com/media/4e158d3e-86f1-4abd-829a-a85da6a20d69 |
| 067 | `323a1ed0` | raivcoo.com | 30.06 | 5 | 6.01 | dark | https://raivcoo.com/media/11e779bc-0410-45a0-bce3-ce9af59672e6 |
| 068 | `335ea568` | raivcoo.com | 62.76 | 4 | 15.69 | light | https://raivcoo.com/media/c270641b-c5a1-44c5-88b9-221f26b0289d |
| 070 | `3548d839` | raivcoo.com | 36.93 | 2 | 18.46 | dark | https://raivcoo.com/media/9f9d9a7c-b445-4b2a-8ca0-7a3251726c69 |
| 071 | `35613d15` | video.showreel.design | 66.18 | 14 | 4.73 | light | https://video.showreel.design/videos/DoorDash-%20Design%20Connects%20%E2%80%94%20Motion%20design.mp4 |
| 072 | `364c90e2` | x.com | 3 | 1 | 3 | light | https://x.com/elevenlabsio/status/1762576084250271922 |
| 073 | `37ccb016` | raivcoo.com | 8 | 4 | 2 | dark | https://raivcoo.com/media/13cbafb4-dea1-4fb5-bb9f-6431b9152fd7 |
| 074 | `3917d814` | x.com | 22.72 | 2 | 11.36 | light | https://x.com/ElevenLabs/status/2057840637504885216 |
| 075 | `394f3cc6` | x.com | 15.02 | 6 | 2.5 | light | https://x.com/__Stew__/status/1911694511874736444 |
| 076 | `396c5aaf` | raivcoo.com | 40.77 | 10 | 4.08 | mixed | https://raivcoo.com/media/ff7e83fe-0393-4ef5-b26c-2bf6ab356839 |
| 077 | `3a689988` | raivcoo.com | 14.83 | 1 | 14.83 | mixed | https://raivcoo.com/media/094f18ae-73f7-4e6b-9fe8-0b04ecc65b29 |
| 078 | `3b1f4359` | x.com | 12.12 | 1 | 12.12 | dark | https://x.com/OpenAI/status/2104651136699609518 |
| 079 | `3b259c99` | x.com | 20.05 | 1 | 20.05 | light | https://x.com/wabi/status/2050308987686641689 |
| 080 | `3b354b25` | video.showreel.design | 90.23 | 48 | 1.88 | light | https://video.showreel.design/videos/Clay-Showreel-2023.mp4 |
| 081 | `3b4fd4f8` | video.showreel.design | 10.8 | 1 | 10.8 | light | https://video.showreel.design/Logo%20Animation/Base%20logo%20animation--bruno.mp4 |
| 082 | `3b7f9ab0` | video.showreel.design | 18.05 | 12 | 1.5 | light | https://video.showreel.design/launch/Antitype.mp4 |
| 083 | `3c5a39c1` | x.com | 172.05 | 2 | 86.03 | mixed | https://x.com/ElevenLabs/status/2021237336793657447 |
| 085 | `3d1fd6e6` | raivcoo.com | 33.13 | 17 | 1.95 | mixed | https://raivcoo.com/media/10a50b2e-e88b-479f-a7c9-78488e2bd41b |
| 086 | `3d53b5a1` | raivcoo.com | 61.72 | 10 | 6.17 | dark | https://raivcoo.com/media/d200034b-4ed9-4242-95b9-cd17d38fc708 |
| 088 | `3de9e4c0` | x.com | 8.63 | 1 | 8.63 | light | https://x.com/nonzeroexitcode/status/2105042956583670154 |
| 090 | `3f20a01c` | video.showreel.design | 54.12 | 29 | 1.87 | light | https://video.showreel.design/videos/raw%20showreel.mp4 |
| 091 | `3f4738f8` | raivcoo.com | 9.97 | 2 | 4.98 | dark | https://raivcoo.com/media/ce23daaf-7931-484b-bfe1-204b2d6c032b |
| 092 | `3fc5edcc` | raivcoo.com | 24.09 | 18 | 1.34 | light | https://raivcoo.com/media/7c53e241-5741-4b60-aadf-3848592e0f5e |
| 093 | `4172725e` | video.showreel.design | 2 | 1 | 2 | dark | https://video.showreel.design/Logo%20Animation/HPE--Siegel%2BGale.mp4 |
| 095 | `43981a1c` | raivcoo.com | 38.89 | 2 | 19.45 | light | https://raivcoo.com/media/96dc4e8f-2ae4-4798-808c-43bc5dd511d3 |
| 097 | `443d8cfe` | video.showreel.design | 67.88 | 1 | 67.88 | light | https://video.showreel.design/launch/Assemble.mp4 |
| 098 | `44ea5160` | raivcoo.com | 20.54 | 10 | 2.05 | dark | https://raivcoo.com/media/81dd7c3b-7b16-4644-abbd-7c3f647bb89f |
| 099 | `454be375` | raivcoo.com | 22.08 | 1 | 22.08 | light | https://raivcoo.com/media/8a31f11a-76da-4a8a-bccb-53bde82fe580 |
| 100 | `45d44690` | video.showreel.design | 43.52 | 20 | 2.18 | light | https://video.showreel.design/videos/2026%20Motion%20Design%20Reel%20-%20vedant%20vaishnav%20.mp4 |
| 101 | `460653e1` | raivcoo.com | 23.02 | 7 | 3.29 | mixed | https://raivcoo.com/media/6d93df5e-2706-4426-9d06-102702ef32b1 |
| 102 | `464a4262` | raivcoo.com | 35.36 | 3 | 11.79 | light | https://raivcoo.com/media/fe016b60-fc6c-4d88-86c1-bd091fc52726 |
| 103 | `46e66d84` | x.com | 141.52 | 34 | 4.16 | dark | https://x.com/Lovable/status/2074491618824978652 |
| 104 | `470d9ee5` | video.showreel.design | 49.27 | 42 | 1.17 | dark | https://video.showreel.design/videos/Playlist%20studio%20Showreel%202025.mp4 |
| 105 | `4766d0b2` | raivcoo.com | 14.83 | 1 | 14.83 | dark | https://raivcoo.com/media/eef7e0eb-e63d-4843-a331-aa803122c09b |
| 107 | `484692ef` | video.showreel.design | 47.3 | 29 | 1.63 | mixed | https://video.showreel.design/videos/ravie-ravies-2025-showreel.mp4 |
| 108 | `49d31632` | raivcoo.com | 19.63 | 1 | 19.63 | light | https://raivcoo.com/media/bdae780b-861a-4f28-a20a-c3dd14c15ed6 |
| 109 | `49f12e22` | x.com | 156.18 | 4 | 39.05 | light | https://x.com/ElevenLabs/status/2104572127617994917 |
| 110 | `4aacd5f7` | raivcoo.com | 104.37 | 38 | 2.75 | mixed | https://raivcoo.com/media/cd4860d6-2445-416a-8a65-13e55067fbef |
| 111 | `4acdd362` | raivcoo.com | 11.05 | 12 | 0.92 | dark | https://raivcoo.com/media/db91f86e-c9a9-44f2-92cd-399108dbb5c4 |
| 112 | `4acf51dc` | raivcoo.com | 71.57 | 3 | 23.86 | light | https://raivcoo.com/media/40d61105-2f25-448c-a39f-506198516be5 |
| 113 | `4c5ea63e` | raivcoo.com | 57.28 | 10 | 5.73 | mixed | https://raivcoo.com/media/bc2294e0-c5ee-456a-a465-caa418049bd0 |
| 115 | `4d209c0a` | raivcoo.com | 16.57 | 5 | 3.31 | light | https://raivcoo.com/media/2d59048c-5d7f-45ce-b96c-30c2eb3fa03c |
| 116 | `4e5d29cf` | raivcoo.com | 26.69 | 5 | 5.34 | dark | https://raivcoo.com/media/7b65a06f-2e90-41f7-b8f1-d1ce5841e133 |
| 117 | `4eb7a228` | video.showreel.design | 124.69 | 50 | 2.49 | mixed | https://video.showreel.design/videos/MTV.OS%20Reel.mp4 |
| 119 | `4fb7a039` | raivcoo.com | 15.93 | 6 | 2.66 | light | https://raivcoo.com/media/2e470857-3bcb-41e6-8e7a-dd468840c6ed |
| 120 | `4fca96a0` | video.showreel.design | 56.33 | 47 | 1.2 | mixed | https://video.showreel.design/videos/Holographic%20showreel.mp4 |
| 121 | `514619ab` | raivcoo.com | 110.61 | 79 | 1.4 | dark | https://raivcoo.com/media/1e94976a-ce8f-461f-b985-a6a38474a008 |
| 122 | `51688fdd` | raivcoo.com | 122.6 | 102 | 1.2 | dark | https://raivcoo.com/media/a2d7d950-d748-48d5-9922-21ca2adfbd50 |
| 123 | `5173f34b` | video.showreel.design | 53.59 | 44 | 1.22 | mixed | https://video.showreel.design/videos/Made%20by%20Many.mp4 |
| 124 | `51a7ea9d` | x.com | 68.1 | 19 | 3.58 | mixed | https://x.com/1600Agency/status/2072151540131840274 |
| 126 | `52738d06` | video.showreel.design | 3.04 | 1 | 3.04 | mixed | https://video.showreel.design/Logo%20Animation/Tubi--DixonBaxi.mp4 |
| 127 | `52a62974` | video.showreel.design | 61.33 | 27 | 2.27 | light | https://video.showreel.design/videos/james-boorman-james-boorman-reel.mp4 |
| 128 | `5357c977` | video.showreel.design | 57.93 | 17 | 3.41 | light | https://video.showreel.design/videos/Riotters-Showreel-Web-UI-UX-3D-Motion.mp4 |
| 129 | `53e0b4af` | raivcoo.com | 49.07 | 43 | 1.14 | mixed | https://raivcoo.com/media/d2930e55-4775-4bd5-8bcb-8afb07fe0a7b |
| 130 | `5428ad87` | raivcoo.com | 6.25 | 1 | 6.25 | mixed | https://raivcoo.com/media/cb9fd633-1c20-4bf1-b80c-28890431fe13 |
| 131 | `543f5183` | video.showreel.design | 8.09 | 1 | 8.09 | dark | https://video.showreel.design/Logo%20Animation/Mozilla--JKR.mp4 |
| 133 | `55c44ca5` | video.showreel.design | 89.69 | 54 | 1.66 | mixed | https://video.showreel.design/videos/sander-van-dijk-reel-sander-van-dijk.mp4 |
| 134 | `5637fc17` | video.showreel.design | 58.09 | 48 | 1.21 | mixed | https://video.showreel.design/videos/Intently%20Showreel.mp4 |
| 135 | `567268cd` | x.com | 30.08 | 20 | 1.5 | light | https://x.com/brennenschlu/status/2100676516741026124 |
| 136 | `581ab7bd` | video.showreel.design | 54.27 | 22 | 2.47 | dark | https://video.showreel.design/videos/Loveable%20design%20partner%20-%202026.mp4 |
| 138 | `59d5c880` | video.showreel.design | 7.03 | 1 | 7.03 | dark | https://video.showreel.design/Logo%20Animation/dataland--Pentagram.mp4 |
| 139 | `5a2caff4` | x.com | 20.01 | 28 | 0.71 | dark | https://x.com/claudeai/status/2102435511222890900 |
| 140 | `5ae9522c` | x.com | 25.97 | 5 | 5.19 | dark | https://x.com/mosaic_so/status/2062937294093660596 |
| 143 | `5d75718e` | raivcoo.com | 8.07 | 1 | 8.07 | light | https://raivcoo.com/media/63c31434-920f-4311-947b-5538c3c49655 |
| 144 | `5e3872ae` | x.com | 31.25 | 1 | 31.25 | light | https://x.com/benjitaylor/status/2102443951898992825 |
| 145 | `5f57eacb` | x.com | 82.04 | 45 | 1.82 | mixed | https://x.com/MidcenturyAI/status/2102412610071339414 |
| 146 | `615a7fd5` | raivcoo.com | 46.08 | 2 | 23.04 | light | https://raivcoo.com/media/53e08de6-c52a-449e-ba55-825e683e1806 |
| 148 | `62609b32` | x.com | 18.84 | 1 | 18.84 | dark | https://x.com/shapelayer/status/2102453754121642129 |
| 149 | `632c96c8` | video.showreel.design | 9.7 | 3 | 3.23 | light | https://video.showreel.design/Logo%20Animation/Tripadvisor--Koto.mp4 |
| 150 | `63f61128` | raivcoo.com | 4.96 | 1 | 4.96 | dark | https://raivcoo.com/media/97f23d3f-a7a4-4b5d-ac58-392b72d81dd8 |
| 152 | `664c3565` | video.showreel.design | 5.27 | 1 | 5.27 | mixed | https://video.showreel.design/Logo%20Animation/Stackoverflow--Koto.mp4 |
| 154 | `6a4f6b80` | x.com | 72.95 | 19 | 3.84 | light | https://x.com/vanjek/status/2100544809207210298 |
| 156 | `6c6702a1` | raivcoo.com | 30.19 | 4 | 7.55 | light | https://raivcoo.com/media/93cb54b3-a5f7-4d0b-8a56-aebe8b342b65 |
| 157 | `6ce71e19` | video.showreel.design | 5.02 | 1 | 5.02 | light | https://video.showreel.design/Logo%20Animation/Inbox%20Monster--Verve.mp4 |
| 158 | `6e1079f0` | raivcoo.com | 18.6 | 4 | 4.65 | light | https://raivcoo.com/media/25c07b90-08d5-4c94-a8ef-eeaad2ab8848 |
| 159 | `6e7159e6` | x.com | 10.7 | 1 | 10.7 | light | https://x.com/Lovable/status/2097672631504023779 |
| 160 | `6ea0932e` | raivcoo.com | 30.17 | 35 | 0.86 | mixed | https://raivcoo.com/media/547ada9f-cf25-4b05-8d54-128bba5fecbf |
| 161 | `6eadea35` | video.showreel.design | 48.11 | 23 | 2.09 | mixed | https://video.showreel.design/videos/Jitter%20Ai.mp4 |
| 162 | `70f53d09` | video.showreel.design | 80.06 | 7 | 11.44 | mixed | https://video.showreel.design/videos/LimeStudio%20Showreel.mp4 |
| 163 | `7147ca49` | x.com | 30.12 | 35 | 0.86 | mixed | https://x.com/theProcessXCII/status/2082055433326411886 |
| 164 | `71ea10a7` | x.com | 43.14 | 4 | 10.78 | light | https://x.com/ElevenLabs/status/1869462840941461941 |
| 165 | `71ebbc34` | x.com | 44.05 | 10 | 4.41 | dark | https://x.com/ElevenLabs/status/2099547227223908568 |
| 166 | `7331c138` | raivcoo.com | 12.1 | 3 | 4.03 | light | https://raivcoo.com/media/a8db17cf-b7f1-489f-a1c6-dacdc7350c9b |
| 167 | `7412a0b6` | raivcoo.com | 8.07 | 2 | 4.03 | light | https://raivcoo.com/media/6d57f0a8-654c-4f08-b4a6-c3f8be222be4 |
| 168 | `743544c5` | raivcoo.com | 55.17 | 21 | 2.63 | dark | https://raivcoo.com/media/607f0fb8-90a3-4a04-9efa-59eb66175106 |
| 170 | `74c26c88` | video.showreel.design | 59.95 | 56 | 1.07 | mixed | https://video.showreel.design/videos/Alright%20Studio%20%E2%80%94%20Showreel%202026.mp4 |
| 171 | `7530763c` | video.showreel.design | 59.97 | 58 | 1.03 | light | https://video.showreel.design/videos/animade-animade-reel-2026.mp4 |
| 174 | `7772716f` | x.com | 156.48 | 35 | 4.47 | mixed | https://x.com/Lovable/status/2089707916270141638 |
| 175 | `77bbcbe6` | x.com | 50.01 | 17 | 2.94 | mixed | https://x.com/figma/status/2069825997478961314 |
| 176 | `7874ebf3` | x.com | 117 | 2 | 58.5 | light | https://x.com/ElevenLabs/status/1864011712795468094 |
| 179 | `7a00d025` | raivcoo.com | 1.97 | 1 | 1.97 | light | https://raivcoo.com/media/39c4e50d-5098-49ed-9d25-03a2335bfca3 |
| 180 | `7a458ff5` | video.showreel.design | 58.09 | 57 | 1.02 | mixed | https://video.showreel.design/videos/Ahleticsnyc.mp4 |
| 182 | `7b0fe0af` | video.showreel.design | 48.55 | 26 | 1.87 | dark | https://video.showreel.design/launch/Artlist%20Studio.mp4 |
| 183 | `7c685209` | raivcoo.com | 4.77 | 1 | 4.77 | mixed | https://raivcoo.com/media/e3e6adc6-776a-4d39-99e6-de9f57755642 |
| 187 | `8058d7fa` | video.showreel.design | 24.13 | 16 | 1.51 | mixed | https://video.showreel.design/videos/Bartek%20Portfolio%20reel.mp4 |
| 188 | `8096eff4` | raivcoo.com | 28.72 | 1 | 28.72 | mixed | https://raivcoo.com/media/695a2343-344d-484b-a0ce-f9873901f7ea |
| 189 | `80afaa74` | video.showreel.design | 58.69 | 2 | 29.34 | light | https://video.showreel.design/launch/Tavus%20Magic%20Canvas.mp4 |
| 190 | `81574dfd` | video.showreel.design | 38.67 | 14 | 2.76 | mixed | https://video.showreel.design/videos/Launch%20any%20thing%20showreel.mp4 |
| 192 | `8321b0c3` | x.com | 20.84 | 1 | 20.84 | dark | https://x.com/linear/status/2082856036977803595 |
| 193 | `8639bf21` | x.com | 23.02 | 8 | 2.88 | light | https://x.com/AustinBauwens/status/2105266407806013803 |
| 194 | `86ffd06b` | video.showreel.design | 37.55 | 4 | 9.39 | light | https://video.showreel.design/launch/Quiver%20Ai%20by%20Harshit.mp4 |
| 195 | `87842760` | x.com | 49.57 | 1 | 49.57 | light | https://x.com/ElevenLabs/status/1849083718838657186 |
| 196 | `87ce4fcd` | video.showreel.design | 62.12 | 22 | 2.82 | dark | https://video.showreel.design/launch/Instagram.mp4 |
| 198 | `885a7bb5` | video.showreel.design | 60.97 | 30 | 2.03 | mixed | https://video.showreel.design/videos/Cosmos%20Studio%20Showreel.mp4 |
| 203 | `8b3fe4da` | video.showreel.design | 5.87 | 2 | 2.93 | light | https://video.showreel.design/Logo%20Animation/The%20Org--Verve.mp4 |
| 204 | `8b482818` | x.com | 48.13 | 4 | 12.03 | light | https://x.com/ElevenLabs/status/1990473617189015637 |
| 205 | `8b54c273` | video.showreel.design | 78.76 | 10 | 7.88 | mixed | https://video.showreel.design/launch/Conveo.mp4 |
| 206 | `8bd5f979` | video.showreel.design | 141 | 44 | 3.2 | mixed | https://video.showreel.design/launch/QuickTables.mp4 |
| 207 | `8bdb00be` | x.com | 55.71 | 17 | 3.28 | dark | https://x.com/ycombinator/status/2051700953112584550 |
| 209 | `8d13e544` | video.showreel.design | 73.54 | 19 | 3.87 | light | https://video.showreel.design/launch/Brew%20by%20Anyway.mp4 |
| 210 | `8d78fc08` | video.showreel.design | 10 | 1 | 10 | dark | https://video.showreel.design/Logo%20Animation/Equals--SomeOne.mp4 |
| 212 | `8fcf8aec` | raivcoo.com | 13.82 | 8 | 1.73 | mixed | https://raivcoo.com/media/ea8609a6-f24c-433f-905c-8709100a74e7 |
| 213 | `926714cc` | raivcoo.com | 20.11 | 4 | 5.03 | mixed | https://raivcoo.com/media/5ddcb648-0513-4582-a896-923f68fbf318 |
| 214 | `9285f98d` | raivcoo.com | 7.17 | 2 | 3.58 | light | https://raivcoo.com/media/d9175e41-2ef7-4588-bedf-9259cbc4136d |
| 215 | `92dac13c` | x.com | 180.07 | 1 | 180.07 | dark | https://x.com/ElevenLabs/status/1930689774278570003 |
| 216 | `94de52fb` | video.showreel.design | 31.25 | 7 | 4.46 | light | https://video.showreel.design/launch/Codex%20Micro.mp4 |
| 217 | `982b3f82` | raivcoo.com | 5.83 | 1 | 5.83 | light | https://raivcoo.com/media/0eb1bae5-9e59-40f0-a457-b8b78611708d |
| 218 | `984d92dd` | video.showreel.design | 50.01 | 33 | 1.52 | dark | https://video.showreel.design/videos/murilo-almeida-murilo-reel.mp4 |
| 219 | `99311304` | x.com | 26.41 | 2 | 13.21 | light | https://x.com/commas/status/2090829148147069311 |
| 220 | `9a9507ae` | raivcoo.com | 157.14 | 55 | 2.86 | light | https://raivcoo.com/media/f7923f7a-1338-4445-96e6-1d50b20d4333 |
| 221 | `9b5dce58` | video.showreel.design | 75.05 | 8 | 9.38 | dark | https://video.showreel.design/Banner/Framer3.mp4 |
| 223 | `9b86a238` | video.showreel.design | 8 | 1 | 8 | dark | https://video.showreel.design/Logo%20Animation/Capacity--Pentagram.mp4 |
| 224 | `9c71bc42` | video.showreel.design | 12.84 | 2 | 6.42 | light | https://video.showreel.design/launch/Cordex.mp4 |
| 226 | `9e470c23` | raivcoo.com | 50.05 | 27 | 1.85 | mixed | https://raivcoo.com/media/7ab0033f-166e-4c9a-95bc-86872e245fce |
| 227 | `9f55d5e6` | video.showreel.design | 37.23 | 5 | 7.45 | light | https://video.showreel.design/videos/Willow%20Voice.mp4 |
| 228 | `9fab8084` | video.showreel.design | 51.05 | 18 | 2.84 | dark | https://video.showreel.design/videos/Microsoft%20Surface.mp4 |
| 229 | `a0348250` | raivcoo.com | 81.05 | 3 | 27.02 | dark | https://raivcoo.com/media/7b484197-225b-4a50-b538-c9cf31905286 |
| 230 | `a04202a1` | raivcoo.com | 7.5 | 1 | 7.5 | mixed | https://raivcoo.com/media/29a04ffa-df93-4cd3-a9b3-7866bd35dea2 |
| 232 | `a0941ba9` | video.showreel.design | 42.88 | 13 | 3.3 | dark | https://video.showreel.design/videos/Dogstudio%20showreel.mp4 |
| 234 | `a28007cd` | video.showreel.design | 89.81 | 48 | 1.87 | mixed | https://video.showreel.design/videos/Wednesday%20Studio%20Showreel.mp4 |
| 236 | `a2c51744` | raivcoo.com | 61.6 | 2 | 30.8 | light | https://raivcoo.com/media/ac464b86-15d1-4db9-8910-59fccf40fbdf |
| 237 | `a404d769` | video.showreel.design | 50.05 | 32 | 1.56 | mixed | https://video.showreel.design/videos/Makemepulse%202021-2022%20showreel.mp4 |
| 238 | `a4654f06` | raivcoo.com | 80.09 | 42 | 1.91 | light | https://raivcoo.com/media/3e80e3a4-ba08-4911-a4fd-23174ab53035 |
| 240 | `a6424cb9` | video.showreel.design | 50.88 | 35 | 1.45 | light | https://video.showreel.design/videos/Microsoft%20by%20NotReal.mp4 |
| 241 | `a6aaec6b` | x.com | 66.08 | 8 | 8.26 | light | https://x.com/SkaleSolutions/status/2103797470572724311 |
| 242 | `a6e1c00d` | raivcoo.com | 8 | 1 | 8 | light | https://raivcoo.com/media/f3625a0a-c21b-4249-87a6-53265f6ca974 |
| 244 | `a7b7da6a` | raivcoo.com | 17.43 | 6 | 2.91 | mixed | https://raivcoo.com/media/2e69d624-10d8-4272-905d-196c79b9bf5b |
| 245 | `a9a041e4` | video.showreel.design | 10 | 1 | 10 | light | https://video.showreel.design/Logo%20Animation/MICROSOFT%2050th--Koto.mp4 |
| 246 | `abe49adf` | x.com | 40.3 | 2 | 20.15 | light | https://x.com/X/status/2102147636702634195 |
| 247 | `ac0ee68c` | raivcoo.com | 41.22 | 20 | 2.06 | mixed | https://raivcoo.com/media/0d120013-a6d8-4de0-9fe1-02d138b40b57 |
| 252 | `b2c6e6c4` | raivcoo.com | 13 | 3 | 4.33 | dark | https://raivcoo.com/media/336f71dd-9cd5-46f5-a653-261a2e3a1529 |
| 257 | `b51f8407` | x.com | 93.71 | 14 | 6.69 | dark | https://x.com/ycombinator/status/2051663215139193155 |
| 258 | `b785b803` | raivcoo.com | 25.82 | 20 | 1.29 | dark | https://raivcoo.com/media/1bf53b1a-3733-49a0-9c8f-fe836d006064 |
| 259 | `b81a8c3a` | x.com | 49.02 | 40 | 1.23 | mixed | https://x.com/useincredible/status/2102382407471263760 |
| 261 | `b9feddd2` | video.showreel.design | 32.92 | 8 | 4.11 | mixed | https://video.showreel.design/Banner/Elevenlab.mp4 |
| 262 | `ba1bf8f8` | x.com | 50.93 | 1 | 50.93 | dark | https://x.com/elevenlabsio/status/1962912811392131214 |
| 263 | `bb32e663` | raivcoo.com | 4.2 | 1 | 4.2 | dark | https://raivcoo.com/media/7f3162f4-fc9d-4911-a480-46cf76f174ab |
| 264 | `c10ba0a8` | raivcoo.com | 45.46 | 14 | 3.25 | dark | https://raivcoo.com/media/2e9b28a8-aef1-4172-8fa0-c78249e9af0d |
| 265 | `c13578e1` | raivcoo.com | 26.17 | 8 | 3.27 | dark | https://raivcoo.com/media/74156708-8ac1-461a-9f35-d52924e213d2 |
| 266 | `c160d27e` | raivcoo.com | 85.08 | 58 | 1.47 | mixed | https://raivcoo.com/media/775986f7-869e-4978-93a6-d33c024d9223 |
| 267 | `c47cf4e8` | video.showreel.design | 4.02 | 1 | 4.02 | dark | https://video.showreel.design/Logo%20Animation/Bynder--Verve.mp4 |
| 268 | `c4bef9e3` | video.showreel.design | 57.02 | 13 | 4.39 | light | https://video.showreel.design/videos/New%20Opacity%20Branding.mp4 |
| 269 | `c69a60d5` | video.showreel.design | 49.5 | 17 | 2.91 | mixed | https://video.showreel.design/videos/Intently%20showreel%202026.mp4 |
| 271 | `c88a9add` | raivcoo.com | 9.8 | 1 | 9.8 | light | https://raivcoo.com/media/13ab0033-d8bf-4e37-be78-37afaa1c47c3 |
| 274 | `ca0b7913` | video.showreel.design | 10 | 1 | 10 | mixed | https://video.showreel.design/Logo%20Animation/Otter--Firmalt.mp4 |
| 278 | `cb31811f` | x.com | 70.4 | 28 | 2.51 | light | https://x.com/Base44/status/2057113621910475065 |
| 282 | `cd2e2904` | video.showreel.design | 8.09 | 1 | 8.09 | dark | https://video.showreel.design/Logo%20Animation/Uber--JKR.mp4 |
| 286 | `cfd8c5d4` | video.showreel.design | 18.17 | 1 | 18.17 | dark | https://video.showreel.design/Logo%20Animation/UKG--Lippincott.mp4 |
| 289 | `d1b6fa22` | video.showreel.design | 57.75 | 24 | 2.41 | mixed | https://video.showreel.design/videos/Brymstudio%20Showreel.mp4 |
| 290 | `d26a6b7b` | raivcoo.com | 27.12 | 10 | 2.71 | dark | https://raivcoo.com/media/8d41e767-fe48-4677-9e7c-bb4eadb36167 |
| 291 | `d351a9cc` | raivcoo.com | 13.47 | 3 | 4.49 | light | https://raivcoo.com/media/4ddebcc5-561c-484d-90dc-ebded8b119c3 |
| 292 | `d4a7736c` | raivcoo.com | 4.8 | 2 | 2.4 | light | https://raivcoo.com/media/638d69a7-34aa-40f4-a27e-f65180dfbc73 |
| 296 | `d8a46bc5` | x.com | 60.01 | 11 | 5.46 | light | https://x.com/elevenlabsio/status/1749863738570690692 |
| 297 | `d8e133bb` | video.showreel.design | 5.03 | 1 | 5.03 | light | https://video.showreel.design/Logo%20Animation/0x--Tubik%20Studio.mp4 |
| 299 | `dc6da702` | raivcoo.com | 18.5 | 1 | 18.5 | light | https://raivcoo.com/media/9c0d2ee6-0edf-449f-b544-150d4428421a |
| 300 | `dcd1207c` | video.showreel.design | 16.04 | 10 | 1.6 | dark | https://video.showreel.design/Logo%20Animation/Framer%20Logo%20animation--galshirart.mp4 |
| 301 | `de29642a` | video.showreel.design | 46.04 | 2 | 23.02 | light | https://video.showreel.design/videos/X%20Ai%202026.mp4 |
| 304 | `e1e3cbc2` | video.showreel.design | 2.93 | 1 | 2.93 | dark | https://video.showreel.design/Logo%20Animation/Yahoo--JKR.mp4 |
| 306 | `e4906c8a` | video.showreel.design | 34.08 | 46 | 0.74 | mixed | https://video.showreel.design/videos/Lukas%20Mascher%20Showreel%202025.mp4 |
| 308 | `e65f99f6` | video.showreel.design | 63.14 | 64 | 0.99 | dark | https://video.showreel.design/videos/Cinema-4D-2026%20Showreel.mp4 |
| 309 | `e68ce8f9` | raivcoo.com | 7.67 | 1 | 7.67 | light | https://raivcoo.com/media/cdfb2394-a9a7-4dff-a458-dd8271bead36 |
| 310 | `e6dff579` | video.showreel.design | 110.06 | 77 | 1.43 | mixed | https://video.showreel.design/videos/Tubik%20Studio%20Showreel%202025.mp4 |
| 311 | `e756df16` | video.showreel.design | 21.18 | 19 | 1.11 | mixed | https://video.showreel.design/videos/Francesco%20Prisco%20Showreel.mp4 |
| 313 | `ea433ebf` | x.com | 66.33 | 1 | 66.33 | dark | https://x.com/ElevenLabs/status/1968344592740434188 |
| 314 | `eb5f9733` | video.showreel.design | 63.17 | 55 | 1.15 | dark | https://video.showreel.design/videos/Koto.mp4 |
| 315 | `ec9cd0d7` | video.showreel.design | 40.3 | 3 | 13.43 | dark | https://video.showreel.design/launch/Spotify%20for%20Artists.mp4 |
| 317 | `eef22c53` | raivcoo.com | 69.15 | 5 | 13.83 | mixed | https://raivcoo.com/media/0b1a2f77-9a83-49d0-a11a-6529f1b86afb |
| 321 | `f253869b` | raivcoo.com | 7.07 | 1 | 7.07 | dark | https://raivcoo.com/media/6b63e2ea-470c-453d-a7f3-0d114521665d |
| 324 | `f406c7ff` | video.showreel.design | 50.26 | 16 | 3.14 | dark | https://video.showreel.design/videos/Figure.mp4 |
| 326 | `f4424ecc` | video.showreel.design | 50.22 | 21 | 2.39 | dark | https://video.showreel.design/videos/UI-UX-Project-Showreel-Orbix-Studio.mp4 |
| 328 | `f711b01c` | raivcoo.com | 10.87 | 3 | 3.62 | mixed | https://raivcoo.com/media/c6d1f1a8-d048-47b7-ac6f-17637ec9994c |
| 329 | `f7cd9227` | video.showreel.design | 24.87 | 20 | 1.24 | mixed | https://video.showreel.design/videos/Addition.mp4 |
| 330 | `f962abff` | raivcoo.com | 1.77 | 1 | 1.77 | light | https://raivcoo.com/media/61745463-16b0-4c52-9e17-bc887e8f9d1a |
| 331 | `f96e46b5` | raivcoo.com | 17.17 | 1 | 17.17 | light | https://raivcoo.com/media/4fd4d476-d436-475b-8d1d-a8617338ba08 |
| 332 | `f987eecb` | x.com | 49.77 | 5 | 9.95 | light | https://x.com/ycombinator/status/2061526376763777441 |
| 333 | `f9aad00e` | video.showreel.design | 46.66 | 27 | 1.73 | dark | https://video.showreel.design/videos/Vivid%20Motion%20Showreel.mp4 |
| 334 | `f9bfb6e0` | x.com | 57.8 | 1 | 57.8 | dark | https://x.com/flavioschneider/status/1894820281782542639 |
| 335 | `fa67f949` | raivcoo.com | 30.49 | 7 | 4.36 | mixed | https://raivcoo.com/media/73775e05-990c-4f55-9aaf-f04cb0a88d03 |
| 339 | `fcbe0727` | x.com | 80.27 | 26 | 3.09 | dark | https://x.com/_adishj/status/2062203755718930550 |
| 345 | `ff1e7ca9` | video.showreel.design | 68.54 | 12 | 5.71 | light | https://video.showreel.design/launch/Zaro%20Ai.mp4 |

## Notes

### Pilot videos

#### Pilot: X 2069827477296353280 — Figma Motion launch (68 s, 16:9)
- Open (0–3 s): blob morph. Single white dot grows from a stem on lime, splits into overlapping white circles that merge (metaball/gooey), resolves into the product's flower icon. Shape-morph intro = brand mark born from primitives.
- Palette: lime #D4F65A-ish, forest green #0F5A2A, white; later electric violet #5B2BE0 + lavender #C9C0F5; orange #FF6A3D type on black. 2–3 colours per scene, one scene palette at a time.
- Product UI sequence: real app screen, slow push-in, timeline panel visible; cursor (big black arrow, ~1.5x OS size) drives every action — click, drag keyframe, pick easing.
- Title card "Figma Motion": orange sans on black, surrounded by small floating photo/collage cards that parallax-drift (mixed-media collage around a title).
- Feature demo: purple toggle switch; selection box w/ handles; keyframe track; easing panel shows curve morphing linear → ease-in-out → spring overshoot (the curve itself is the hero). End state "Unlocked" toggle pill (condensed bold type).
- Path animation: lettered nodes (A–F) travel along maze-like paths; animation-styles menu (Position/Scale/Rotation/Opacity).
- AI prompt beat: prompt box types "Create a glitchy type animation, staggering the shapes" → result: pixel/glitch type "CANYON CREW MEETUP" scrambles in (character glitch, staggered).
- 3D transform: photo card tilts in perspective with hand cursor; then a fan of tilted cards (card deck / perspective stack) with logo sticker "M✲SF" popping in.
- Multiplayer: comment bubble "Let's speed up this part" + collaborator cursors with name tags (Hyein, Gilles) — social proof of collaboration.
- Motion tokens: icon grid with easing presets "Brand: Linear / Snappy / Playful" — same icons animate differently per preset.
- Code export: panel shows CSS @keyframes (rotate) → "Copy Keyframes".
- Close: tagline "Set your ideas in motion" (orange, centre) with collage cards orbiting + rotating angle readouts (287°, 358°); then primitives (circles/squares with selection handles) assemble into the Figma logo on black. Logo built from shapes = bookend of the opening.
- Rhythm: many cuts ~1–2 s in demo; title/tagline held 2–3 s.

#### Pilot: raivcoo 09dd7fec — "inside every artist's brain" (31.6 s, 16:9)
- Kinetic type, one word per beat ("inside / every / artist's / brain"), white bold sans centred, over scan-line glitch footage (RGB-shifted horizontal line texture of a hand).
- Then documentary/archival footage montage: macro eye, fingerprint, MRI scan, Mona Lisa crop, archive shelves — cut every ~0.5–1 s.
- Small centred lower-middle subtitles (karaoke-like captions) carry the narration over every shot.
- Collage interlude: small image cards scattered on black, appearing one by one around a central object (brain), "differently."
- Colour: per-shot duotone/tints (magenta, cyan, green), film grain, high contrast; treated archival footage = premium editorial feel.
- Second half: 70s/80s archival (F1, tennis, crowds, Beethoven, Newton, baby face held 4 tiles = 2 s slow hold) under narration; brain-scan heatmaps; CRT/scan-line portraits.
- End: hard cut to pure black; small white sans "feed" → "feed the brain." (tiny, ~3% height, left/centre), then dot-cluster logo mark appears alone, then wordmark "COSMOS" (bold geometric caps, ~5% height). Brand = Cosmos. Tiny type on black = confidence; logo mark before wordmark.
- Lesson: brand film with zero product UI — emotion via archival montage + one-line captions; product brand only in the last 3 s.

#### Pilot: raivcoo 094f18ae — Sanctum waitlist (14.8 s, 16:9)
- Open on dark teal: a tiny pill input grows (scale-up from ~10% width), email types in "albus@gmail.com|" with blinking caret, morphs into a "Join Waitlist" button; frosted-glass (glassmorphism) pill with bright rim light / inner glow; cursor click; button collapses into empty glass capsule. UI element as hero, macro camera.
- Smash cut to bright saturated blue gradient world with soft blurred colour blobs (mesh-gradient bokeh) and green 4-point sparkles; cute 3D jelly mascots (red, blue) fly through with depth-of-field blur.
- Type: "Join the / Waitlist / now" — 3 lines, middle word bigger + gradient fill (light-blue→white), soft white glow; "and Grow your SOL" with gradient on key words.
- Phone mockup tilts in 3D from the right edge (perspective rotateY), holds with drift.
- Cloud mascot blurs in (big defocus → sharp, scale down) and becomes the logo icon; end lockup "sanctum" wordmark + icon, white on blue; fade to black.
- Palette: #0E2A33 dark teal → #1E6BFF/#3FA0FF blues, lime-green sparkles, white type. Rounded geometric sans.

#### Pilot: raivcoo 0a775a7b — Cashtags (fintech, 39.9 s, 16:9, dark)
- Open: brand/ticker logos (Tesla, Bitcoin, Apple, Visa, Netflix…) as glossy circular coins pop in and orbit/scatter around a centred line "Introducing Cashtags" (grey→white text fade-up, small ~3% height). Then "For Stocks & Crypto" (second line fades a beat later).
- Pure black canvas, single iPhone mockup centre, UI-only storytelling: typing in search ("$TSLA"), list filtering, ticker page with price + green line chart that draws on, scrubbing chart (price counter updates), candlestick toggle.
- Section titles above the phone, tiny ("Type the ticker" / "or contact address" subline 50% grey).
- Camera: slow scale-ups into the chart (crop to chart card), cross-dissolves between screens, ghosting of previous UI (onion-skin fades).
- Charts recolour red→green on swap; numbers roll.
- End: "Now Available on iOS" centred small white, "In the US & Canada" fine print fading in below; fade out. Calm pace (avg 2–4 s per state), almost silent motion — premium restraint.

#### Pilot: X 2072151108420530176 — Notion-style "Organize everything" (13 s, 16:9, light)
- Warm off-white background with soft diagonal window-light shadows (gobo light) = physical, calm.
- Text pill "Organize everything" (dark text on light grey capsule) types in; 3D clay-render icons (calendar, cart, book, people, gear, pie) float in around it with slight rotation.
- Logo "N" in 3D extruded cube flips in (rotateY), then UI board (Product roadmap, kanban: pastel yellow/blue/pink columns) fills in card by card (stagger), avatars drop onto cards.
- Camera tilts into an isometric 3D view of the board (perspective rotateX ~45°), extreme close-up with avatar coins and "At risk" tag — product UI as a physical object.
- "Work smart → Work smarter → Together" word swaps inside the same pill (text replace, pill width animates).
- End: flat N logo on light bg, then grey fade.

#### Pilot: X 2070136195628109825 — AI meeting-agent launch (35.8 s, 16:9, light)
- Whitespace-first, very small UI cards on white→pale-blue gradient; cursor-driven: "+" button expands into "New Action ▾" split button, dropdown "New Action from Template", modal templates, "Create from scratch" card selected and zooms.
- Form typing: trigger condition text typed char by char; Next button; app-logo row (Notion, Slack, Zoom…) — selection highlight on Zoom.
- Video-call grid (4 tiles) → ends → collapses into a document stack → connector line to app icon → status lines type in grey→black ("Post Meeting Action / Gathering information…", "A potential misalignment with the product spec has been found. Drafting mini PRD…" with progressive word-by-word reveal and grey-to-black colour wipe).
- PRD document card slides up, sections appear; Slack-style message card posts with reactions.
- End: URL "404ishan.framer.website" typed in brand blue on white, small; cut to black.
- Lesson: whole story told with UI micro-interactions; grey→black text reveal reads as "AI thinking".

### Full run (sheet 1 per video unless noted)

#### 001 Nova Score (fintech, dark, 34 s) [dark-premium-UI][kinetic-type][data-viz]
- Opens with a huge "Introducing" in white→lilac gradient type that MOTION-BLURS / echoes horizontally (letters smeared + duplicated, "Intrntrodcingcing") then snaps small: "Introducing Nova Score" (Nova Score in violet). Big-to-small type scale jump.
- Dark #0B0710 bg with soft violet bokeh/blur blobs; UI screens dim in through blur; purple table rows highlight.
- Hero number: big thin numeral counter 0 → 2 → 35 → 61 → 82 inside a circular progress ring (gauge sweep), label "of 100", tier "Bronze → Gold → Platinum → Diamond"; candlestick chart + "Trade $10,072" + floating "Buy BTC / Sell BTC" chips with cursor = gamified loop. Line "Build your Nova Score" lower-left.
#### 003 Hosting/infra product "a" (dark, 17 s) [3D-isometric-UI][glow]
- Extreme macro of a dark server card ("worker-ap-northeast-1-05", green status dot), camera drifts on perspective; CPU bar = segmented neon cyan pills animating 63→82→77→44%, MEM magenta.
- Pull back: one card → infinite isometric grid of identical cards flickering cyan/magenta (scale story: one → thousands). Depth of field. Resolves to small "a" logo white on black.
#### 002 Dev/design-system tool (light, 32 s) [light-grid][swiss][orange-accent]
- Off-white bg with faint blueprint grid lines + crop marks; single accent ORANGE-RED #F04A1A + greys + black. Logo (flame) in white card fades in; wall of grey wireframe page thumbnails tilts in perspective and recolours some blocks orange (scan).
- Code snippet cards; pixel squares (5x5 grid) pulse in pink→orange gradients (opacity stagger), squares converge/spiral into code card; blocky layout morph. Very systematic geometric motion.
#### 004 "Physical intelligence" robotics (archival, 82 s, 40 cuts, avg 2 s) [archival-montage][kinetic-subtitles]
- Vintage industrial footage (toaster, IBM, factory, women at assembly lines), colour-tinted (green/sepia/pink), grain.
- Narration as BIG white words placed ACROSS the frame one at a time, spread out (word positions fixed left/centre/right as a sentence builds: "Machines / sparked / the / last industrial revolution"), plus tiny yellow subtitles bottom-centre. Word-scatter kinetic type.
#### 005 Vox Creative × Qatar Foundation "What's in a name?" (editorial, 71 s) [hand-drawn-2D][collage][paper-texture]
- Saturated GREEN #57E01F full bg, scanned newspaper/text paper cut-outs; hand-drawn character (blue shirt, ink outlines) animated frame-by-frame (boiling lines) tumbling through paper; key words underlined ("mispronounced", "disregarded", "even mocked?").
- Words spiral/vortex in black-white tunnel; paper scraps fly (newsprint typography as texture). Illustrated editorial explainer style.
#### 006 Creative Arena (AI voting, light, 32 s) [light-pastel][mesh-gradient][UI-demo]
- "AI" huge violet gradient letters blur-in (defocus→focus), then shrink to small line; sentence types "AI doesn't replace creativity" with word "replace" struck; "It gives you superpowers" with a collage of UI cards flying in from all sides.
- Title card: "INTRODUCING THE / Creative Arena / creativearena.ai" over yellow→green→violet aurora mesh gradient (soft); motion-blur whip transition (horizontal smear of the title).
- Ring of AI tool app-icons (runway, Canva, Make…) floating around "Tastemakers pick the tools of tomorrow"; zoom-through text with heavy motion blur; prompt box typing "Dreamy abstract flower with soft pink…" → two generated images side-by-side to vote.
#### 007 Firm studio packshot showreel (114 s, 57 cuts, 2 s avg) [3D-product-CGI][luxury]
- "firm PACKSHOT SHOWREEL" logo on black over rows of perfume bottles; CGI macro packshots: gold radial light streaks behind bottle (sunburst), flower petals exploding and reassembling into bottle silhouette (particle assembly), liquid splashes, soft pink/blue studio gradients. Luxury beauty CGI; 1 product per beat; slow dolly.
#### 008 Tonik product-design showreel (42 s, 4K) [dark-grid][case-study-reel]
- Dark #1B1B1B with crop-mark corner ticks; title "tonik / Product — Design / SHOWREEL" (condensed bold caps + tiny labels on a rule), then client logo roll one per beat (CloudKitchens, Metronome, Airweave, colossal) centred small in a framed box.
- Case-study clips: UI dashboards on perspective tilt, 3D purple icon on red rock render, TIME cover with red border focus pull, data panels "2.4 x 10¹¹ / 11.90%" (numbers on floating cards), medical 3D UI on navy.
#### 009 Commerce flow loop (light, 4.7 s) [micro-loop][flow-diagram]
- Tiny UI loop on white: Instagram/TikTok post card → dotted connector line animates dot-by-dot (pink "progress dots") to a shop screen with Apple Pay chip and product sticker. Whole explainer as a 5 s GIF-like loop; huge whitespace.
#### 010 Character loop (1:1, 4 s) [flat-character][loop]
- Three flat geometric characters (lavender ball, green bean, blue cloak) on cream #F1EFDC, thick black outlines, idle bounce/blink/whistle loop; music notes pop. Mascot loop for social.
#### 011 Medium-like "Reposts take a note" (light, 20 s) [editorial-UI][texture-bg][cursor]
- Background = blurred photo texture (slate/handwriting chalk) under white UI cards; title "Reposts" with a letter swapping (ticker/slot glyph replace) → "Reposts now take a note" (word appears raised then settles).
- Big serif editorial headline "Editing while you write is just procrastination"; cursor clicks repost icon, menu → "Repost with a note", card counter "0/280 → 71/280" typing. Torn-paper edge mask on a card. Ends "See what / David / Julie / Matt" big serif names with portrait photos in selection box; "everyone said" over a strip of portraits.
#### 012 Agent28 / "THE TIMELINE 1989–2026" (dark, 50 s) [retro-CRT][archival]
- Thin serif small caps title "THE TIMELINE" with date line; TV static flash; archival footage inside a CRT screen shape (rounded rectangle vignette, chromatic aberration, scan lines); small serif centred subtitles. Ends on colourful NLE timeline with "The Timeline." serif. Nostalgia/evolution story.
#### 013 Figma "intelligent creative workflows" (55 s, 30 cuts, 1.9 s) [UI-demo][cursor][photo-led]
- Real lifestyle photo (runners) → UI frame poster "OUT THERE TOGETHER" (condensed slab type) on green textured bg; cursor-driven tool panel "Transfer style" picks a source image (B/W) → generate → image re-styled (cross-dissolve through greyscale/threshold version).
- Variations scatter as small poster cards on grey; black end card "Introducing intelligent creative workflows" in LIME #D9F95A sans, word-by-word.
#### 014 ElevenLabs Speech Engine (light→dark, 54 s) [minimal-mono][text-cursor-motif][3D-orb]
- Logo built from the "II" bars: two grey bars (gradient) slide/merge into "IIElevenLabs", then the bars act as a TEXT CURSOR that wipes text: "ElevenLabs" → "Speech Engine" (cursor-as-wipe transition). Off-white #F3F2EF.
- Prompt field types "I need to reschedule my delivery – can you move it to Thursday?" → toggle "Speech Engine" switches on; canvas flips to charcoal #222; a 3D matte silver orb (sphere) appears and DEFORMS/ripples as it speaks (audio-reactive displacement), transcript words appear under it one by one; spotlight vignette.
- Colour discipline: greys only. Premium restraint.
#### 015 ElevenMusic "Introducing Music V2.5" (dark, 39 s) [audio-reactive-blob][static-title]
- Title top-left/centre: tiny "IIEleven Music", "Introducing" micro label, "Music (V2.5)" with version in an outlined pill. Below, a giant glossy sphere cropped by frame bottom whose surface flows with blue/silver liquid marble (fluid noise shader) — continuous, no cuts, 39 s. Hero = generative shader.
#### 016 Google AI Studio "Design Variations" (dark, 16.6 s, 4K) [dark-UI][glow-bloom][rainbow-gradient]
- "Introducing" fades with soft mask (letters slide from left with fade edge) → "Design Variations in [Google AI Studio]" logo lockup assembles.
- UI window with rainbow conic glow bleeding behind it (Google colours blur halo); floating toolbar pill with icons (pen, cursor, paint) — selected icon bubble; "Variation" button with sparkle; variations grid. End "Build that wild idea / aistudio.google.com". Soft blue glow under toolbar = focus spotlight.
#### 017 JusPay × Apple Pay India (light, 57 s) [whitespace][kinetic-type][device-3D]
- Pure white; tiny centred sentence builds word by word ("There's a lot to look forward to"); word "look" gets googly eyes (o's become eyes), "Forward" morphs into colourful mixed-font ransom-note letters (letter-by-letter style swap). Playful typographic gags inside a minimal frame.
- "With Apple Pay", "Now available with JUSPAY" small; burgundy iPhone 3D render rises, lock-screen 9:41 macro, Face ID icon animates (lock → face check green), red swoosh line, shoe shopping app, notification banner drops in "Himanshu: Did you book the tickets…". Device camera moves = tilt + push.
#### 018 Explainer w/ founder interview (mixed, 114 s) [paper-collage][interview+graphics]
- Crumpled white paper texture bg; polaroid photos with handwritten captions slide in, highlighted article clipping; photos TEAR in half (torn-paper split) for "500 miles away" with dotted arc line between two cut-out portraits; counter "500".
- Cuts to seated talking-head interview in loft with word-by-word white captions placed beside the speaker (left of head). Back to paper: sentence types word by word lower-centre.
#### 019 "This is Jaleel" founder story (teal paper, 141 s) [paper-collage][isometric-3D][map]
- Teal construction-paper texture; B&W cut-out portrait with white hand-drawn arrows/scribbles; ALL-CAPS small white kinetic captions ("THIS IS JALEEL"); polaroids; website screenshot card; isometric 3D restaurant buildings pop in; vintage map with cut-out head pinned and travel path; red paper broken heart splits; "YOU'RE FIRED" box; collage city skyline with words placed around buildings. Then interview A-roll with captions.
#### 020 Iconly Pro (light, 30 s) [3D-icons][clay-pastel][product-device]
- MacBook macro dolly (warm orange wallpaper) → whip into a storm/tunnel of hundreds of glassy cyan icon tiles flying toward camera (particle tunnel) → app UI on white with floating pastel 3D primitives (spheres, torus, squiggles) parallax around; cursor clicks icon → customize panel; icon pops/scales; end icons explode into confetti cubes.
#### 021 Flow Studio showreel 2025 (103 s, 92 cuts, 1.1 s) [3D-surreal][Y2K-pixel-cursor]
- Chrome-silver logo floating in studio cyc; giant PIXEL CURSOR (8-bit arrow) as 3D object with glitch RGB; fisheye black speaker cone with grass inside; blue liquid ribbons twisting; collage of retro UI icons (old Mac windows, charts) on cobalt gradient; chrome chains, clay food. Fast cuts on beats.
#### 022 Obsidian (dark violet, 20 s) [dark-gradient][network-nodes][glass-crystal]
- Black with soft violet silk/fold gradients (abstract cloth light); small white file icons multiply ("Notes Everywhere" serif) → "but useful."; dots connect into constellation graph (node-link lines draw); typed wiki-link "[[Obsidian links your ideas together]]" with cursor; giant blurred text scale-up "your ideas" with hand cursor; "And you own every file" + crystal; light-trail strokes draw the crystal logo; lockup "Obsidian" bold white. Serif for narration + sans for logo.
#### 023 Jurni AI (light-peach, 55 s) [vivid-gradient][stepped-gradient-bars][floating-UI]
- Cream bg, single dot → pixel logo mark; logo gets a VERTICAL STEPPED BAR GRADIENT (orange→violet columns rising like an equalizer/sound bars wall) filling screen; full-bleed orange→violet gradient title "jurni." serif white; card shrinks into UI. Floating UI cards around a central pulsing play button on peach-lavender mesh gradient; headline gradient text "One Agentic Engine / Every Shopping Journey"; dark pill "Jurni is Thinking." with spinner icon.
#### 024 Outthought agency showreel (53 s) [brand-identity-reel]
- Navy; 3D green gummy bear; London canal footage; laptop UI; stationery flat-lay; bold geometric shapes (Bauhaus primaries: yellow, red, blue, green) wipe over photos (shape transitions); logos "ELECTRIC BARGE" multicolour letters, "THE FLOATING CLASSROOM" boat icon; triptych photo grids; outline monogram "R&J" fills gold ampersand. Brand-identity showreel grammar.
#### 025 Adrian Van Cooten showreel (23 s, 1.8 s cuts) [flat-geometric][brand-reel]
- Mustard #E8B53F bg with concentric target circles (blue/pink/white/red) that collapse into a single red dot (shape shrink transition); Aesop serif wordmark fades on cream; "THREAD" white caps over live-action; tilted phones scattered on grey grid of beige cards; skin-tone stripe gradient; toggle switch with glossy pink→violet knob sliding on violet; tilted grid of colourful app screens ("mox"). Flat colour fields + one hero object each.
#### 026 Exa Snapshot (mixed, 24 s) [live-action+UI-overlay][datamosh-collage]
- Handheld office walk-and-talk with white title text overlaid on footage ("Introducing / Exa Snapshot"), captions lower; essay page slides in; then an overwhelming COLLAGE STACK of hundreds of web-page screenshots layered (internet archive), year counters 2026→2025→2024 in serif on white label, "400 Billion" in blue highlight box with "Google!" etc. Information-overload montage as visual metaphor.
#### 027 JTX (dark trading, 35 s) [terminal-UI][node-graph][mono-type]
- Macro live-action (keyboard, face) → black; "This is JTX" tiny with a white highlight block that types/reveals; green "BUY SOL" button pulses (gradient sweep shine); candlestick chart builds; "Limit orders that actually rest." centred with thin horizontal rules extending to frame edges; tickers as boxed labels (SOL, BTC, AAPL, OpenAI, Anthropic) connected by lines into a network graph that builds node by node. Monospace + sans; strict black/white/green.
#### 028 Orbix agency showreel 2026 (44 s) [dark-green][serif-italic-mix]
- Deep forest green #0C2210; sentence types with mixed styles: sans + italic serif for emphasized word ("The *creatives* behind these brands", "Was *built* together"); words appear scattered then align into line. Device mockups (iPad, phone on stone), billboard mockups in city, magazine, mosaic grid of projects; style-guide cards with orange→peach blur gradients "Font / Color Palette"; "Pixel *Perfect* Dashboard Designs".
#### 029 Hypernova Terminal (dark violet, 48 s, 1 shot) [dark-UI][glow-cursor][continuous-camera]
- One continuous camera move across a dark trading terminal; title "Hypernova Terminal" blur-in with small pill tag "BUILT IN-HOUSE · END TO END" in bracket frame; stats "46+ Markets / $77K Funding" → number swap "120+ Markets / $200K Funding" (rolling digits); violet glowing 3D cursor arrow flies/points; green "Long" button morphs into "40MS" latency badge; bold captions overlaid on UI "Execution that keeps up." with blur behind. Violet light bloom.
#### 030 Revolut "Made for the world" (dark navy, 14 s, 1.4 s cuts) [bold-typographic][brand-system][loop]
- Dark slate #1E2733 + one accent sky blue #5BA6F5; HUGE condensed bold caps repeated as wallpaper "MONEY MONEY…" scrolling marquee rows; pill/circle shape words "HERE / THERE / EVERYWHERE"; arrow-in-circle icon pill that slides like a toggle; photo collage pops; "WE CHANGE THE WAY YOU DO MONEY." blocky; currency symbols in circles; colour names "DORK BLUE HEX#212E39 / LIGHT BLUE"; "MADE FOR THE 世界" multi-lingual swap; world map dotted. Brand-guidelines-as-motion.
#### 031 Device launch CGI (dark→snow, 76 s) [3D-product-CGI][cinematic-landscape]
- Black void, a sliver of light grows on the horizon; thin metallic edge of a device rotates (profile reveal), slab silhouette floats over reflective black water; cut to vast snowy glacier landscape at dawn; device embedded in snow crater, light sweep across its glass; macro of metallic texture. Apple-style hardware reveal: darkness, rim light, slow reveal, monumental landscape.
#### 032 Editorial collage loop (light, 6 s) [editorial-collage][grid-paper]
- Off-white grid paper; big black display serif fragments ("Opt", "Vie"), mustard handwritten letter scrap, vertical "AI" dark tab, B&W flower photo, small coloured squares (red, olive, teal) popping around; elements slide in from crops (mask reveals) building a magazine layout.
#### 033 Sanctum "Grow your wealth" (blue, 19 s) [brand-pattern-bg][swoosh-paths][counter]
- Saturated cobalt #1F6BE6 bg with darker organic blob pattern; white comet swooshes + yellow 4-point stars fly; white text words appear one at a time "The Most Delightful Way / To Grow Your Wealth" (blur-in per word).
- Phone flies in with comet trail; balance counter rolls $0 → $6,859 → $10,237; zoom into bottom nav (Earn Rewards blurred→sharp). Transition to white with yellow/blue brush swooshes orbiting text "Every Second"; growing bar chart (stacked blue/violet columns build L→R); profile card; end "Start Earning Now".
#### 034 Google I/O (light/dark, 38 s) [Google-brand][grid-lines][shape-morph]
- Logo "I/O" built from primitives (square + slash + circle) in Google blue; frame becomes rounded black card with thin yellow construction lines (guides) through the logo; "#GoogleIO", location pin "Mountain View" types; keynote footage inside rounded card.
- Full blue screen with giant black display type cropped/sliding ("Helpful Information" letters with outline-vs-fill mix) → resolves to small text; bento grid of coloured tiles (green, yellow, black) each with one phrase ("Private by Design", "Wear OS", "Little patterns") — giant text slides out of tiles to small labels. Circles red/green/black bounce-swap. Google brand colours as flat tiles.
#### 035 ElevenLabs Music remix (dark, 40 s) [dark-UI][prompt-chips][blur-fog]
- "II" logo flips/rotates into pieces; dark UI library list with gradient highlight bar (gold metallic sweep); album card over a blurred moody photo (road, bokeh), waveform under; prompt bar "+ Remix into a mellow lofi beat with soft drums, warm text|" typing; then branching line diagram → pills "Mood / Genre / Energy" spawn option chips (dreamy, nostalgic, rock, jazz…) with selected chips glowing pink gradient. Node-tree reveal of parameters.
#### 036 "Your product is ready / Now let's Launch it" (Launch Any Thing branding, 27 s, 4K) [gradient-type][3D-room][glass-card]
- "Your product" big white type with blue→violet gradient shimmer sweeping through letters (chromatic text), "is ready" over sunset horizon gradient. White: "Now let's [Launch it]" — 'Launch it' inside a frosted glass pill with cursor click; glass card zooms → becomes laptop screen in a warm sunlit 3D desk scene (window light shadows, plant) — app screens change on laptop; quirky blue mascot "mouth" monster; "Trusted by Brands & Enterprises" with floating logo tiles.
#### 037 Edtech intro (dark, 6 s) [kinetic-subtitle][inline-image]
- Charcoal textured bg; small white sentence builds word by word; an IMAGE (crowd, book stack) is inserted INLINE between words, pushing them apart ("thousands of [photo] were waiting to learn differently"). Inline-image kinetic type.
#### 038 Heidi (DixonBaxi) (25 s) [OOH-mockup][logo-morph]
- Single locked shot of a lobby with silhouettes walking past a big digital screen: yellow #F6F17A screen where a small symbol morphs (oval → circle → arrow → 4-petal logo) then "Heidi" serif; then burgundy screen with bezier curves "Powered by the best." then periwinkle with phone. Brand system shown in context (motion on a billboard mockup).
#### 039 Zenchef (Verve) (5 s) [paper-cutout][logo-write-on]
- Olive #6B7022 bg; italic script wordmark "zenchef" writes on letter by letter in pale lime; paper props (receipt, sketch card, food polaroid) slide in at frame edges with slight rotation. Tactile brand intro.
#### 040 Figma AI plugins (51 s) [UI-demo][pattern-bg][chart]
- Cyan/white diagonal wave pattern background behind white prompt card; prompt types "Create a plugin that generates a multi-series area chart using my design system"; puzzle-piece icon pops; plugin panel builds field by field; CSV file drag-drop with grabbing hand; area chart renders in magenta, palette swaps to greens; final chart on cobalt slide with 3D coins. Cursor-driven, card-centric.
#### 041 Ozone AI video editor (dark, 30 s) [creator-hype][glow-type][card-carousel]  (046 = same video in 4K, duplicate)
- Bold rounded sans words one per beat on black, each with glow and a COLOUR GRADIENT fill (pink "We're", lime "Ai"), white hand-drawn scribble underline swipes under "ozone"; words inside glowing rotated-square outline (diamond frame) "Edit / Video / Waay"; repeated-text wall "FasterFasterFaster" with blur.
- Horizontal carousel of portrait video thumbnails; feature labels above with scribble underline ("Removes Silences", "Adds Captions", "and Animations"); a "Super Cut" pill with rainbow neon glow sweeps across thumbnails; active clip scales up centre; "Color Corrects" with emoji sticker and mixed colour letters. Social-creator energy, ~0.5 s beats.
#### 042 Chat bubble loop (9:16, 1.7 s) [micro-loop]
- Deep blue radial spotlight bg; iMessage-style bubble "Hi! Would love to connect with you!" + typing dots bubble. 
#### 043 = duplicate of the AI meeting-agent video (X 2070136195628109825), already noted.
#### 044 "Alchemy → AI" essay (light, 60 s) [swiss-editorial][monochrome][engraving-collage]
- Pure white + black only; concentric squares with a circle → ink-splatter ouroboros; collage of antique alchemy engravings + handwriting, label "ALCHEMY" bold caps; giant bold sans words cropped by frame edges sliding ("TE SOMETHING"); vertical stacked words one per line ("THAT / HE / KEPT / TRYING / TO / DISCOVER"); particle dots drift; neural network diagram (dots & lines) builds; "AI ●" with dot. Narrated essay feel; type as layout.
#### 045 Crypto recurring markets (dark green, 35 s) [dark-UI][3D-tilt][neon-glow]
- Laptop on dark teal set; dive into screen; UI panels tilted in 3D with depth of field; floating glass card "Trade recurring crypto markets." with blur; candlestick charts; order panel with lime CTA that GLOWS and blooms upward when clicked (light leak); cursor hand. Teal #0B2A2A + mint/lime accents.
#### 047 Base44 "Design Reimagined" (light, 6.6 s) [editorial-swiss][orange-accent][text-cursor]
- Light grey; white card with tiny logo "Base 44" + giant grey sans "De…" typing "Design Reimagined" with big blinking text cursor; orange tag stickers, black arrow; giant "Re|gene|" with cursor on orange frame; feature list scrolls as big stacked grey lines ("Veo3 Generation / Collaboration / Themes / Canvas…"); generated-poster collage overlaps fast. Typing as hero motif.
#### 049 Firefox "We're Back" (purple, 145 s) [3D-orbit-icons][Y2K-nostalgia][brand-pattern]
- Deep violet #3B0F8C space; glossy app-icon tile (purple sphere) at centre with orbit rings, floating UI cards/shield/gems orbit in 3D (orbital system = "ecosystem" metaphor); Firefox logo forms, then flame-tail shape swoops; words appear in a sentence with the orange flame arc swiping between them ("independent / non-profit / backed browser") (shape wipes text).
- Windows-XP Bliss wallpaper with retro pixel popups, stickers, "2000" chrome text → nostalgia; orange-to-lavender wave; "We're Back" lavender; collage of browser windows spinning in a ring.
#### 051 Fomo trading app (dark navy, 22.5 s) [dark-UI][line-chart-draw][kinetic-words]
- Navy #0A0D24; centred white sentence words swap ("traders / earn / from the trades they inspire"), letter-morph between words ("ea◎rn" with brand logo mark inside a word); neon green line chart draws L→R with glowing head dot & price tag; feed post cards; phone mockups with blue glow; Sell/Buy red/green buttons zoom; "Trader rewards $1,183.95 → $1,653.37" counter; ends "introducing".
#### 052 Cosmic glass orb loop (1:1, 8.5 s) [3D-orb][iridescent]
- Black; glass sphere with swirling magenta nebula inside, iridescent rim (thin-film rainbow), slow rotation. Ambient hero loop.
#### 053 Canva Code 2.0 (30 s) [aurora-gradient][prompt-UI][multiplayer-cursors]
- Deep blue→violet aurora gradient; "Canva ai / Code 2.0" white, logo sticker with collaborator cursor "Jay"; prompt pill typing "I want to build an interactive project overview" with gradient circular send button; named cursors (Jay blue, Ann pink) collaborating; edit toolbar; generated website "BUILD SOMETHING NICE → BEAUTIFUL" headline edits live (text replace). Light lavender→peach gradient backgrounds.
#### 054 Robinhood-like wallet "Your next move starts here" (light, 23 s) [3D-coins][tube-paths][clean]
- Off-white; a black tick morphs into a 3D lime coin (spin); coins travel through white extruded 3D TUBES/pipes that bend (pipe maze) — coins of other tokens join; top view pipe network; search bar "Your next move starts here." with dots; categories (Trending, Robinhood, Stocks, Majors) with 3D icons. Soft clay/plastic material, grid floor.
#### 056 X Android app (dark, 26 s) [dark-UI][device-macro][word-pill]
- Pure black; small grey text typing "Rebuilt from the ground up"; macro of phone camera bump/icons with "Updating" label; words "Faster / Better / Stronger" each inside a dark circle connected by thin dashed lines (pill chain), text fades in from dark; phone UI scroll (feed, video post, stock card). Monochrome.
#### 058 ElevenMusic Orchestral (dark, 183 s) [waveform][bokeh-gradient]
- Black → logo "IIElevenMusic" blur-in; genre word "Orchestral" over moving dark-teal/green soft-blob background (blurred light fields); white waveform with section labels (Bridge, Crescendo, Interlude) and timecode ticks scrolls; prompt text bottom-left in small grey. Long continuous; audio product showing structure.
#### 059 Dodge Viper poster series (9:16, 20 s) [poster-motion][car-CGI][retro-print]
- Vertical posters: wide extended display caps "VIPER" letters slide in one by one over a green car on a white→dark gradient poster; dark garage with lime light streaks and LED-strip headlights; spotlight sweeps over a US flag; red halftone polka-dot "Dodge" retro script poster; "DODGE VIPER SRT AT THEIR FINEST" condensed slab over line-art wave background; red neon underglow. Poster-as-frame; each beat = new print layout; halftone, grain, editorial print feel.
#### 061 ClickUp Brain² (light, 58 s) [vivid-gradient][glitch-text][logo-reveal]
- White; small text in angle brackets "‹ Your AI ›" → "everything" with a scribble/handwriting stroke glitch; orange→pink→violet blurred gradient blob background; ClickUp chevron logo assembles from rotating pieces; "Ours does → Ours doesn't." word swap; background type-wall of "CLICKUP / BRAIN" monospace tags with colour highlight blocks; glossy 3D flower/clover icon (pink-violet-orange gradient glass) — "Brain²" on black with soft floor glow; prompt field with gradient border typing "Summarize|".
#### 062 Nintendo Switch 2 (light grey, 13 s) [3D-product-CGI][exploded-view][logo]
- Light grey cyc; console floats and rotates, Joy-Cons detach and slide (exploded view), logo assembles on screen ("Switch 2"), gameplay on screen with fast camera whip, colour variants slide behind, macro of buttons; end red logo on grey. Product turntable choreography.
#### 063 History map explainer (light, 9 s) [map][cut-out-portraits]
- Vintage CIA map in pink/blue territories; two duotone circular portraits (red and green) scale/move to positions on the map, a selection bracket highlights Taiwan; minimal motion, editorial documentary.
#### 064 "I am Motion." motion-designer reel (124 s) [minimal-flat][shape-UI-metaphor][type-styles]
- Black "I am Motion." white sans; dark UI card with prompt; off-white canvas: three primitives (black dot, teal square, red circle) bounce and STACK into three horizontal bars (black/teal/red) which become a timeline with keyframe dots and a red playhead; "unreasonably good at After Effects" with highlighted word; dark terminal-style "> Except I don't sleep|"; checkbox row "DEADLINES" ticking boxes teal; "FONT CHOICES" cycling through fonts (mono → condensed bold → light → black). Self-referential motion-design humour with a 3-colour palette.
#### 065 Aixio "Turn anything into editable layers" (light, 18 s) [editorial-serif][slide-cards]
- Off-white; serif small text "One click to make your [deck]" with dark slide cards flying in staggered; "To look like this" with green illustrated slides; navy panel left with large serif "Turn Anything Into Editable layers on Aixio" (words fade in one by one in grey→white), right side slides scale in; editor UI with selection box and cursor editing text. Serif-led B2B.
#### 067 "Googlebook" laptop teaser (dark, 30 s) [3D-product-CGI][spectral-light]
- Black; a point of light grows into a horizontal line flare; reveals the laptop's edge with a RAINBOW spectral (prism) light sweeping along its rim; macro tracking across hinge, keyboard; light trail runs along key gaps. Classic hardware tease: light-as-reveal, only edges visible, Google colours as spectrum.
#### 068 Rolling Stone "The Story of 420" (pink/yellow, 63 s) [retro-collage][halftone][magazine]
- Dusty pink #E487A0; B&W cut-out hand with magnifying glass reveals yellow numbers under the lens (lens-as-mask reveal); "THE STORY OF 420" small caps + huge mustard serif numerals; archival photos in white-bordered frames on yellow with halftone dot patterns at edges; 3D brick wall "THE WALDOS" graffiti, cut-out trees and B&W bodies; smoke clouds as transitions. Zine/collage documentary.
#### 070 Mercury "Books" (dark, 37 s) [dark-premium][particles][glass-stack]
- Deep aubergine/near-black with copper-pink particle dust; centred white sentence fades in line by line (second line grey→white): "Your books should know what your money knows."; tilted glass card with balance $12,582,210.27 and sparkly particle waves; stack of glass cards (deck) with a glowing orange-lit "Books" card (inner light); pill "Introducing [✶ Books]" with cursor click; dashboard UI; small spinner "Auto-categorizing" with dotted progress. Warm copper light on dark violet = luxury fintech.
#### 071 DoorDash "Design Connects" (light, 66 s) [brand-shapes][kinetic-type][line-paths]
- Off-white; red DoorDash logo; condensed bold caps "DESIGN" then "CONNECTS" revealed by colour bars wiping across (bars = brand palette: aubergine, red, pink, sky, yellow); thin coloured ARC lines draw and carry small words ("people", "places", "endless possibilities", "purpose") travelling along the paths like stations on a route; thick ribbon shapes sweep in; triangle photo masks; photos in tilted rounded frames; aubergine #4A0E3A panel with app icons and "design empowers consumers / merchants" — words connected by moving photos/icons. Paths = "connection" metaphor.
#### 072 Sci-fi mech in orbit (3 s) [cinematic-CGI] — backlit robot silhouette over Earth with lens flare; pure cinematic shot (AI-video style).
#### 073 University story (dark, 8 s) [doc-collage][scrapbook]
- Charcoal paper texture; small white sentence top "the same university that tried to stop them"; a letter on university letterhead with yellow highlighted lines; archival paintings/photos stack and slide as tilted prints (polaroid-ish collage); then photo of three founders. Story told via documents.
#### 074 Creator payouts "$22M paid to creators" (light→dark, 23 s) [data-viz][gradient-orb]
- White; gradient orb (orange→pink→violet) with a counter label "$0M → $0.5M → $1.7M" moving up a timeline; white card on blurred orange-violet gradient; line chart with orb as moving head and pill tooltips "$11M", camera follows the line; steep curve to "$22M / May 2026"; dark scene: big orb "paid to creators and counting"; rows of many small gradient orbs (each a creator) filling the screen. Single motif (gradient orb) carried through.
#### 075 Hills Sakura Journey (9:16, 15 s) [Japanese-poster][particle-bubbles][typographic]
- Off-white; watercolour-textured magenta circles multiply into a burst of pink/green/white petals (particle confetti), vertical colour bars rise like a city skyline (pink, blue, green, navy), full-bleed bars with big type "HILLS / SAKURA" (outlined + solid), stacked outline "JOURNEY JOURNEY…", huge textured spheres fill frame, title lockup stepped "HILLS / SAKURA / JOURNEY", Japanese copy + dates in white label blocks; venue list. Riso/watercolour texture on flat shapes.
#### 076 Base new icon system (dark→white, 41 s) [type-system][construction-grid]
- Black "INTRODUCING" (grey→white), "A NEW ICON SYSTEM" with icons appearing inline between words; "From —— Base"; "OPEN" in outline type on construction grid lines (letter construction); "LIGHTER" warps to italic/curve; "FRIENDLIER" on a curved line (text on path) with bezier handles; white: icons shown with spec labels "2px stroke / Geometrical / Open negative space / Smoothly curved" (blue accent fill); letters and icons interleave "A ⟳ V ◻" → morph into "Designed". Design-system explainer.
#### 078 OpenAI DevDay 2026 (dark, 12 s) [flat-characters][pixel-dissolve]
- Black; grey circle face with asterisk eyes, faces with emoticon eyes (o o, > <, + +, ^ ^) in colourful circles (purple, orange, green, blue) bouncing together; "1 day." assembled from orange pixel/dot particles that resolve (pixel dissolve-in), "1 day. 20+ launches."; footer "OpenAI DevDay[2026]" with coloured bracket text and scramble-in. Playful mascot circles + pixel type.
#### 079 Iridescent glass orb loop (4:5, 20 s) [3D-orb][holographic]
- White bg; clear glass sphere with thin-film rainbow (holographic/chromatic) inner swirls rotating. Pairs with 052 — generative "AI orb" motif.
#### 080 Clay agency showreel 2023 (90 s, 1.9 s cuts) [agency-reel][3D-primitives]
- "( clay" wordmark centred over alternating abstract 3D renders (matte white spheres, dark bevelled planes, small coloured primitives: orange ball, pink sphere, purple cube) — logo stays fixed while world changes behind (logo-anchor transitions). Client work: particle starfield → "INTERNET COMPUTER" glitch title on tablet; Snapchat yellow with 3D ghost, circle wipe reveal; phone AR filters; Slack logo assembling pieces.
#### 081 Base logo animation (bruno, 4K, 11 s) [logo-system][block-letters]
- White; blue square tumbles with coloured squares (multi-colour shuffle) → resolves into block-letter wordmark built from rectangles "▙▅▅▅" → morphs into "base" type; letters swap into coloured blocks (red/yellow/blue/green) and back; collapses to a single square → dot. Logo = modular blocks; colour cycle.
#### 082 Antitype studio (18 s, 1.5 s cuts) [brand-identity][bezier-construction]
- "Introducing" tiny grey on white; floating small photos; electric blue #2B2BF5 full screen with the logo's arc drawn by bezier handles (vector construction view); logo on grid; dark B&W photos with logo; rotating ring of logo fragments; light-blue blur panels with red serif words "BRAND / PRODUCT / &" and pink-outlined image tiles; heavy grain/noise dissolves between B&W and logo.
#### 083 ElevenLabs voice-agent demo (172 s) [talking-head][gradient-bg] — black intro caption "The following audio is an unedited conversation…", then a framed webcam video centred on a blurred pink-blue gradient background (picture-in-frame). Minimal; product proof as raw demo.
#### 085 Claude design import (mixed, 33 s) [3D-button][UI-type][lime-accent]
- Quick cuts; "Claude" cursor label; a chrome/metallic 3D extruded "Import" button rotates into view (UI element rendered as 3D object); single words centred on grey gradient "Import / to canvas / any app / or web / as design"; browser URL typing "app.silver.coffee"; app preview on lime #E6FF3A; toolbar Import button toggles states. Silver + lime + black.
#### 086 WSO2 Agent Manager (Astra Motion) (dark, 62 s) [glass-orb][orange-cyan-gradient][node-flow]
- Navy-black with huge glowing glass ring/orb (orange inner glow, chrome rim) framing white words that type in ("Most AI agents never leave pilot"); orb shrinks into a cute mascot with two eye pills; pipeline nodes "Scope → Build → Pilot → Production" connected by lines, glowing orange outlines; "The rest sprawl out of control" with words smearing (motion blur); tree of agent nodes branching; giant "Meet" with gradient chrome; orange→cyan aurora; logo lockup "WSO2 Agent Manager"; product UI slides in. Small brand tag top-left throughout.
#### 088 "Thinking…" loader (light, 8.6 s) [text-shimmer][particle-letters]
- Single word "Thinking..." where letters periodically dissolve into multicolour dots/particles and reform (shimmer wave L→R). AI-state micro-animation.
#### 090 raw studio showreel (54 s, 1.9 s cuts) [editorial-monochrome][3D-rock-text]
- Charcoal & light grey only; huge white words "Design / Build / Grow" emerging from behind 3D crumpled metal/stone sculptures (type interleaved with 3D objects: front/behind layering); tiny coordinates/labels in corners (UI-like metadata); scattered B&W photo cards orbit around a word; scrolling client list; serif "brands" with model holding a clapperboard; product macros; section words "products / clothing / packaging / tech" small black sans with collage of objects & technical line drawings. Editorial lab aesthetic.
#### 091 Founders intro (dark, 10 s) [scrapbook][polaroid-in-brackets]
- Dark textured desk; ALL-CAPS tiny white caption L "THIS IS ISABEL, ANDREAS, AND ERIC" + polaroid photos dropping into a centre flanked by big thin parentheses "( photo )"; desk top-down with coffee/notebook; words appear with one word glitch-replaced.
#### 092 Trading brand film (B&W, 24 s, 1.3 s cuts) [monochrome-editorial][kinetic-numbers][3D-metal]
- Pure black/white; numbers ticker "Trades 289,046 → 509,659 / Value $169.8 → $228.7" with digits motion-blurring vertically (slot-machine roll); 3D chrome cube with holes rotating; statement "The Frontier is the edge of opportunity" crossed out by drawn strikethrough lines; field of short dashes rotating like iron filings/flow field; list of trading terms stacked big white bold over giant ghost letters; motion-blurred commuters; FX pairs "USD/JPY → EUR/JPY" with blur swap; chrome bolts exploding radially (exploded hardware); tier cards "Tier 1 140,000 Pts" flipping; metal card. Swiss B&W + industrial 3D.
#### 093 HPE logo sting (Siegel+Gale, 2 s) [logo-sting] — green outlined rectangle (HPE element) shifts gradient blue→green and turns into the "E" of "HPE" as letters write in; slate gradient bg. Logo-from-brand-shape in 2 seconds.
#### 095 aether AI assistant (light grey→dark, 39 s) [gradient-blob-orb][glassmorphism][progress-steps]
- Light grey #E5E5E8; tiny gradient orb with "…"/waveform bars (AI voice state) → grows into a big soft multi-colour blob (red, blue, violet, black blobs merging — metaball gradients) with an orbit ring; "Introducing aether®"; blobs separate. Dark band: process timeline "Perceiving → Planning → Reasoning → Searching → Finalizing" dots along a line with soft light trail → "you"; frosted-glass message bubble "Good morning 👋 It's aether" over red→violet blur glow; schedule cards in red gradient. Gradient blobs as AI personality.
#### 097 Assemble (light, 68 s, 1 shot) [whitespace-UI][orbit-rings][isometric]
- White with thin grey orbit ellipses rotating in 3D (gyroscope rings) carrying text "Sales closed the customer in"; becomes circular dial with blue ticks; countdown timer "29:42 → 30:00 minutes"; "its *implementation* took" (one blue word), giant number "6" → "6 weeks"; "Custom *Pricing*", "New *Payment* terms", "New *Compliance* requirements" on faint grid; isometric light-blue platform with icons (building, box, people) connected by dashed paths, label text on isometric plane "IT implementation". One continuous move, blue accent word in each line.
#### 098 Gamer Supps ad (20.5 s, 2 s cuts) [surreal-collage][meme-ad]
- Paper cut-out collage: head opened with hand pulling products out, cow with speedometer, Zeus on a throne on the moon, "NO SUGAR" orange 3D type with jar replacing the U, astronaut riding a rocket, stage with spotlights; torn-paper wipes; "AVAILABLE AT GAMERSUPPS.GG". Absurdist collage ad, high energy.
#### 099 Nexus Corp dashboard (light, 22 s) [white-UI][depth-of-field][3D-tilt]
- Pale grey/white UI tilted in perspective with shallow depth of field (only one card sharp), camera glides across "Orion Cloud Migration 68%" card, radar chart (lavender polygon) draws in, velocity line chart draws point by point, glass toolbar; avatars group. Soft lavender accent. Premium dashboard B-roll recipe: tilt + DOF + slow pan + draw-on charts.
#### 100 Vedant Vaishnav reel 2026 (44 s) [motion-designer-reel][line-art][gradient-ribbons]
- Thin line-art circles/geometric wire (hand-drawn compass look) on white; condensed tall type "REEL ◇ 2026" with glyph swaps; dot moving through nested squares (line tunnel); blue glass bubble; UI case studies; isometric neon city; floating screens in cobalt; white-black vertical columns with glossy orb passing (light pass); pink-violet silk ribbon gradients; radar dial; "BOLD new chapter" type stack; vertical repeated word list; dark: "meets the art of storytelling" with red comet ball and gradient text; red cloud "Every brand starts" serif.
#### 101 Painted illustration animation (23 s) [flat-gouache-illustration][Matisse-palette]
- Hand-painted textured flat shapes (gouache grain), Matisse-like palette (orange, pink, yellow, forest green, sky blue); camera pans through a stepped Mediterranean town; black star sparkles drift; double bass, framed painting, theatre masks with expressive eyes; little character walks. Paper-texture 2D animation.
#### 102 AI store builder "Launch in a minutes." (light, 35 s) [text-cursor][mono-type][red-accent]
- Warm grey; huge I-beam text cursor; tiny line "Launch your store in minutes, not months|" with highlight on words; dark: monospace "Launch / in a minutes." with red full stop and red gradient rising from bottom; prompt bar "Build me a furniture store with 50 products"; giant circular send button (black→red gradient) with cursor click (button scale-up macro); loading ring of red dots; generated store page fades in ("Warmth in Every Corner" serif).
#### 103 Founder documentary (141 s) [B&W-portrait][interview][kinetic-captions]
- B&W hero portrait of 3 founders low angle; glass UI card fades over them; interview A-roll in loft; captions in white bold placed beside speaker; big number "€130,000 ARR" types in large; documents (university letter) inserted in frame as graphics. Doc-style founder film.
#### 104 Playlist Studio reel 2025 (49 s, 1.2 s cuts) [agency-reel][grid-type]
- Black; wordmark builds letter by letter "PLAYLIST.STUDIO / est.2022 / NEW.YORK(ny)" with italic serif mix; repeated grid of the wordmark; white cube; Nike swoosh on halftone; NYC billboards; restaurant/beauty UI; neon-yellow "earth" wordmark rotates 90°; sports scoreboard UI "8 : 10" with pink comet ball; magenta "Last serve"; gradient "On fireeeee". Fast-cut, case-study mosaic.
#### 107 Ravie 2025 showreel (47 s) [agency-reel][chrome-type][retro-burst]
- Black; chrome/neon script logo "RAVIE" writes on; red slab "REEL"; neon eye; sunburst radial orange/yellow rays with 3D trophy; cyan vector arrows fanning (vector light); glowing glass orb with fire; Bauhaus colour block wipes; "new hue." colour spectrum stairs; marble sculpture in red arches; UI briefs; isometric house illustration; American football pattern with huge "reseason" text sliding. Very eclectic style range.
#### 108 Travel super-app explainer (light, 20 s) [paper-texture][3D-app-icons][kinetic-sentence]
- Crumpled white paper bg; small black sentence builds word by word with cut-out person photos inserted inline; serif italic "something was very wrong..." with small red squares popping; glossy 3D app icons (hotel, bus, plane, train, chat) fly in with labels "book flights / book hotels / split bills / message friends", then shrink into a grid cluster. Problem→solution via icon swarm.
#### 109 ElevenLabs v3 audio demo (light, 156 s) [minimal][gradient-orb][particle-face]
- Off-white; tiny disclaimer text fades in line by line; small gradient orb (orange/green) → equalizer bars icon (orange-green gradient pills); soft pastel aura (green→peach blur ring) with floating dots; two faces built from thousands of red/grey dots (pointillist particle portraits) facing each other as speakers; transcript text below with audio tags in brackets highlighted orange. Particle-portrait = "voice" made visible.
#### 110 Apple-style "Everything we make evolves" (dark, 104 s, 2.8 s cuts) [archival-montage][big-word-over-footage]
- Black + tiny white sentence; history montage: one bold white word large over footage for each era ("Light" over paintings → Edison → LEDs; "Maps"; "Money" coin→phone; "Computers"); Pokémon-style evolution text box "What? CHARMELEON is evolving!" (pop-culture reference as metaphor); vinyl → CD → music app UI. Repeated word + changing footage = evolution.
#### 111 Logo sting w/ textures (11 s, 0.9 s cuts) [logo-material-cycle]
- Black; logo shape (circle with square cut-out) re-rendered in rapidly changing materials every ~0.5 s: frosted metal, bubbly foam, liquid chrome, glass, crystal spikes, smoke — then flat white logo. "Material cycle" sting.
#### 112 Hand-drawn character short (72 s) [2D-character][pencil-draws-world]
- Cream bg; a hand with red pencil draws a line that becomes the landscape (draw-on reveal), seagull, boy with red backpack walks through a muted peach/brown town; limited palette, textured brush shading. Storybook animation.
#### 113 Spotify-like "an easier, faster way to make a playlist" (9:16, 57 s) [vertical][blurred-gradient][typing]
- Vertical; full-screen blurred radial gradient (violet/red/blue) like an out-of-focus light; white text stack with one line in wide italic (mixed widths) "Introducing / an easier, faster / way to make / a playlist."; letters scatter/stretch on exit; prompt typing "What do you want to hear?" morphs into a search pill; phone UI rises in with keyboard typing "Sad songs that make me want to dance"; ends "Create" with letters bouncing into place. 
#### 115 Grok Bot "Share your Bots as a template" (light, 17 s) [white-UI][cursor][mascot-icon]
- Light blue gradient + white Mac windows; blue cloud mascot icon; cursor hovers "Share as template" button (macro zoom); centred sentence typing; cards "Meet Sales Outbound" with black CTA; ends black dot logo → "Grok Bot". Small, crisp, cursor-led.
#### 116 Networking CRM (dark, 27 s) [dark-glow][3D-tilt-UI][network-avatars]
- Black with soft blue/peach light streaks rising from bottom (vertical light bars bokeh); tilted white dashboard panels; headings with two-tone words ("One clear view of your *network*" — key word in brand blue); "organized / enriched" words below panels; avatar circles connected by glowing curved lines (network graph); "It's not a CRM." Glow + tilt + network.
#### 117 MTV OS reel (125 s) [Y2K-glitch][broadcast-graphics][terminal]
- TV test card "NO SIGNAL"; terminal text typing "SUDO APT-GET MTV-OS…"; electric-blue screens with "LOADING" bar, pink "DANCE" glitch label; rainbow gradient semicircle loader that spins into rings with white snow dots; pixel-rainbow waves; "Hello" in terminal box; ASCII sine wave; MTV logo. Retro-computer broadcast package.
#### 119 Multilingual collage "Can U Explain it?" (light, 16 s) [punk-collage][multilingual-type]
- Crumpled paper; zine collage square (palms, newsprint, B&W face, big rotated numbers "16 745") with yellow highlighter marker strokes scribbling over; glitch-scan transition; bold type "Can U Explain it?" with blue circle + green block, words swap language (Indonesian, Korean, Russian) in place; sticker cluster with boombox and pink starburst; circular collage badge rotating on black.
#### 120 Holographic studio showreel (56 s, 1.2 s cuts) [3D-luxury][editorial-web]
- Glossy black cube monolith in night desert with glowing logo, pixel lights; mirrored stage; tall phone with condensed brand list type; ring of metallic coins (gold/silver/copper) rotating; phones/laptops on white stone plinths ("PHILOSOPHY" sites); football editorial "ON AND OFF THE PITCH"; light points drawing a constellation that becomes a planet orbit; logo "OPEN WORKS" assembling from glyph shapes.
#### 121 "The Hard Part" (Lovable/Claude Code film, 111 s, 1.4 s cuts) [live-action][handwritten-titles][word-stack]
- Teal-graded cinematic live action; terminal close-ups with green phosphor text "make me a website"; handwritten white title "The HARD Part" (marker script) over screen; stacked bold sans words beside the actor's face, each word on its own line, staggered sizes ("was never the thing you wanted to make"); "CASE 1 WaCoMo" handwritten name labels; top-down floor shots with props; collage postcards for case 2. Narrative brand film with typographic overlays tied to faces.
#### 122 Lovable "Bring your IDEAS to Life" creator film (123 s, 1.2 s cuts) [UGC-collage][ransom-type][camcorder]
- Camcorder footage, vertical phone clips arranged on black as floating cards; title "Bring Your IDEAS to Life!" in mixed script + multicolour ransom-note letter tiles; handwritten name tags ("FAIZAN", "EVIE") with @handles; captions in small yellow; word-by-word white captions over webcam; red "NOTHING." label sticker; analytics screenshot "Current subscribers 40". Gen-Z documentary.
#### 123 Made by Many agency (54 s, 1.2 s cuts) [agency-reel][kinetic-type-warps]
- Office/workshop footage; "PUSH FURTHER" huge white on red, then letters WARP (mesh distortion, stretched); repeating "GO FASTER" pattern grid on mint; "ACHIEVE MORE" navy with letters scaling; thin green hand-drawn lines meander across footage/UI (connecting thread motif); sticky-note workshop boards; code editor.
#### 126 Tubi (DixonBaxi, 3 s) — phone on purple speckled floor; screen colour flips purple→yellow→purple while a dot/pill morphs into the "tubi" logo. 3-second logo sting on device.
#### 127 James Boorman reel (61 s) [playful-3D-2D-mix][game-UI]
- Purple/red checkerboard frame "Jimmy's SECRET SAUCE" with 3D glossy apple mascot; Bauhaus primary shapes, ball rolling along yellow track (Rube-Goldberg); red cannon firing strawberries; glossy gradient orbs; game hearts HUD; flat character snorkelling; B&W line-art room with green glow. Toy-like playful palette.
#### 128 Riotters showreel (58 s) [3D-blob-mushroom][custom-logo-type]
- Logo "riotters" assembles from geometric letter parts with green outline guides; laptop UI floating; purple glossy 3D mushroom/blob sculptures on pastel backgrounds with outline thin type "MIX & MATCH"; neon pink glowing version in a notched black frame; dark API site with 3D ring; yellow hardware controller; phone UI; white task cards over green meadow photo.
#### 129 AI assistant cinematic film (49 s, 1.1 s cuts, 2.23:1 scope) [cinematic-live-action][UI-inserts][serif-subtitles]
- Letterboxed scope; equation "ΔxΔp ≥ ħ/2" on black; moody faces, hands typing; minimal light-grey prompt field typing "Why does humanity keep reaching further?"; archival art (Vitruvian, Earth, painting) in floating frames; email UI with cursor; big text "rivera sisterz®" with text-edit context menu (Cut/Copy/Paste); "Downloading…" green pixel bar; giant typed "name |" with cursor; monospace "wrong one". Tiny serif subtitles. Film-language AI ad.
#### 130 Midjourney logo (6 s) [logo-dots-to-line] — sailboat mark made of scattered grey dots that converge into a clean line drawing; white→black bg flip; wordmark slides in. 
#### 131 Mozilla (JKR, 8 s) [typing-logo][mono-flag] — dark #1B1B1B; green text cursor blinks, "Mozilla" types with each letter popping in white then turning green, flag glyph "|ʒ" flips up. Logo-as-typing.
#### 133 Sander van Dijk reel (90 s, 1.7 s cuts) [classic-2D-motion][geometric-character][colour-fields]
- Flat colour-field backgrounds changing every shot (charcoal, white, teal, yellow, mustard, purple, cobalt, coral); geometric circles overlapping (brown/green/peach) → orange sun; line-art fox running made of continuous strokes; letterforms built from looping lines/ribbons (B, P, 8); black cat; low-poly origami triangles; tangram compositions. Master-class principles: strong easing, overlap, simple geometry, one idea per shot.
#### 134 Intently showreel (58 s, 1.2 s cuts) [3D-chrome][sky-backgrounds][glass-UI]
- Chrome/metallic logo bars crossing in sky (blue sky + clouds as recurring backdrop); white glass UI cards over landscapes; iMessage bubbles on lime phone; 3D foil pear balloon with flying sports balls on stadium; credit cards fanning; lifestyle photo grid; voice input pill with waveform over blue sky; chat bubbles "Sarah: Hi, how can I help?"; JTX terminal grid with corner brackets. Sky = optimism.
#### 135 Sonos "Make you feel" (30 s, 1.5 s cuts) [product-diagram][hand-drawn-arrows][editorial-print]
- Cream paper with rows of black speakers as cut-outs, hand-drawn coloured pen arrows/sound-wave lines looping between them (sound diagram), purple label stickers "MAKE / YOU / FEEL"; extreme close-ups of faces laughing; orange poster "AWE IN THE LIVING ROOM" with dashed sound-field lines radiating from soundbar around a face photo; green "LOVE IN THE BEDROOM", lavender with arrows between two speakers; headphone silhouettes. Technical diagram + emotion.
#### 136 Lovable design partner 2026 reel (54 s) [type-showcase][3D-bubble-letters][gradient-pills]
- Black; "Great design" in rainbow gradient letters with blur, typed "Great design takes time" small; blue planet horizon; orange/pink/blue gradient semicircles pattern; gradient pill stripes; macro textures (grapefruit, pink fur, wind-blown grass) as transitions; "TYPOGRAPHY" in repeating condensed rows, tall stretched type, selection box; green inflated 3D bubble letters; photo cards fanning; poster "touch of love" with squiggles; glowing gradient-outline pill button "Touch"; nav bar with icons on pink-blue gradient; neon heart. Design-tool brand reel.
#### 138 Dataland (Pentagram, 7 s) [logo-from-bars] — on black, vertical white bars appear (barcode-like strokes) which grow into the letters of "dataland"; reverse at end. Logo built from data-bars.
#### 139 "There's more to discover" (20 s, 0.7 s cuts!) [macro-horizon-montage][serif-word-per-shot]
- Every shot is a different curved horizon edge seen macro: sunrise over Earth, citrus slice, leaf, cake crust, beads, ceramic rim, map globe, lace, agate, fur, blueprint lines, collage art — all sharing the SAME curved-horizon composition (match-cut on shape). One serif word per beat centred above the curve ("There's / more to / discover"). Fastest cutting observed; works because composition is locked.
#### 140 Motion MCP (dark, 26 s) [dark-UI][chat-agent-demo]
- Logo "∷ Motion [MCP]" with tag pill; tiny dark UI panels on charcoal, blur in/out; greeting serif "Evening, Shiv" over input with orange send; chat "make me a video using the essay on my desktop" → steps list with checkmarks streaming; generated video player shows "Wealth vs. Income Tax" chart card. Agent-workflow demo.
#### 143 Abstract loop (8 s) [flat-shapes-loop] — green/blue/yellow/orange blocks with grey brush blobs morphing in place (blob scribble animation). Brand pattern loop.
#### 144 X Numbers (light, 31 s, 1 shot) [whitespace][orbital-lines][digit-roll]
- Off-white; concentric dashed orbits with small dots rotating (orbital/radar motif) around "Introducing X Numbers" typed; keypad dots (3x3 + 1) pop in sequence; phone number digits roll individually like a slot/odometer "3555-0162"; phone UI; menu list items slide; circular dial text around phone; black dot closing. Continuous, calm, mono.
#### 145 = duplicate of 004 (robotics archival).
#### 146 Voice Agent Builder (light→dark, 46 s) [whitespace][orange-accent][typing]
- Off-white; "Introducing" with thin orange curve lines sweeping (light streak); "Voice Agent Builder" with waveform icon; dark list of agents as rounded pills with glowing orb avatars; black "Create Agent +" pill; tab bar icons with orange underline that slides to "Configuration"; form typing; large grey sentence typing with key words in orange and a orange text caret; dark: chat bubbles with purple glass orb avatar.
#### 148 = Nova Score (001) variant.
#### 149 Tripadvisor (Koto, 10 s) [logo-zoom][brand-green] — owl logo in mint circle on white; zoom fills screen with neon green #14FF5A, owl eyes blink/close (shape morph), back to small icon. Logo character animation.

#### 152 Stack Overflow (Koto) [logo-sting][brand-system]
Orange #F2540A, stacked-bars icon animates in/out beside black wordmark. Icon parts stagger in, wordmark holds still.

#### 154 AI content tool (x 2100199808220758016) [whitespace-UI][gradient-blob-orb]
Light UI on pastel aurora. Progress bars with red tick stripes, "Polishing post…" + orb. Gauge with rainbow gradient arc counting to 99% then 100% (count-up overshoot beat). Editor; collections list with photo stack.

#### 156 abstract shape-morph chain (beige) [match-cut-shape]
Line becomes rainbow vertical bars, then folded gradient planes, then gradient pills, spheres, dark discs, "work together!" pill, pink sphere, pink gradient lens shapes. Each shape morphs into the next — no hard cuts, continuity carried by shape.

#### 157 Inbox Monster (Verve) [logo-sting]
Neon green. Envelope opens, monster eye pops out (character squash/stretch), wordmark slides in.

#### 158 SurfCash [3D-product-CGI][dark-premium-UI]
Lavender + floating 3D coins; logo bars build. Huge blurred amounts "$92.05 → $100.00" with focus pull (rack focus on numbers). QR pay; "Successful Payment $99.9". Navy light-streak scene, 3D USDC coin flip. Hex lock + "SELF-CUSTODIAL WALLET" bold condensed caps.

#### 159 Lovable Partner Program [editorial-swiss][gradient-blob-orb]
Cream bg, bold black left-aligned title; blue/pink gradient sphere with rising particles enters bottom-right and exits. One element of colour on a quiet page.

#### 160 B&W cinematic AI film [archival-montage]
Tiny serif subtitles, one phrase per shot. MRI, butterfly with tracking boxes, gears, space debris, face grid, "650 → 1,798 GPUs" over monitor rows. Small four-dot logo. Restraint: tiny type over big imagery.

#### 161 Jitter AI [kinetic-type][whitespace-UI]
"Jitter AI" huge violet gradient type with wipe; glowing "is here / Have an idea?". Poster examples with pixelation dissolve; blue liquid gradient lock screen; B&W fashion posters. "Don't wait / Build the design tools you need". Chat UI "Animate anything. Literally." "No coding required".

#### 162 Lime Studio showreel [agency-reel][brand-system][kinetic-type]
Acid lime #7CEB2E + light grey + black. Opens with a thin line that extends into a lime band (line→bar→full-frame wipe). Studio name types in letter by letter. Statement "Designing the sickest web3 products and brands on:" builds word by word with an inline pill tag ("web3") and an icon dropped into the sentence. Chain list (SOLANA/APTOS/ETHEREUM…) on black, revealed by a pixel-block (8-bit staircase) wipe in lime. Pixel arrow transition. Logo construction: sketch grid + annotations ("too thin?") resolves into final ZETA logotype — process-to-final reveal.

#### 163 B&W AI manifesto film (same campaign as 160) [archival-montage]
Tiny centred white sans subtitles, one phrase per shot ("every thought." / "becomes" / "someone else's" / "to keep"). Shots: MRI, hand on keyboard, robot hand touching human (Creation of Adam), girl+butterfly with HUD tracking boxes, gears, crowd blur, space debris, halftone face grid with constellation lines, tracking-box pedestrian top shot, logo mark on black, monitor rows "650 → 1,798 GPUs". 35 shots in 30 s (0.86 s avg). Lesson: cut on every phrase; sentence is spread across shots.

#### 164 ElevenLabs Flash v2.5 [cursor-demo][whitespace-UI]
Light grey bg, dark code card floats with soft shadow, code types line by line, cursor clicks "Run" (camera pushes into button). Hard switch to black with red→yellow glowing gradient type "Flash v2.5" / "Time-to-speech generation" (warm glow, bloom). Back to white: latency ring gauge counts down 500ms → 408 → 119 → 75ms (count-DOWN as a win), ring fills green. Headline builds word by word "This is the fastest model of its kind". "Build, test, and deploy." stacked left + config cards (LLM / Voice / Avatar) with gradient-border focus states, cursor picks options, chat bubbles.

#### 165 ElevenLabs MCP [dark-premium-UI][cursor-demo]
Charcoal #1a1a1a. Logo + "MCP" with toggle switch flipping on (blue). Small capability pills stack (Voice/Dubbing/Image & Video). Prompt box zooms in, text types "Build a campaign for my brand using this reference photo, add a voiceover and background music". A PDF card (brand guidelines) is dragged in. Then generated media: pink-hoodie couple photos in rounded cards that resize and slide; final blur-out. Generated output presented as a carousel of rounded cards on dark.

#### 168 Anthropic/Claude history film (raivcoo) [archival-montage][kinetic-type]
"For 70 years," over archival B&W computer photos; diagrams; Kasparov 1998 / 2004 date stamps; CRT with "2026". Phone/foldable screens. Claude chat box "How can I help you today?" / "Ask anything" pill. Retro TV comedy clip with typewriter captions "Hey Clicky!" "Daddy's home!". CRT red screen "think". JSON code wall with big words "write". Terminal "plan mode on". Robot. Speed-ramp rainbow motion-blur rail tunnel with "Agents are amnesiacs". Maze lines drawn on navy for "it has done before". Mixed media collage; each line of copy gets a different visual metaphor.

#### 170 Alright Studio reel 2026 [agency-reel]
56 shots / 60 s (1.07 s avg). Black frames with tiny four-corner type ("Alright Studio Reel 2026") between bursts. Blackletter "ALRIGHT" over botanical B&W; chrome metaball blobs splitting; brand case clips: food (Heritage Sourdough condensed red/white), e-commerce grids, 3D can rotation on checkerboard (transparency grid as aesthetic), Arizona can, "A SUPREME GIFT FROM THE UNIVERSE" tracked caps with a circled word, red geometric line diagram. Reel grammar: black pauses + fast case bursts.

#### 171 Animade reel 2026 [agency-reel][logo-sting][3D-character]
Coral red #F04050 + pink. Logo "oo" eyes → "animade" wordmark; giant words cut in per beat ("made" "made with" "motive" "humans" "joy"), letters squash/bounce, the "o" becomes eyes. 3D characters (yellow blob, teacup) squash and stretch. LEGO builds, cartoon 2D, 3D stylised characters, star with flame frames. 58 shots / 60 s. Lesson: brand reel = word-per-cut with bold flat colour fields.

#### 174 Founder story video (x 2089705534807265280) [kinetic-type][talking-head]
Talking head + word-by-word captions placed spatially around the subjects (not bottom subtitles) — words appear one by one, white bold sans with heavy weight, large keywords ("€1.3 million for charity") zoom past camera. Photo frame on navy pushes in to full bleed. Interview B-roll with words stacking beside the head; UI notification bubble pops in. Dynamic caption layout = premium "Hormozi-lite" without the colour.

#### 166 3D toy-shape tower (raivcoo) [3D-product-CGI]
Light grey studio floor, a stacked sculpture of playful 3D primitives (pink sphere, blue wire cube, orange waffle, green torus) — camera dives in with shallow depth of field (bokeh foreground), orbits a white ring with orbiting balls, pulls back out to the full tower. Push-in / pull-out bookends = "zoom into detail" loop.

#### 167 Vintage-map explainer (raivcoo) [paper-collage][kinetic-type]
Old atlas map, glowing outline traces a country (Scandinavia → Arabia) with soft white glow; map pans. Then teal watercolour paper: hand-cut condensed caps captions build word by word with a face cut-out and banknote image inserted INSIDE the sentence (rebus captions). Words get pushed aside when a photo inserts.

#### 175 Figma shaders / AI effects (x 2069825658276974592) [dark-premium-UI][cursor-demo]
Black bg, floating square tiles each showing a different shader treatment of a flower (halftone, dot-matrix, pixel mosaic, ASCII) — tiles fly in and overlap like a collage. "Shape your own shaders" light-blue sans, words appear staggered. Then the app UI (light), prompt bubble types "Can you make a custom organic distortion effect?", parameter panel slider animated by cursor (Displace 0→100%) while clouds warp live; gradient-map panel on portrait (orange/yellow/green). Lesson: show the knob AND the effect it causes simultaneously.

#### 176 ElevenLabs Conversational AI (x 1864005887808897024) [dark-premium-UI][gradient-blob-orb]
Same system as 164: black intro with blue→purple gradient words fading in left to right ("Building AI agents that can speak / is now easier than ever."), final line scales up and brightens to white with gradient highlight word. Cut to white: holographic iridescent orb (conic gradient, blue/pink/cyan) breathing, shrinks to an icon; "Conversational AI" gradient text + logo. Same "Build, test, and deploy." config card build with cursor. 2 shots in 117 s — almost all in-camera animation, no cuts.

#### 180 Athletics NYC agency reel [agency-reel][brand-system]
57 shots / 58 s. Logo "A" mark on black, then collage of brand assets flying around the mark. Fanned 3D paper stacks (rotating card arrays) on pink/lavender gradients. Billboard mockups in a subway, laptop on green screen colour, Chrome case studies (yellow/pink). "Technology, for better." serif on acid yellow with gradient blob. "We make brands that get to work" small serif white on black, word by word. Blue radial-gradient fields with a spinning radial-dash logo; extruded blue 3D type "TURF". Reel = case snippets each ≤1 s, glued by consistent black type cards.

#### 182 Artlist Studio [3D-product-CGI][dark-premium-UI]
Cinematic AI footage (ship hull in ice, fireball in city, motorcycle on runway) with wordmark split around the subject ("Artlist  [subject]  Studio"). Cards of generated images float in 3D on black and fan. Frosted-glass rounded windows framing scenes (glassmorphism frame). Hands typing (real b-roll top-down desk) alternating with UI: prompt "A man in his early 3…" types over portraits. Dark app UI with timeline; a character cut out with glow rim lifts out of the UI and rotates (subject extraction). Grid of character angles.

#### 187 Bartek portfolio reel [whitespace-UI][device-mockup]
Very clean: off-white and black alternating. Website screens slide in, phone mockups (iPhone, 9:41) centre-frame, camera push into the phone to show the UI at large scale (crop-in to UI = "zoom to readable"). Search field types "Racing leather jack|", product grid of fashion items, outfit builder, QR code, wallet balance "$32,101.70" counting. Rhythm: wide device → tight crop → next device. 1.5 s avg shot.

#### 188 Blue isometric illustration explainer (raivcoo) [flat-illustration][gradient-blob-orb]
Monochrome blue/periwinkle palette, soft grain gradients. Browser window with an eye icon (privacy), password field, cursor; lock closes/opens; scene morphs into dark blue with floating app-icon squares; geometric shapes (half-moon, L-blocks, star) assemble inside a browser window like a Bauhaus composition. One continuous shot (28 s, 1 cut) — every transition is a morph inside the same frame.

#### 189 Tavus Magic Canvas [whitespace-UI][kinetic-type]
Warm off-white #F3F0EA, small rose text "Introducing" types in; cut to huge "Magic" / "Canvas" white type on hot-pink/blush mesh gradient, letters slide in with a mask while gradient drifts. Back to off-white: tiny UI elements (prompt pill with name tag "Andrew" like a multiplayer cursor, video tiles) float sparsely on a big empty canvas. Typing → "Thinking…" → card expands. Extreme whitespace; UI at 20% of frame width.

#### 190 Launch-any-thing showreel [agency-reel][logo-sting][whitespace-UI]
Blush bg: black geometric fragments (triangles, quarter-circles) converge into a mark (assembly logo). Black: teal 3D triangle + ball form logo, wordmark slides out from behind icon. Numbered feature card "4. Build with your team" with multiplayer named cursors (Anna, Leon, Jack in coloured flags) flying in. Dashboard bar chart with cursors. Big blurred-to-sharp price "$97.85 → $100.00" + pay pill, QR. Light-blue: blue 3D monster mouth chomps cards ("that's bleeding money") — character as metaphor. Dark: glowing purple 3D arrow cursor drags a slider, "Up to $200K Initial Funding" with purple gradient on the number. Blue: phone mock + "Earn up to 9% APY" counting.

#### 192 Linear mobile agent (x 2082855724443389952) [dark-premium-UI][device-mockup]
Pure black, a phone UI tilted in 3D perspective (≈30° X-rotation, receding plane), shallow depth of field, very dim — text types in a comment field "add a preview so I can verify this change", keyboard visible, then "Working…" state. One continuous camera glide across a tilted screen = "Linear look": dark, slow, perspective, low contrast, focus falloff.

#### 193 AI hallucination explainer (x 2105044589136486401) [paper-collage][kinetic-type][2D-character]
Retro paper-cut collage: blue/cream/mustard paper textures, a cartoon woman's head opens like a lid with paper scraps flying out; hand-drawn script + condensed caps label-maker captions ("AI WILL confidently TELL YOU SOMETHING THAT ISN'T TRUE") building word by word in mixed fonts. Paper robot characters, scribbles, red starburst pow behind a sticky note "Do sharks have bones?" pinned with a pushpin. Red string-board lines draw across "IT PREDICTS THE NEXT LIKELY WORD". Vintage ad clippings. Mixed fonts per word = ransom-note energy but controlled to 2-3 families.

#### 194 Quiver AI "Arrow 1.1" (Harshit) [whitespace-UI][kinetic-type]
White: scattered sticker-like SVG illustrations float, "This is Arrow 1.1" big grotesk slides in letter by letter with clipping mask. Charcoal: "An SVG model / Built for designers" small centred text with portraits sliding in from edges around it. White "Turn any idea" types word by word. Prompt box on a soft pastel flower photo, types "geometric fox head logo, sharp edges". Generation shown as raw SVG path code text raining in the background while the fox logo vector builds stroke by stroke in the centre — "show the model's raw output as texture".

#### 195 ElevenLabs Voice Design (x 1849079785869242368) [gradient-blob-orb][whitespace-UI]
Giant blue→cyan gradient "V" fills frame then shrinks to "Voice Design" title (scale-down reveal from inside a letter). Character images (pirate) in rounded cards with glow, a horizontal conveyor carousel of fantasy portraits on a blue/lavender mesh gradient. Prompt form types "An old wizard with a raspy voice"; card collapses into an iridescent orb (loading), orb expands into the wizard card with caption. One shot, all in-camera.

#### 196 Instagram rebrand 2025 [brand-system][kinetic-type][logo-sting]
Black. Logo icon over fisheye skate footage; "Instagram is built for creativity" captions with a hand-drawn circle around a word (marker ellipse annotation). Script wordmark shown with construction boxes/bezier handles, extreme zoom across letters ("nst", "gra") with ghost outline. "a new wordmark" with hand-drawn underline swoosh, flip to off-white "and brand system". Icon set slides through as a horizontal row. Bracketed corner-frame UI ("from the roll"). Lesson: annotation strokes (circle, underline, arrow) drawn on with stroke-dashoffset.

#### 198 Cosmos Studio showreel 2 [agency-reel][dark-premium-UI]
Pixel/stencil display type "COSMOS" flickers on (glitch letter reveal) with Ukraine flag accent. Purple OCTY 3D pills, tote bag, portrait with chunky rounded type "creative director". Chrome helmet dark bg with "CREATIVE UI/UX DESIGN STUDIO" letters scrambling (text-scramble decode). Acid green crocodile 3D site. "PRODUCT DESIGN / WOW WEBSITES / BRAND IDENTITY" one per cut in white caps. Floating device mockups on lavender/purple. 30 shots / 61 s.

#### 203 The Org (Verve) logo sting [logo-sting][brand-system]
Off-white #F3F7EE, giant black blocky mark (zoomed in) scales down to reveal it is the bracket above "THE ORG"; letters type in T→THE→THE OR→THE ORG; collapses to app icon. Pattern: "start inside the logo, zoom out to reveal."

#### 204 ElevenLabs Image & Video (x 1990473266247380992) [whitespace-UI][gradient-blob-orb][kinetic-type]
Light grey: logo then "Image & Video" header; a vertical list of model names (Kling 2.5, Veo 3.1, Sora 2 Pro, Seedance…) scrolls like a slot-machine/teleprompter, the highlighted item jumps right with a dot; faded items above/below (focus list). Gradient circles (magenta/orange, cyan/pink) multiply and overlap like a Venn diagram with additive blending. Final masonry grid of generated images flies in on blush gradient.

#### 205 Conveo [dark-premium-UI][data-viz][editorial-swiss]
Charcoal #1E1E1E with coral/orange/pink palette. Polar/radar chart of dots and spokes rotates in; tiny serif white text ("Project research", "It answers a question", "Then … it stops.") spaced across frame with long gaps between words (time = spacing). Concentric dashed rings in coral/pink/yellow spin at different speeds with arrows (circular radar). Aerial crowd footage with serif caption "Consumer behaviour changes". Lens-shaped gradient ellipse grows ("A pattern emerged"). Serif + data rings = premium research brand.

#### 206 QuickTables founder story [paper-collage][kinetic-type][talking-head]
(212 is a cut-down of the same.) Teal paper texture bg, B&W cut-out founder photo with white sticker outline, white condensed caps captions building word by word with a hand-drawn underline swoosh. Polaroids slide in, website screenshot card tilts in. Isometric 3D restaurant buildings pop up around caption "AS ALL THE BIGGEST CHAINS IN THE WORLD". Vintage relief map with face cut-out on a dotted travel path. Torn-paper red heart breaks apart ("got broken up with"); cardboard box "YOU'RE FIRED" stamp. Collage skyline of cut-out buildings rises from bottom while words scatter around spires. Then interview with word captions. 3.2 s avg shot. Founder story = collage per sentence, literal visual for each noun.

#### 207 Bionic bird film (x 2050249969731538947) [archival-montage][typewriter]
Black: "What if birds weren't real?" types character by character with a blinking caret, ~10 chars/s, white medium sans centred, holds after "?". Then archival etchings (Da Vinci sketches), footage in rounded-corner CRT-curved frames with tiny lowercase captions bottom-centre ("for five centuries", "the greatest minds on earth"). Real eagle footage then drone; audio waveform overlay at end.

#### 209 Brew by Anyway [kinetic-type][gradient-blob-orb]
Warm peach/orange blurred gradient background (glow fields), huge black grotesk "Today•" with a blur-in (focus pull on type), small orange dot arrows as punctuation. Black pill capsule with counter "1 → 6 days → 8 days" (number in a pill that resizes). "to {{create}}" code-template braces. "an (on-brand) email" where images/icons/inline emoji-like stickers appear INSIDE the sentence between words (inline media type). "Let's change that" — the word "change" gets struck and replaced with sparkle. Full orange gradient: "Meet" → white logo "Brew" → "Start ✦ building on-brand emails" — sparkle icon pops between words. "Faster than ever before" with 'ever' in orange. Sentence = layout; words reflow as new ones land (layout animation / FLIP).

#### 210 Equals (SomeOne) logo sting [logo-sting][3D-product-CGI]
Magenta/purple liquid glass 3D swirl with a lime-yellow light streak, slow camera drift. A dot drops, becomes "=" mark (two pills), wordmark "equals" wipes out from behind the mark (mask reveal sliding right). 10 s, one shot.

#### 213 Singapore geography explainer (raivcoo) [map-explainer][kinetic-type]
Stylised 3D relief map with clouds parting (fly-through), yellow label boxes with black bold text pop in ("Malaysia", "Indonesia"), dashed shipping lane draws on, HUD ruler with odometer counter "00015" ticking. Ships move along lanes with yellow dot callouts ("Oil", "Electronics", "Cars"). A ship wipes across frame (object wipe transition) into a flag graphic (red/white, star) with "SINGAPORE" condensed bold caps + coordinates. Collage: Marina Bay Sands cut-out over paper waves, huge red serif italic years 1991 → 2016 → 2024 → 2026 counting (year roll).

#### 214 Talking head + sticker cut-out (raivcoo) [talking-head][kinetic-type]
Interview with big white bold words placed beside head. Subject becomes a white-outlined sticker cut-out on a pale marble bg (rotoscoped "sticker pop"). App icons scatter around "what if…" small serif. Monitor mockup grows with a yellow ellipse shadow, then fills to a website.

#### 215 ElevenLabs v3 (x 1930686026730582018) [dark-premium-UI][gradient-blob-orb]
Black: "V3" chrome/white letters fade in with heavy bloom, then gradient pink→magenta fills the letters (light sweep). Small "Everything you're about to hear was created with Eleven v3". Then 3 minutes ONE shot: a dialogue script text with audio tags ([EXCITED], [WHISPERS]) — the word being spoken highlights karaoke-style — over a slowly drifting warm fire gradient (orange/yellow/black lava lamp). Background motion carries a static text frame for 3 minutes.

#### 216 Codex Micro (product launch) [3D-product-CGI][whitespace-UI]
Pure white. Tiny black sentence types with a black dot cursor ("Every idea has a starting point ●"). Black puck rotates, becomes a macro-keypad; key LEDs light up blue/purple in sequence. Macro shots slide across keycaps with shallow DOF (product hero macros). Product shrinks to small centred object under new typed line "Generate a full design system ●". The dot-cursor typing line is a reusable caption device.

#### 217 Colour/form brand (raivcoo) [editorial-swiss][3D-product-CGI]
Cream #ECE4D8. "new hue." serif with gradient letters; staircase of colour swatch cards (rainbow, each labelled) fan out like a deck. Red-orange arch/rectangle mask reveals a marble sculpture rotating inside, "a distinct FORM" with red serif caps sliding in behind. Arch-shaped masks (window shapes) as image containers.

#### 218 Murilo Almeida reel [agency-reel][kinetic-type]
Red neon on black: a bracket draws, heart icon, "MURILO" letters arc (text on a path), "REEL" red neon glitch, arrow. Chrome liquid metal bowls with ball bearings (3D). Rainbow 3D particle sculpture in a wireframe box; word "is" / "open" over tangled ribbon. Acid green "ONLY ON WEBTOON" splashy illustration with bouncing letters. Radial type rings "GYMNOSIS" spinning in circular text on red/blue/white. Magenta flower petals open like an iris with words ("Step / into / the spotlight / All eyes on you"). Fortnite RELOAD, gaming WORLDS '23 with stacked type. 1.5 s avg. Lesson: circular text + iris-petal reveal.

#### 219 Commas (x 2090828216273354752) [whitespace-UI][gradient-blob-orb]
Pale sky-blue gradient; logo starts as a halftone dot-matrix sphere rotating with a play cursor, collapses into blue comma glyph + "commas" wordmark. Prompt box types "Hey Commas, I sell a $1,497 coaching program…". "Type once / Build instantly" small black text appearing letter by letter with gradient fade. Landing page builds; zooms out to a node flow canvas (pages connected by lines = funnel map).

#### 220 Vox "The Mind, Explained" animated segments (raivcoo) [flat-illustration][editorial]
B&W illustration with grain/stipple shading (engraving style), tiny yellow accents. 9/11 footage → reduced to a drawing of a TV inside a frame; panels of comic-like frames (multi-panel split screen) appear in sequence; hand with ring, envelope, plane, circular masks (iris in). Stipple texture + limited accent colour = editorial explainer look. 55 shots / 157 s.

#### 221 Framer 3 [dark-premium-UI][neon-glow]
Deep black with electric blue neon edge light: a vertical light bar sweeps open to reveal UI panels (light-sweep reveal), panels drawn as glowing blue rims. Big glossy "Publish" button with specular highlight, shrinks into toolbar. Agent chat panel, desktop breakpoint frames outlined in blue grid, HAUS website. Lesson: rim-lit UI emerging from darkness via a moving light bar.

#### 223 Capacity (Pentagram) logo sting [logo-sting][data-viz]
Black + thin white lines. Dot → circle → radial lines burst outward (sunburst ticks) → concentric dial built from hundreds of radial strokes rotating → condenses to "C" → letters "CAPACITY" wipe out from the C, thin geometric sans, wide tracking. 8 s, one shot, all line art.

#### 224 Codex intro (Cordex) [whitespace-UI][gradient-blob-orb]
Dreamy photographic bg (sky, flowers, soft focus), "What should we work on?" + prompt pill typing "Build me a website / a tool", mic and arrow buttons with cursor. White: dashboards scatter like cards, then collapse into a blue blob which pulses with concentric rings, shrinks; "No complex syntax / No learning curve" — a small blue ball leads the text like a cursor (dot cursor wipes words in/out). Ball inflates into the Codex cloud icon with ">_". App icon on flower photo "this is Codex."

#### 226 (= 175 Figma shaders) duplicate.

#### 227 Willow Voice [3D-product-CGI][kinetic-type][device-mockup]
Sky-blue photo bg; 3D translucent keycaps ("You", "Type", "Still") tumble; "in 2026" type sits between keys. Gorilla/octopus hands pressing keys ("The most advanced species / On Earth" with inline emoji images). Woman typing with "Still types" framing her. Gradient phone silhouette spins. Top-down desk with cutting mat, phone "Willow for iOS", camera slides along. Lilac/pink flat backgrounds with phone and sentence "Stop typing / Start talking / your text is there", phone slides between words (object-inside-sentence).

#### 228 Microsoft Surface (performance) [3D-product-CGI][dark-premium-UI]
Pure B&W, extreme macro of a turbine fan with monospace terminal text typing "THROTTLE=OFF -- EXECUTE" with block cursor highlight. Laptop fan as X-ray/blueprint, exploded view layers stacking (components flying vertically into a laptop, slit-scan glitch), wipe lines on chassis edge. Light trails race track. Industrial monochrome + monospace = engineering power.

#### 229 Trading-agent chat UI (raivcoo) [dark-premium-UI][neon-glow][cursor-demo]
Charcoal. Title "Type your strategy just like you'd say it" where words colour-shift red→white as they settle. Chat input types a long prompt, cursor clicks a gradient-bordered "Send" (pink→orange→yellow glow ring). Neon light streaks (orange/pink curved lines) sweep across as transition. Response cards; green-outlined chosen option; chart card with glowing animated gradient border (conic border rotating). One continuous take with camera pans.

#### 230 / 244 QuickTables collage segments (raivcoo) — same system as 206 [paper-collage][kinetic-type]
Teal paper, white condensed caps caption grows word by word; polaroid photo and money/building cut-outs slot into gaps in the sentence (rebus). 244 adds: storefront photo with "CLOSED" sign; article screenshot with yellow highlighter sweeping key lines (highlight-marker reveal), a second article card slides over with highlighted text, camera pushes into highlight. Teaching: documentary evidence = article card + highlighter + push-in.

#### 232 Dogstudio/DEPT reel (Aurora) [whitespace-UI][3D-product-CGI]
Tiny "DEPT." on black; "The future of freight is driving itself" small centred; dark 3D sensor hardware macros; real truck footage; website mockup on dark with "Self-driving freight is here." Then all-white clay-render 3D truck (monochrome white matte render) with blue hotspot pins and info cards ("Meet the Aurora Driver"). Blue 360° visibility radar. Clay render = premium explainer neutral.

#### 234 Wednesday Studio reel 2026 [agency-reel][brand-system]
Black: liquid white blob morphs into logo "W". Acid green/cyan/blue gradient frames with black cards (Showreel 2026). Arrakis brand: logo construction grid, wordmark on cream and dark, medallion on desert sunset, billboard in desert; type specimen pages (JetBrains Mono M/R/L with toggle pills — specimen animation), topographic line map UI. Chaos Labs blue: orbit logo, merch. Brand-reel grammar: grid → mark → in-world mockups → specimen → merch.

#### 236 Claude.ai product film (raivcoo) [whitespace-UI][cursor-demo]
White: a browser window flips in from the side in 3D, tabs cycle (Google, Gmail, ChatGPT, Instagram, Twitter, New Tab) as the URL bar types, finally Claude tab. Window glides onto grey with a soft coral-pink blurred glow behind. "✳ Good afternoon, John" serif greeting zooms huge then pulls back; prompt box; model picker dropdown (Opus/Sonnet/Haiku) with cursor click. 2 cuts / 62 s — continuous camera through UI. Coral glow blob behind UI = brand warmth.

#### 237 Makemepulse reel 2021-22 [agency-reel][3D-product-CGI]
Monochrome sculpted 3D curve with logo type, cartoon desert landscape, flowers in phone cards, white circle wipe (growing circle transition), LEGO red with grid of screenshots, hand-drawn line gallery ("LOOK CLOSER" handwritten with arrow), pink worm 3D. 1.6 s avg.

#### 238 Grunge documentary title sequence template (raivcoo) [archival-montage][grunge]
Paper/photocopy textures, light leaks, film burn, scratches, VHS tracking glitch bars. "SKYMOTION" bold caps, eagle logo stamp "PHOENIX PICTURES" with yellow highlighter swipe under text. Blueprint/technical drawing overlays, yellow X crop marks, credit name boxes (white on navy chips) with yellow hand-drawn ellipse circling. B&W archival photos. 1.9 s avg. Classic AE template look — texture stack does the work.

#### 240 Microsoft 365 / Copilot (NotReal) [3D-product-CGI][glass-orb]
Soft lavender/blue 3D world: swirling ribbons with app icons, iridescent torus ring, tunnel of blue rectangular frames (infinite zoom through nested frames), desk scene in purple light. Glassy 3D UI panels with pastel icons on tilted planes, stack of cards fanning. Pink scene of glass/food objects with search bar typing. Paper-like UI sheets flying in arc. 1.45 s avg. "Fluent 3D": clay+glass, pastel, soft shadows, camera always moving.

#### 241 Agents (x 2041518471046193152) [kinetic-type][retro-pixel]
Pixel-art landscape (green dithered, bitmap tree, blue cloud pixels) with sentence in black over white highlight boxes "What if your agents were as capable as you?" — key words in orange. Lavender: prompt boxes stack vertically with app tags (Clay, Lovable, Ramp) and a red "Your agent" cursor flag clicking send. Pink: website screens with agent cursor navigating. Highlighted caption chunks ("because most of the web") on pink-box highlights. Dither/pixel aesthetic for "the web" metaphor.

#### 242 Illustrated loop (raivcoo) [flat-illustration]
Yellow, arched frame with monstera leaves, teacups, stacked dishes — static illustration with only sparkle twinkles and gentle sway. 8 s seamless loop. Lesson: tiny ambient motion on a rich illustration suffices for a loop.

#### 245 Microsoft 50th (Koto) [3D-product-CGI][retro-pixel]
Vertical. Voxel/pixel "50" in Microsoft four colours as extruded glass-dark 3D blocks floating on soft blue sky with grain, gentle bob + rotate loop. "#Microsoft50" small caption. Pixel nostalgia in premium 3D material.

#### 246 Cashtags (x 2102147574534672385) [whitespace-UI][device-mockup]
(Pilot-reviewed brand.) Light grey with faint concentric orbit circles; partner logos in circles (Gemini, Kraken, Coinbase, moomoo, Interactive Brokers) orbit around the centred text "Introducing Cashtag / Cashtag Partners / For stocks & crypto". Phones slide up from bottom, stacked phones with chart scrubbing cursor (crosshair drag updates price $399 → $556 → $326). Orbit diagram of partner logos = credibility device.

#### 247 Figma intelligent creative workflows (raivcoo) [whitespace-UI][cursor-demo]
Black: "Introducing intelligent creative workflows" lime-yellow sans fading in by word. Grey-blue canvas: vertical list of action cards (Apply style to sketch, Change lighting, Generate icons…) scrolling infinitely with cursor hovering; a blurred-stripe "loading shimmer" sphere made of horizontal bars collapsing to dots (scan-line morph). Panels open with Texturize input "Offtrail" + "Rock" → Generate. Many simultaneous floating cursors.

#### 252 Klar education (raivcoo) [paper-collage][kinetic-type][grunge]
Dark black textured, backlit paper shapes (glowing torn paper squares → diamonds → clover) as an in-camera light-table animation; tiny caption. Then huge left-aligned cream text building line by line mixing grotesk + serif italic for emphasis words ("forcing", "old fashioned", "bet everything on Klar"), photo cut-outs tucked behind letters, flower mascot peeking from corner. Serif-italic emphasis inside sans sentences = a strong recurring device.

#### 257 AI agent safety film (x 2051536305306341376) [archival-montage][kinetic-type]
Newspaper headline screenshots (Guardian, BBC, Wired, VentureBeat) with vignette, key phrase boxed by a drawn rectangle (red/black stroke box-in). News anchor footage with tiny subtitles. Black: "Deploy the Agents" input with cursor click → "Deploying…" with particle dissolve. Evidence montage = headline + box highlight.

#### 258 World Cup football edit (raivcoo) [archival-montage][kinetic-type]
Circular vignette / binocular-mask frame over stadium aerial; serif text with italic yellow emphasis word ("Football has always been about moments", "Moments you feel before they happen"). Crowd/players with serif italic yellow single words ("Holds its breath", "Watches"). White: national-team crests scatter, footage frames echo trail (stacked duplicated frames = echo/stutter trail). Fast cuts 1.29 s.

#### 259 Rivera Sisterz / "AI computer" film (x 2102335304157839360) [archival-montage][kinetic-type]
Equation "ΔxΔp ≥ h/2" on black, cinematic close-ups of a man in dark office, macro keyboard, chat input "Why does humanity keep reaching further?" types, B&W science collage frames (X-ray hands, globe, plane blueprint, renaissance painting). Gmail inbox; context-menu "Cut/Copy/Paste" over selected text "rivera sisterz®"; giant text field "name |"; pixel "Downloading…" green progress bar; monospace "wrong one". 40 shots / 49 s. Mix of cinema + UI micro-moments.

#### 261 ElevenLabs agents for phones [kinetic-type][3D-product-CGI]
Off-white: words of a sentence are scattered across the frame (scattered sentence layout) with 3D product cut-outs between them ("Someone's calling to make an appointment / book a job / schedule a meeting") — telephone, hammer, cones, mug. Pixel-block dissolve transitions into a blue-teal halftone wave field with a 3D desk phone + "INCOMING CALL" pill. "But nobody's around to pickup." Red/orange gradient circle grows "Until now." → glowing sun orb with concentric rings on black.

#### 262 ElevenLabs Sound effects v2 (x 1962910122520256512) [dark-premium-UI][neon-glow]
Black with aurora green/blue light behind a tilted UI (backlight bloom), "Describe a sound…" input with option pills (30.0s / Looping) — glass pills with blue glow rims. Big numeric "44100 Hz → 48000 Hz" with slot-machine digit roll, turns orange. Pill morphs: timer "22s → 28s → 30s" (odometer) → "∞ Loop". Full-width waveform with caption under. One shot. Number roll + pill morph = feature spec storytelling.

#### 264 Blue abstract brand film (raivcoo) [gradient-blob-orb][3D-product-CGI][match-cut-shape]
Monochrome electric blue / periwinkle / navy. Glossy spheres in a wave, a floating gradient plane, diamond → eye shape with a glossy black pupil and lens-flare star; eye shapes duplicate in a symmetric pattern (kaleidoscope mirror), envelope 3D shape opens, ribbon peels, sparkle tile icon on white grid, cyan glass 3D objects on black, ripple rings tunnel. Single hue + shape vocabulary (eye, diamond, star) keeps 14 shots coherent.

#### 265 Sanctum year recap [data-viz][2D-character][kinetic-type]
(Pilot-reviewed brand.) Blue grainy aurora gradient + sparkles; "SANCTUM'S BIGGEST YEAR YET" one word per beat in different weights/colours (pink gradient "YEAR"), then stacked lock-up. Cute blob mascot fills frame. Dark: "TVL total 11.05 → 13.74 → 14.36 million SOL" counting with a water-drop icon overlapping; "+64% → +96% YoY" counters; dollar earnings counter; phone with line chart drawing. "Up next in 2026" with mascots orbiting. Year-recap = counters + mascot interludes.

#### 266 "I'm an AI that raised $30M" (Polsia) [archival-montage][retro-UI]
Data-art collage (circular viz, mushrooms, glitch mosaics, thermal city, dashcam with detection boxes, timelapse traffic, LED dot field) with italic serif subtitles. Black: pixel-face robot made of dots ("Hi! I'm Polsia"). B&W 1920s gentleman tipping hat. Paper-like serif UI ("Pumped & Productive") with robot-face illustration, checklist UI ticking green, black-on-white web UI "What's your idea?". Orange-outlined tooltip on line chart "Annual Run Rate: $1.3M → $9.5M" as the line draws. Terminal list wall "6,431 companies to be exact." 58 shots / 85 s. Vintage-retro-futurism + italic serif subtitles.

#### 267 Bynder (Verve) logo sting [logo-sting][brand-system]
Navy #1E2A5E. Coloured ribbon strokes (purple, blue, green, yellow) whip in and braid into the heart-chain mark, then paper confetti shards burst out as the mark resolves to white. 4 s. Mark-from-ribbons + confetti exit.

#### 268 Opacity rebrand [whitespace-UI][logo-sting][archival-montage]
Off-white #F4F4F4, tiny black sentence types with caret "Every era of software has been shaped by those who build." over a sequence of centred archival photos (sketch, garage founders, Mac, Windows paint, Ballmer, iPhone prototype) each in the same frame size — "history slideshow". Blue radial glow under a circle construction drawing; black square-with-circle mark; type construction outline "Opacity" with anchor points, tracing then filling. Glyph-outline-to-fill reveal.

#### 269 Intently showreel 2026 [agency-reel][dark-premium-UI]
Black "Showreel" large rising off bottom, "Intently" then logo. Blue speed-line tunnel with flying 3D poker chips, phone floating in sky with chips orbiting. Phone with dynamic island animation. Metal card with gold logo light sweep (specular sweep over embossed logo). "YOU. / YOUR TERMINAL / UP / UPGRADED" bold tracked caps one per beat. Trading terminal UI; wallet address input with text scrambling/encrypt decode effect; ASCII dot-matrix wave. 2.9 s avg.

#### 271 Gradient blob quote sticker (raivcoo) [kinetic-type][gradient-blob-orb]
Grey bg, an organic rounded "sticker" shape with yellow→pink→lime mesh gradient and yellow outline grows to fit an italic serif quote as words appear ("I'm my own boss and yet I think he's an asshole"); letter-spacing animates wider on hold. Container auto-resizes around text (blob container morph).

#### 274 Otter (Firmalt) [logo-sting][kinetic-type]
Green #10A56E, "otter" black serif bold. The "tt" letters do a playful hop/wobble (individual letters jump up and back, one italicises momentarily). 10 s, single shot. Personality via one letter pair.

#### 278 Base44 "Design Reimagined" (x 2057110113169629184) [kinetic-type][whitespace-UI][talking-head]
Off-white, paper cards drop in with orange sticky labels "2026"; huge grotesk "Design Reimagined" typed with block caret, deletion and retyping ("Re|ener|"); orange full-frame flash. Feature list ("Canvas / Asset Generator / Regenerate Design / Veo3 Generation / Collaboration / Themes") stacked centred, scrolls vertically like credits. Collage burst of generated designs (acid green/orange posters). Presenter at table, small captions; screen recording "BACHI BACHI" site insert. Typing-with-mistakes = human feel.

#### 282 Uber (JKR) logo sting [logo-sting]
Black, white. Vertical caret line → "Uber" letters flip/rotate in (3D letter flip per glyph) → symbol morph "○–□" outline to filled "●–■". 8 s.

#### 286 UKG (Lippincott) brand system [logo-sting][brand-system]
Deep teal #0B5A50 + mint #3ED6B0. Dots fly in and assemble into the "U" smile + "KG" letters; letters dissolve back to dots which reform into speech bubbles with dot eyes, then to the smile mark — dots as connective tissue between all brand icons (particle re-form). Then patterned mint panels slide with circular-cropped people photos.

#### 289 Brymstudio showreel [agency-reel][kinetic-type][whitespace-UI]
Black: blue flower icon drifts, wordmark slides out from behind it, icon grows to fill. Electric blue radial gradient "SHOWREEL" with icon replacing the "O" and letters reshuffling (letter-swap / glyph substitution). Huge blue "Rebu(ild)" type scrolls across over a meadow photo then text fills with photo (image-in-text). White: prompt box typing, product site. Serif "Timeless Design" split either side of a product cut-out (armchair) — word / object / word symmetric layout; "Crafted For Modern Living" around table. French caption with pink highlight word.

#### 290 Retro-geometric icon set film (raivcoo) [flat-illustration][brand-system]
Black with pink/cyan/orange/green/grey flat geometric icons (squares, gears, clocks, cassettes, faces), Swiss-modular "BUILD" letters made of machine parts (letters built from mechanical pieces), rotating clock dials, belts and pulleys animating, "MAKE IT REAL" with plus/minus nodes. Ends on pill "NEXT WORLD". Mechanical-toy motion (everything rotates on its own axis).

#### 291 Junk-mail stop-motion (raivcoo) [paper-collage][3D-product-CGI]
Kraft/beige set with stair-step pedestal. Coupons/junk mail collage, objects drop onto the steps one by one with physical bounce (magazines, milk bottles, apples crate), then laptop; robotic octopus arms reach in holding products (drill, camera, guitar). Stop-motion feel (objects on 12 fps steps).

#### 292 Group photo push (raivcoo) [archival-montage]
Off-white, small warm-toned group photo then slow push-in with blur — "Ken Burns" on a single photo. 4.8 s.

#### 296 ElevenLabs Dubbing Studio (x 1749863494445305857) [whitespace-UI][3D-product-CGI]
Mosaic wall of film thumbnails with logo, zoom-burst into astronaut clip "Dubbing Studio is here." Retro TV on wooden sideboard, screen content changes; camera dolly to laptop in same room (environment match). Radial zoom-blur transition into UI. Tilted light UI form with language dropdown, cursor clicks Create. Transcript rows "Neil Armstrong — That's one small step…" with Chinese translation column. Ends with tilted thumbnail grid.

#### 297 0x (Tubik) logo sting [logo-sting][gradient-blob-orb]
Pale blue-white. Five small 3D glossy icons (blue swirl, purple donut, red cone, orange box, green pill) hop in a row, then spin into a circular rainbow motion-blurred ring (things orbit and smear), ring collapses into the "Ø" glyph, ".org" types out → "0x.org". 5 s.

#### 299 Code w/ Claude conference (raivcoo) [retro-pixel][map-explainer]
Beige #E0DDD0, "Code w/ Claude" mono + serif lock-up, dot-matrix halftone globe rotating, the pixel crab mascot (Claude orange) sits on top wearing headphones and bobs, orange city tags (SF → London → Tokyo) with dotted flight arcs drawing as the globe turns. Mono subtitle "SF → London → Tokyo · In-person + livestream". 18 s loop, one shot.

#### 300 Framer logo animation (galshirart) [logo-sting][brand-system]
Electric blue construction grid: squares slide and shear into the Framer mark with a yellow play-triangle cursor. Black: mark faces assemble, a diagonal light beam passes, 3D glass extrusion with blue rim glow. Grid paper "Framer" with letter-spacing tightening. Blue/black/white versions cut on beat; type explodes into overlapping duplicates ("Fram Framer"); colour swatches #0099FF/#0055FF/#FFF/#000 as vertical bars; holographic chrome mark; merch (caps). 1.6 s/shot.

#### 301 Voice Agent Builder (X Ai 2026) [whitespace-UI][kinetic-type]
White with a thin pink/orange wave line curving through "Introducing" (sine stroke). "Voice Agent Builder" with waveform icon. Black-gradient mask wipe into dark list of agent pills with orb avatars, carousel scroll. "Create Agent +" black pill; orange underline tab bar morphing between icons and "Configuration" label (tab indicator slides + label expands). Prompt text typing large with orange caret and blur fade on older lines (scrolling teleprompter). Dark: chat bubbles + glass orb avatar.

#### 304 Yahoo (JKR) [logo-sting]
Purple #7B1CF6, "yahoo!" wordmark letters drop away leaving the "!" which shrinks to icon. 3 s. Reverse of build: subtract to the symbol.

#### 306 Lukas Mascher showreel 2025 [agency-reel][kinetic-type]
46 shots / 34 s (0.74 s avg!). Pixel-chunky "SHOW REEL" + huge outlined "2025" — type layered over type. Neon orange circuit board UI, light pastel app integration cards, glass "Publish" button with cursor, red stock-market treemap "DER CRASH", italic sport-style kinetic "backtesting" letters sliding, Google search typing, magenta neon chip, gradient UI dashboards, "YOU [Launch] WANT" pill in sentence, influencer edits with lime frames. German creator-economy aesthetic: dense, fast, neon on dark.

#### 308 Cinema 4D 2026 showreel [3D-product-CGI][agency-reel]
64 shots / 63 s. Showcase of C4D renders: storm castle, isometric buildings on a tablet, sneakers, Jean Paul Gaultier neon, red phone camera macro, stone V monolith, cloth noodles, diamond, sci-fi, metallic fractured textures, UI cards in 3D restaurant scene, exploded electronics, fire meteor, purple crystal tunnels. Lesson: 1 s per hero render, every shot has camera movement.

#### 309 Long-distance founder story (raivcoo) [paper-collage][kinetic-type]
Marble-white bg, stack of polaroids with handwritten caption, "this is" black bold sans beside; article card with yellow highlight. Torn photo splits a couple apart (torn-paper split), two photos drift apart with dotted arc between and "500 miles away" counter. Distance = literal space between objects.

#### 310 Tubik Studio showreel 2025 [agency-reel][kinetic-type][grunge]
Black + white "+" crosshair grid, thin lines, xerox-noise logo distortion (displacement/ink-bleed), "T→S", "S25", hand-drawn circle around script logo. "TUBIK⟳STUDIO SHOWREEL→2025" with arrows as glyphs. Laptops on deep green; editorial site slides; protein drink brand with condensed red/cream type stacks ("FREAKING DELICIOUS", "STIR UP YOUR FEARLESS PAST AND FUEL"), "#CHUGRESPONSIBLY" with liquid splash 3D; phone app trio on mint. 77 shots / 110 s.

#### 311 Francesco Prisco showreel [agency-reel][editorial-swiss]
Warm orange/black/blue: phone menus, stacked cereal boxes (repeating object array), helmet 3D, "ELECTA" wide-tracked serif over wine bottles, "PIZZATO" heavy blue with 3D flower ring, chrome surfaces, sardine tin + collage "FOOD IS THE HEART OF CULTURE", monitor in volcanic rock set. 1.1 s/shot.

#### 313 ElevenLabs Studio 3.0 (x 1968339366805155840) [dark-premium-UI][neon-glow]
Black: two pause-like vertical light bars streak in (light streak logo), "Studio" types beside, bars become "3.0" giant chrome-pink gradient numerals with light sweep. Tilted dark editor UI with magenta/purple backlight bloom; video track timeline; left-hand feature list (Text to Speech / Music / SFX / Captions…) with the active one bold as camera pans the UI (synchronized list highlight). One shot.

#### 314 Koto reel [agency-reel][brand-system]
55 shots / 63 s. Dot-pattern 4-point star (Gemini) particles converge; prismatic glass diagonal streaks reveal "NBCUniversal"; iridescent soap-bubble spheres; op-art checker warp; Windows logo in rainbow refraction; "MASSIVEMUSIC" bold on red/purple contour-line terrain; pixel 3D objects; "Putting travelers front and" huge green type with photo mosaic behind; TripAdvisor owl on neon green. Every brand gets one signature material.

#### 315 Spotify for Artists — video [dark-premium-UI][neon-glow]
Indigo/black with green Spotify glow: phone card rises on a light beam ("On Spotify, video is about more than views"). Card flips into nested rotating squares tunnel with green play button; Upload glass button morphs (stroke→filled, light flare sweep); cards scatter in a dark 3D grid; play button travels between UI tiles. 3 shots / 40 s.

#### 317 Peripheral product film (raivcoo) [3D-product-CGI]
Black, rim-lit glossy black mouse and keyboard emerge from darkness with a moving light band (specular edge highlights only), macro along keycaps, fade to white misty set: products on a round pedestal with a crystal city, "Futuristic aesthetics. Modern productivity." light grey bold sans. Low-key → high-key reveal.

#### 321 Neon road (raivcoo) [flat-illustration]
Purple night, blue city silhouette skyline, red sports car drives across with dashed lane, label "19 year old ▼" pinned above car following it (tracked label). 7 s.

#### 324 Figure robot [3D-product-CGI]
Black: two thin white light lines → head silhouette rim light. Dark set with "FIGURE" logo, white flash into an exploded field of mechanical parts floating around the logo. Monochrome studio macros of robot joints with tiny printed spec text and white LED dash; slow orbit. Apple-style product film grammar: rim light, macro, spec type.

#### 326 Orbix Studio UI/UX showreel [agency-reel][whitespace-UI]
Tilted grid of website screenshots scrolling diagonally (tilted mosaic wall). Black: "Our Skill Set / Adapts to / Every Challenge" with phrases in green pills and floating photo cards with sparkle stars. "Brand Identity" with logo icon inline. 3D signage "Buildea" green neon on building corner. Cards fly around title "App Design". Phone UI with number "24" counting. 2.4 s avg.

#### 328 Founder trio + ARR caption (raivcoo) [talking-head][kinetic-type]
B&W low-angle founders portrait, slow push; a glass app window rises in front of them. Interview wide with small white words placed beside subject; key number "€130,000 ARR" big bold appears with each digit snapping in. Small text for the sentence, BIG for the number.

#### 329 Addition agency reel [agency-reel][editorial-swiss]
Black/off-white/blue alternation; magazine site in phone; headline list with blur-in per line; real-estate photography; tall digital signage kiosks on blue sliding in perspective; hands with phone (live action) then phone UI on wood; peach row of article cards scrolling horizontally; listing cards with prices; gradient phone wallpapers (yellow→pink, purple). Documentary portraits at end. 1.24 s/shot.

#### 331 Anime RX-7 portal (raivcoo) [flat-illustration][3D-product-CGI]
Vertical. Grey studio, a thin vertical panel rotates open like a door (3D card flip) revealing an anime sakura landscape with a yellow Mazda RX-7 that breaks out of the frame edge (out-of-bounds pop: subject overlaps the card border). Scene inside the panel pans through Japanese town; vertical katakana "マツダ RX-7". Panel rotates closed. One shot.

#### 332 Memoir (x 2061524113513148416) [editorial-swiss][kinetic-type][data-viz]
Warm cream #F2EDE4 + red #E8402A accent. Small photos with caption "Shipping isn't the bottleneck anymore." (red highlight phrase). Red round icon with a constellation of floating small mono numbers (24/7, 193ms, 4,811, -64…) drifting around it — metrics cloud. "Attention is" large light sans; tiny red label tags. Black square in centre on dot grid, dots stream into it (particles absorbed). Black "M" folded-book logo draws from outline to fill, serif italic "Memoir". Swiss minimal with one red accent.

#### 333 Vivid Motion showreel [agency-reel][dark-premium-UI]
Red/blue neon gradient "W" logo with bloom. Dark website mockups on tilted laptops/monitors with pink/blue rim lights; phones with yellow GENRES/ARTISTS type; token advisory site with 3D glass objects; spherical fisheye wall of thumbnails (globe distortion); gold metallic cards cascading diagonally (domino wave); orange/yellow poster phones. 1.7 s/shot.

#### 334 ElevenLabs Scribe (x 1894800942895091712) [dark-premium-UI][gradient-blob-orb][data-viz]
Black: three conic-gradient discs (iridescent pies) float then merge into one small orb; "Introducing ElevenLabs Scribe" words fade in left→right with blue→purple gradient, a ghost of previous word echoing. Orb grows into a large frosted glass disc. Benchmark bar chart: thin glowing bars grow with labels and % counting (85.1% vs 79.5% vs 48.2%), the winner bar has a light pulse running along. "Multilingual support 99 languages." where the word "languages" swaps through many scripts (Polish, Hindi…) — word cycling.

#### 335 "The Vault" heist doc title (raivcoo) [archival-montage][kinetic-type][grunge]
Dark: city map line-art in grey, condensed white "JULY 16TH, 1976" letters typed in with red highlight letters, red small location. Building facade with red neon-like "TWO MONTHS". Section cut of a tunnel "8 METERS BENEATH THE CITY" condensed caps with underline drawing. Stencil "THE VAULT" with red isometric floor plans stacking. Calendar with tricolour flag mark, red marker hand-writes "BRAQUAGE" and circles it. Gloved hand turning combination dials. True-crime explainer kit: map, plan, calendar, handwriting, red accent.

#### 339 Motion launch (x 2062193317421748225) [cursor-demo][whitespace-UI][meta]
"I'm Motion" / "and we're back" big black type blur-in on white. Mac desktop recording: notification "Client: Launch is in 5 mins! Where is the video?" (story via OS notifications), tweet UI, Messages, browser URL typing "motion.so". Dark prompt UI typing "Make a 30-second launch video for…" with option pills (Aspect 16:9, Duration 30s–1 min, DESIGN.md) — dropdowns opening by cursor. Small subtitles like "hmm let's see" (inner-voice captions). Meta: a motion-graphics AI tool, same category as our kit.

#### 345 Zaro AI [kinetic-type][whitespace-UI]
Dark brown-black with subtle dither noise: "Apps [icon] and [pill] agents" — tiny UI thumbnails embedded inline between words; "with one prompt." with "prompt" in lavender. Lavender blurred gradient "Meet|" typing huge; logo flower mark + "Zaro" wordmark types on off-white. Taupe "Build an app. With a sentence." two lines, second line lighter grey typing. Prompt pill with integration icons, cursor clicks send; app UI builds progressively (skeleton → content). 12 shots / 68 s.
