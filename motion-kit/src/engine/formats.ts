/**
 * Output formats. `safe` is the inset (px) where platform UI (captions, like
 * buttons, profile row) covers the video. Key content never goes there; only
 * backgrounds bleed into it.
 */
export const FORMAT_NAMES = ["reel", "portrait", "square", "landscape"] as const;
export type FormatName = (typeof FORMAT_NAMES)[number];

export type Format = {
  name: FormatName;
  label: string;
  width: number;
  height: number;
  safe: { top: number; bottom: number; left: number; right: number };
};

export const FORMATS: Record<FormatName, Format> = {
  // Instagram Reels / TikTok / YouTube Shorts overlays at 1080x1920:
  // top 14% (profile + "Reels" header), bottom ~30% (caption, audio row),
  // right column of like/comment/share buttons.
  reel: {
    name: "reel",
    label: "9:16 — Reels, Shorts, TikTok, Stories",
    width: 1080,
    height: 1920,
    safe: { top: 260, bottom: 580, left: 96, right: 150 },
  },
  portrait: {
    name: "portrait",
    label: "4:5 — Instagram / LinkedIn feed",
    width: 1080,
    height: 1350,
    // Instagram's 3:4 profile-grid crop keeps x 34-1046; stay well inside.
    safe: { top: 110, bottom: 130, left: 96, right: 96 },
  },
  square: {
    name: "square",
    label: "1:1 — feed posts, ads",
    width: 1080,
    height: 1080,
    // 1:1 posts get cropped to 3:4 on the profile grid (x 135-945).
    safe: { top: 90, bottom: 100, left: 135, right: 135 },
  },
  landscape: {
    name: "landscape",
    label: "16:9 — YouTube, presentations, websites",
    width: 1920,
    height: 1080,
    safe: { top: 100, bottom: 110, left: 160, right: 160 },
  },
};

export const FPS = 30;

/** Content box inside the safe zone. */
export const contentBox = (f: Format) => ({
  left: f.safe.left,
  top: f.safe.top,
  width: f.width - f.safe.left - f.safe.right,
  height: f.height - f.safe.top - f.safe.bottom,
});

/**
 * Readable type on a phone, in canvas px. Below `min` text is too small to
 * read (a QA error); below `comfortable` it strains (a QA warning). Landscape
 * video plays at roughly half the size of a vertical one on a phone, so it
 * needs bigger type.
 */
export const textFloor = (f: Format) => (f.width > f.height ? { min: 40, comfortable: 48 } : { min: 30, comfortable: 36 });

/** Typography scale unit: 1 at 1080px on the short side. */
export const unit = (f: Format) => Math.min(f.width, f.height) / 1080;
