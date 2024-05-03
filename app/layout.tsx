import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Providers from "./providers/ThemeProvider";
import Navbar from "./components/Navbar";
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
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <Providers>
          <Navbar />
          <Link href="/">Home</Link>
          <Link href="/Converter">Converter</Link>
          <Link href="/Portfolio">Portfolio</Link>
          {children}
        </Providers>
      </body>
    </html>
  );
}
