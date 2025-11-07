import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
        <button className="btn btn-secondary" onClick={() => toast.success("This is a success toast")}>Click Me</button>
      <SignedOut>
        <SignInButton mode="modal">
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

export default HomePage;
