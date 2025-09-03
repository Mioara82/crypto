import type { Metadata } from "next";
import type { Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";
import ThemeProvider from "./providers/ThemeProvider";
import StoreProvider from "./providers/StoreProvider";
import GlobalNavbar from "./components/blocks-components/GlobalNavbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "CryptoLens",
  description:
    "CryptoLensStay Ahead of the Market.Your all-in-one crypto tracker for real-time prices, charts, and portfolio management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} ${inter.className} flex flex-col rounded-[20px] bg-light-primaryBg dark:bg-dark-primaryBg`}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider>
              <StoreProvider>
                <GlobalNavbar />
                {children}
              </StoreProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
