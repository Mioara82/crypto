import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import ThemeProvider from "./providers/ThemeProvider";
import StoreProvider from "./providers/StoreProvider";
import GlobalNavbar from "./components/blocks-components/GlobalNavbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto App",
  description:
    "cryptocurrency exchange to securely buy, sell, trade, store, and stake crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} rounded-[20px]`}>
        <ThemeProvider>
          <StoreProvider>
            <GlobalNavbar />
            <Link href="/"></Link>
            <Link href="/Converter"></Link>
            <Link href="/Portfolio"></Link>
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
