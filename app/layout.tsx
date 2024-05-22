import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import ThemeProvider from "./providers/ThemeProvider";
import GlobalNavbar from "./components/GlobalNavbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto App",
  description: "cryptocurrency exchange to securely buy, sell, trade, store, and stake crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} rounded-[20px]`}>
        <ThemeProvider>
          <GlobalNavbar />
          <Link href="/">Home</Link>
          <Link href="/Converter">Converter</Link>
          <Link href="/Portfolio">Portfolio</Link>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
