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
  logo: "custom/cred-v2/cred-logo.png",
  claim1: { head: "5% rewards", sub: "on online shopping" },
  card: { head: "the CRED IndusInd Bank", sub: "RuPay credit card" },
  strip: ["ZERO JOINING FEE", "5% REWARDS ON ONLINE SHOPPING"],
  claim2: { head: "redeem on flights, hotels" },
  claim3: { head: "2,000+ products", sub: "on CRED store" },
  hero: { label: "JOINING FEE", value: "₹0" },
  cardPrint: "5% REWARDS ON ONLINE SHOPPING  ·  ZERO JOINING FEE",
  outro: {
    screen: "your card",
    title: "CRED IndusInd Bank RuPay credit card",
    rows: ["5% rewards on online shopping", "zero joining fee", "redeem on flights, hotels and 2,000+ products on CRED store"],
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
