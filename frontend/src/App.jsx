import { Navigate, Route, Routes } from "react-router";
import ProblemsPage from "./Pages/ProblemsPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
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
      <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to=
      {"/dashboard"}/> } />
      <Route path="/dashboard" element={!isSignedIn ? <DashboardPage /> : <Navigate to={"/"}/> } />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster toastOptions={{ duration: 3000}} />
    </>
  );
};

export default App;
