import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const AuthHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className="rounded-lg bg-light-lilac px-4 py-2 text-sm hover:bg-common-cyan dark:bg-dark-lightBg"
          >
            Login
          </button>
        </SignInButton>
        <SignUpButton>
          <button type="button" className="rounded-lg bg-light-lilac px-4 py-2 text-sm hover:bg-common-linearGradient dark:bg-dark-lightBg">Sign Up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default AuthHeader;
