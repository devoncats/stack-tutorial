import {
  Funnel_Display as FontDisplay,
  Cousine as FontMono,
  Funnel_Sans as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});
