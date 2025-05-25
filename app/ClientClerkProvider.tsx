"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";

export function ClientClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OriginalClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </OriginalClerkProvider>
  );
}
