import type { Metadata } from "next";
import type { Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import ThemeProvider from "./providers/ThemeProvider";
import StoreProvider from "./providers/StoreProvider";
import GlobalNavbar from "./components/blocks-components/GlobalNavbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const viewport:Viewport = {
  colorScheme:"dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
      <body
        className={`${spaceGrotesk.className} rounded-[20px] bg-light-primary dark:bg-dark-primaryBg`}
      >
        <ThemeProvider>
          <StoreProvider>
            <GlobalNavbar />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
