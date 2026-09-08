import localFont from "next/font/local";

export const sohneSans = localFont({
  src: [
    {
      path: "../public/fonts/sohne/TestSohne-Buch-BF663d89cd32e6a.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sohne/TestSohne-BuchKursiv-BF663d89cd3e887.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/sohne/TestSohne-Kraftig-BF663d89cd37e26.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sohne/TestSohne-Halbfett-BF663d89cd2d67b.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/sohne/TestSohne-Dreiviertelfett-BF663d89ccc5f66.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/sohne/TestSohne-Extrafett-BF663d89cc9f2c0.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
  display: "swap",
});

export const sohneMono = localFont({
  src: [
    {
      path: "../public/fonts/sohne/TestSohneMono-Buch-BF663d89cbcec64.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sohne/TestSohneMono-Halbfett-BF663d89cc69f9d.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/sohne/TestSohneMono-Dreiviertelfett-BF663d89cc62070.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sohne-mono",
  display: "swap",
});

export const sohneBreit = localFont({
  src: [
    {
      path: "../public/fonts/sohne/TestSohneBreit-Dreiviertelfett-BF663d89c955618.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sohne-breit",
  display: "swap",
});
