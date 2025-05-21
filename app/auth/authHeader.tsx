import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const AuthHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <SignInButton mode="redirect">
          <button
            type="button"
            className="rounded-lg bg-light-lilac px-4 py-2 text-sm hover:bg-common-cyan dark:bg-dark-lightBg"
          >
            Login
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default AuthHeader;
