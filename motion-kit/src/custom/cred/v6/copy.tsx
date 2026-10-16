import React, { createContext, useContext } from "react";

/**
 * Every word, number and logo in the CRED v6 film, as data. The film's look, timing, worlds and transitions stay
 * exactly as built; a new script only fills these slots (skills/cred-film, tools/cred_film.py validates lengths).
 * Defaults are the CRED IndusInd Bank RuPay card film (unofficial spec work).
 */
export type FilmCopy = {
  /** official logo file, white on transparent, under public/ (never redrawn) */
  logo: string;
  /** world 1, the garden: the first claim */
  claim1: { head: string; sub?: string };
  /** the card reveal: product name over the card */
  card: { head: string; sub?: string };
  /** the foil strip on the card, uppercase; [0] lands whole in the close-up, so keep it <= 18 characters */
  strip: [string, string];
  /** world 2, travel and globe */
  claim2: { head: string; sub?: string };
  /** world 3, the colonnade of products */
  claim3: { head: string; sub?: string };
  /** world 4, the shell: a small label and a big value that rises like a pearl (e.g. "JOINING FEE", "₹0") */
  hero: { label: string; value: string };
  /** outro: tiny print on the card face, the phone screen, the words either side of the phone */
  cardPrint: string;
  outro: { screen: string; title: string; rows: string[]; left: string; right: string };
  /** lockup line under the logo */
  lockup: string;
};

export const CRED_COPY: FilmCopy = {
  // v7: every claim is on the IndusInd Bank product page or cred.club/card (checked 16 Oct 2026). "Zero joining fee"
  // and "2,000+ products" were dropped: neither appears on an official page.
  logo: "custom/cred-v2/cred-logo.png",
  claim1: { head: "5% back", sub: "as CRED reward points on e-commerce*" },
  card: { head: "the CRED IndusInd Bank", sub: "RuPay credit card" },
  strip: ["UPI ENABLED", "5% BACK AS CRED REWARD POINTS"],
  claim2: { head: "redeem on flights, hotels" },
  claim3: { head: "500+ CRED merchants", sub: "redeem your points" },
  hero: { label: "1 POINT =", value: "₹1" },
  cardPrint: "5% BACK AS CRED REWARD POINTS  ·  RUPAY ON UPI",
  outro: {
    screen: "your card",
    title: "CRED IndusInd Bank RuPay credit card",
    rows: ["5% back as CRED reward points on e-commerce*", "redeem on flights, hotels and 500+ CRED merchants", "1 point = ₹1 · credit card enabled on UPI"],
    left: "the CRED IndusInd Bank",
    right: "RuPay credit card.",
  },
  lockup: "IndusInd Bank RuPay credit card",
};

const Ctx = createContext<FilmCopy>(CRED_COPY);
export const CopyProvider: React.FC<{ copy?: FilmCopy; children: React.ReactNode }> = ({ copy, children }) => <Ctx.Provider value={copy ?? CRED_COPY}>{children}</Ctx.Provider>;
export const useCopy = () => useContext(Ctx);

/** Shrink a font so a single line of `text` stays within `maxW` px (rough width model for the film's faces). */
export const fit = (text: string, size: number, maxW: number, perChar = 0.52) => Math.min(size, maxW / Math.max(1, text.length * perChar));
