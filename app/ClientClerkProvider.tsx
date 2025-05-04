"use client";

import { ClerkProvider as OriginalClerkProvider} from "@clerk/nextjs";

export function ClientClerkProvider({ children }: { children: React.ReactNode }) {
    return <OriginalClerkProvider>{children}</OriginalClerkProvider>;
  }
