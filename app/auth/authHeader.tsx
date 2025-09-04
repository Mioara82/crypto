import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

const AuthHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <Unauthenticated>
        <SignInButton mode="redirect">
          <button
            className="rounded-2xl bg-light-lilac px-4 py-2 text-sm hover:bg-common-cyan dark:bg-dark-lightBg"
          >
            Login
          </button>
        </SignInButton>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </div>
  );
};

export default AuthHeader;
