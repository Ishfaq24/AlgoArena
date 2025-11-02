import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";

const App = () => {
  return (
    <div>
      <h1>Welcome to the app</h1>

      <SignedOut>
        <SignInButton mode="modal" >
          <button>Sign In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </div>
  );
};

export default App;
