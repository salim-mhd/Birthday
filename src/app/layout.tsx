import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Happy 21st Birthday Sayana ✨ | With All My Love, Salim",
  description: "A magical 21st birthday surprise dedicated to Sayana. Filled with love, sweet memories, funny quirks, care, and surprises.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancing.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-romance-50 text-gray-800 selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}

