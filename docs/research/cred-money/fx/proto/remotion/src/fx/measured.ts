// AUTO-GENERATED from measurements of the reference film (fx/src/*.py). Numbers, not pixels.
// Each LUT: 16 sRGB stops, darkest -> lightest, = median colour of all scene pixels in 16 equal L* bins (p1..p99).
export type Lut = { name: string; stops: string[]; maxDevFrom2Stop_dE: number; medianResid_dE: number };
export const SCENE_LUTS: Record<string, Lut> = {
  "intro_grey_paper": { name: "intro_grey_paper", stops: ["#5f5f5f", "#7b7b7b", "#838383", "#8a8a8a", "#929292", "#9a9a9a", "#a3a3a3", "#ababab", "#b4b4b4", "#bdbdbd", "#c3c3c3", "#cbcbcb", "#d3d3d3", "#dadada", "#e7e7e7", "#ebebeb"], maxDevFrom2Stop_dE: 0.0, medianResid_dE: 0.7 },
  "hummingbird_green_purple": { name: "hummingbird_green_purple", stops: ["#5e4090", "#67567e", "#606b3d", "#697446", "#757d55", "#8e7c9c", "#938a89", "#a48dbf", "#ad97c8", "#b8a1d4", "#c1abda", "#bac29c", "#c0cf9e", "#d4d8af", "#dfded1", "#e7e7e7"], maxDevFrom2Stop_dE: 52.3, medianResid_dE: 10.0 },
  "banknote_tilted_lens": { name: "banknote_tilted_lens", stops: ["#0c1816", "#102420", "#1a312a", "#1e4034", "#294b44", "#235e46", "#286d51", "#317e5d", "#2c9366", "#3ca170", "#4db07b", "#5ac18a", "#68cf95", "#8ddd9e", "#b9e4ce", "#e6eceb"], maxDevFrom2Stop_dE: 44.9, medianResid_dE: 4.8 },
  "lens_green_closeup": { name: "lens_green_closeup", stops: ["#63985a", "#6aa063", "#6da76c", "#60b074", "#61b77b", "#5fbf84", "#5ac78b", "#63cd91", "#6ed495", "#78da99", "#89df9e", "#ace0a5", "#b9e5ac", "#c1ecb2", "#c3f4b9", "#cffcc6"], maxDevFrom2Stop_dE: 17.7, medianResid_dE: 5.7 },
  "lens_peach": { name: "lens_peach", stops: ["#97634d", "#a27854", "#a67f5a", "#b18564", "#b98d6b", "#bf9572", "#c69d79", "#cea580", "#d2ad89", "#ddb48b", "#e5bc8d", "#eac590", "#f0cb97", "#f4d3a4", "#f9dcac", "#fbe6b9"], maxDevFrom2Stop_dE: 8.0, medianResid_dE: 4.2 },
  "columns_terracotta": { name: "columns_terracotta", stops: ["#84353a", "#8f3f45", "#97474c", "#9f5154", "#a55b5b", "#aa675f", "#b07163", "#b87c69", "#be866d", "#c68f6f", "#ce9977", "#d5a384", "#d7ae99", "#d4bca2", "#dbc4aa", "#e3cdb3"], maxDevFrom2Stop_dE: 10.4, medianResid_dE: 7.6 },
  "turtle_lavender": { name: "turtle_lavender", stops: ["#41366c", "#4e4475", "#554d7d", "#5f5886", "#67618f", "#726a9a", "#7b73af", "#847db3", "#8d89b8", "#9794b9", "#a39dbe", "#afacca", "#b5b3cc", "#c4bcd8", "#cfc7e3", "#dcd5f0"], maxDevFrom2Stop_dE: 8.2, medianResid_dE: 2.6 },
  "lighthouse_mint": { name: "lighthouse_mint", stops: ["#3e5a34", "#506c46", "#5a7451", "#607c59", "#62856e", "#6a8d74", "#779578", "#7f9f79", "#88a87e", "#90b186", "#9abb8f", "#a1c498", "#a9ce9a", "#b1d7a2", "#bce2aa", "#c6e8b3"], maxDevFrom2Stop_dE: 11.4, medianResid_dE: 4.1 },
  "seabed_grey": { name: "seabed_grey", stops: ["#111615", "#1f2524", "#2a302f", "#353c3b", "#424847", "#4e5453", "#5b6261", "#67706e", "#747e7c", "#828b8a", "#919a98", "#9fa8a6", "#adb7b5", "#bcc5c0", "#ced8d1", "#dce6dd"], maxDevFrom2Stop_dE: 2.7, medianResid_dE: 2.6 },
  "lens_grey_shell": { name: "lens_grey_shell", stops: ["#1f2125", "#2b2d34", "#33373a", "#3e4244", "#474b4e", "#505658", "#5b6062", "#656c6d", "#707678", "#7b8281", "#868d8c", "#929998", "#9da5a3", "#a9b0ac", "#b5bdb9", "#c0c9c4"], maxDevFrom2Stop_dE: 1.9, medianResid_dE: 2.3 },
  "lens_green_rock": { name: "lens_green_rock", stops: ["#122314", "#1e331f", "#293f28", "#324b2e", "#40573b", "#4c6347", "#597053", "#667d5f", "#738a6c", "#819878", "#90a585", "#9fb391", "#b1c19c", "#becfa9", "#ccdeb6", "#d8ebc2"], maxDevFrom2Stop_dE: 6.2, medianResid_dE: 3.6 },
  "money_seal_lens": { name: "money_seal_lens", stops: ["#1e532e", "#1d5f37", "#376841", "#48724c", "#547d56", "#628760", "#6d926a", "#7b9d76", "#87a882", "#95b48d", "#a7bf9b", "#b7c9a6", "#c6d5b2", "#e5d9c1", "#ece4cc", "#f7f3db"], maxDevFrom2Stop_dE: 6.2, medianResid_dE: 3.5 },
  "bill_on_black": { name: "bill_on_black", stops: ["#020202", "#161616", "#212121", "#29321a", "#16461f", "#1f5029", "#346036", "#3e6e3f", "#4b7c4a", "#5e8954", "#6f9660", "#81a370", "#95b17d", "#a8be97", "#c3caad", "#e3d6c2"], maxDevFrom2Stop_dE: 32.2, medianResid_dE: 4.4 },
  "phone_grey": { name: "phone_grey", stops: ["#0a0a0a", "#1a1a1a", "#282828", "#353535", "#434343", "#525252", "#616161", "#6f6f6f", "#808080", "#8f8f8f", "#a0a0a0", "#b0b0b0", "#c1c1c1", "#d2d2d2", "#e3e3e3", "#ffffff"], maxDevFrom2Stop_dE: 0.0, medianResid_dE: 1.4 },
};
// Ink clusters (k-means on a*b*) per scene: share of pixels, shadow / mid / highlight colour.
export const SCENE_INKS = {
 "intro_grey_paper": [],
 "hummingbird_green_purple": [
  {
   "share": 0.51,
   "hue_ab_deg": 118.8,
   "shadow": "#5a6b34",
   "mid": "#c4d0a2",
   "highlight": "#dbddb6",
   "L_range": [
    41.5,
    80.1,
    90.0
   ]
  },
  {
   "share": 0.29,
   "hue_ab_deg": 311.6,
   "shadow": "#5f4095",
   "mid": "#b288d6",
   "highlight": "#d7b3f4",
   "L_range": [
    33.7,
    62.9,
    80.4
   ]
  }
 ],
 "banknote_tilted_lens": [
  {
   "share": 0.521,
   "hue_ab_deg": 153.0,
   "shadow": "#3ba06f",
   "mid": "#67cf94",
   "highlight": "#9ce5a2",
   "L_range": [
    57.9,
    75.9,
    87.0
   ]
  },
  {
   "share": 0.166,
   "hue_ab_deg": 172.3,
   "shadow": "#162b24",
   "mid": "#294b44",
   "highlight": "#cef1e1",
   "L_range": [
    12.9,
    29.3,
    93.2
   ]
  }
 ],
 "lens_green_closeup": [
  {
   "share": 0.343,
   "hue_ab_deg": 137.0,
   "shadow": "#689b5c",
   "mid": "#a3d096",
   "highlight": "#c8f8bd",
   "L_range": [
    57.9,
    78.8,
    94.4
   ]
  },
  {
   "share": 0.552,
   "hue_ab_deg": 154.5,
   "shadow": "#4bae74",
   "mid": "#61d092",
   "highlight": "#82e39f",
   "L_range": [
    62.6,
    75.8,
    85.2
   ]
  },
  {
   "share": 0.067,
   "hue_ab_deg": 274.4,
   "shadow": "#8995c1",
   "mid": "#a2bacc",
   "highlight": "#f0dacf",
   "L_range": [
    60.4,
    75.0,
    90.6
   ]
  }
 ],
 "lens_peach": [
  {
   "share": 0.956,
   "hue_ab_deg": 79.0,
   "shadow": "#bf916e",
   "mid": "#eeca95",
   "highlight": "#fae0b2",
   "L_range": [
    63.5,
    83.1,
    92.0
   ]
  }
 ],
 "columns_terracotta": [
  {
   "share": 0.376,
   "hue_ab_deg": 75.7,
   "shadow": "#a48583",
   "mid": "#d7c1a7",
   "highlight": "#dcc6ac",
   "L_range": [
    57.7,
    78.7,
    83.8
   ]
  },
  {
   "share": 0.232,
   "hue_ab_deg": 22.4,
   "shadow": "#86343b",
   "mid": "#aa5a5f",
   "highlight": "#eaa8a1",
   "L_range": [
    31.9,
    48.1,
    77.1
   ]
  },
  {
   "share": 0.34,
   "hue_ab_deg": 61.1,
   "shadow": "#96593f",
   "mid": "#d8a27a",
   "highlight": "#f5c096",
   "L_range": [
    43.6,
    70.4,
    83.3
   ]
  }
 ],
 "turtle_lavender": [
  {
   "share": 0.167,
   "hue_ab_deg": 299.7,
   "shadow": "#40346d",
   "mid": "#7a6fb2",
   "highlight": "#a69dd1",
   "L_range": [
    24.2,
    50.0,
    67.6
   ]
  },
  {
   "share": 0.791,
   "hue_ab_deg": 295.6,
   "shadow": "#6c668a",
   "mid": "#b5b2cc",
   "highlight": "#d9d1ed",
   "L_range": [
    44.6,
    73.3,
    85.5
   ]
  }
 ],
 "lighthouse_mint": [
  {
   "share": 0.886,
   "hue_ab_deg": 133.6,
   "shadow": "#5b7652",
   "mid": "#c2e4af",
   "highlight": "#c5e7b2",
   "L_range": [
    46.3,
    85.2,
    89.3
   ]
  },
  {
   "share": 0.106,
   "hue_ab_deg": 148.7,
   "shadow": "#4ea573",
   "mid": "#83d992",
   "highlight": "#8ee9a8",
   "L_range": [
    59.8,
    79.2,
    87.9
   ]
  }
 ],
 "seabed_grey": [],
 "lens_grey_shell": [
  {
   "share": 0.076,
   "hue_ab_deg": 273.5,
   "shadow": "#1f2539",
   "mid": "#4f5f70",
   "highlight": "#babfd6",
   "L_range": [
    14.1,
    39.7,
    78.1
   ]
  }
 ],
 "lens_green_rock": [
  {
   "share": 0.646,
   "hue_ab_deg": 129.9,
   "shadow": "#2a4926",
   "mid": "#bfd2aa",
   "highlight": "#d6ebc2",
   "L_range": [
    26.4,
    81.7,
    92.6
   ]
  },
  {
   "share": 0.321,
   "hue_ab_deg": 133.3,
   "shadow": "#162b19",
   "mid": "#91a488",
   "highlight": "#d8e6c5",
   "L_range": [
    14.7,
    65.2,
    91.0
   ]
  }
 ],
 "money_seal_lens": [
  {
   "share": 0.609,
   "hue_ab_deg": 90.5,
   "shadow": "#cfc6af",
   "mid": "#e8dbc4",
   "highlight": "#f5f1d9",
   "L_range": [
    77.5,
    87.9,
    96.3
   ]
  },
  {
   "share": 0.358,
   "hue_ab_deg": 129.2,
   "shadow": "#1b5730",
   "mid": "#c9daa2",
   "highlight": "#d3e3b4",
   "L_range": [
    30.7,
    83.3,
    90.2
   ]
  }
 ],
 "bill_on_black": [
  {
   "share": 0.369,
   "hue_ab_deg": 133.5,
   "shadow": "#316335",
   "mid": "#79a068",
   "highlight": "#bed797",
   "L_range": [
    36.4,
    62.0,
    83.3
   ]
  },
  {
   "share": 0.172,
   "hue_ab_deg": 96.5,
   "shadow": "#546951",
   "mid": "#cbbfa9",
   "highlight": "#e5d7c3",
   "L_range": [
    41.2,
    77.5,
    88.4
   ]
  }
 ],
 "phone_grey": []
} as const;
// Foil colours per 30-degree hue bin: share of foil pixels (sat>0.3) and the peak (top-quartile saturation) colour.
export const FOIL_PALETTES = {
 "shell": [
  {
   "hue": "0-30",
   "share": 0.066,
   "peak": "#7c5d45"
  },
  {
   "hue": "30-60",
   "share": 0.096,
   "peak": "#826b4a"
  },
  {
   "hue": "150-180",
   "share": 0.056,
   "peak": "#2e5855"
  },
  {
   "hue": "180-210",
   "share": 0.281,
   "peak": "#295164"
  },
  {
   "hue": "210-240",
   "share": 0.4,
   "peak": "#2e416f"
  },
  {
   "hue": "240-270",
   "share": 0.085,
   "peak": "#39366a"
  }
 ],
 "turtle": [
  {
   "hue": "180-210",
   "share": 0.117,
   "peak": "#4e92be"
  },
  {
   "hue": "210-240",
   "share": 0.64,
   "peak": "#4c63c1"
  },
  {
   "hue": "240-270",
   "share": 0.238,
   "peak": "#403877"
  }
 ],
 "cards": [
  {
   "hue": "0-30",
   "share": 0.475,
   "peak": "#dc6f3e"
  },
  {
   "hue": "30-60",
   "share": 0.114,
   "peak": "#cf9436"
  },
  {
   "hue": "150-180",
   "share": 0.028,
   "peak": "#2bb288"
  },
  {
   "hue": "180-210",
   "share": 0.108,
   "peak": "#428dc8"
  },
  {
   "hue": "210-240",
   "share": 0.105,
   "peak": "#4883c9"
  },
  {
   "hue": "270-300",
   "share": 0.045,
   "peak": "#8c3ba5"
  },
  {
   "hue": "300-330",
   "share": 0.047,
   "peak": "#a2438d"
  },
  {
   "hue": "330-360",
   "share": 0.079,
   "peak": "#b96175"
  }
 ]
} as const;
// Holographic band: repeating pastel ramp measured on the zoomed band (t=18 s), pos 0..1 across one visible cycle.
export const BAND_STOPS = [{"pos": 0.0, "color": "#878b91"}, {"pos": 0.07, "color": "#c1bfc0"}, {"pos": 0.14, "color": "#c9c4c2"}, {"pos": 0.21, "color": "#d4c8c6"}, {"pos": 0.29, "color": "#f1caca"}, {"pos": 0.36, "color": "#fbd8b9"}, {"pos": 0.43, "color": "#fcd8a3"}, {"pos": 0.5, "color": "#fadba3"}, {"pos": 0.57, "color": "#ebdbaf"}, {"pos": 0.64, "color": "#c7e5d2"}, {"pos": 0.71, "color": "#a3c8e4"}, {"pos": 0.79, "color": "#8daad3"}, {"pos": 0.86, "color": "#89a0c8"}, {"pos": 0.93, "color": "#889bbc"}, {"pos": 1.0, "color": "#6f7a8f"}] as const;
