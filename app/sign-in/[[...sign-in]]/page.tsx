"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import NotificationCard from "@/app/components/UI-components/NotificationCard";
import { authStyles } from "@/app/auth/authStyles";

export default function LoginPage() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const incorrectPassword = error === "incorrect_password";

  useEffect(() => {
    if (isLoaded && user) {
      return router.push("/");
    }
  }, [isLoaded, user, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-light-primaryBg dark:bg-dark-primaryBg">
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-secondaryBg">
      {incorrectPassword && <NotificationCard text="Incorrect password" />}
      <SignIn
        appearance={{
          elements: authStyles,
        }}
        forceRedirectUrl={
          process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
        }
      />
    </div>
  </div>
  );
}