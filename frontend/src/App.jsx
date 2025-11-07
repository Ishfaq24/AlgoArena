import { Navigate, Route, Routes } from "react-router";
import ProblemsPage from "./Pages/ProblemsPage";
import HomePage from "./Pages/HomePage";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isSignedIn } = useUser();

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster />
    </>
  );
};

export default App;
