import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
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
    <>
    <html lang="en">
      <body className={`${spaceGrotesk.className} m-0 max-w-custom mx-auto rounded-custom`}>
        <Link href="/"></Link>
        <Link href="/Converter"></Link>
        <Link href="/Portfolio"></Link>
        {children}
      </body>
    </html>
    </>
  );
}
