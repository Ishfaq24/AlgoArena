import { Navigate, Route, Routes } from "react-router-dom";
import ProblemsPage from "./Pages/problems/coding/ProblemsPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ProblemPage from "./Pages/problems/coding/ProblemPage.jsx";
import ProblemLayout from "./Pages/problems/ProblemsLayout.jsx";
import SessionPage from "./Pages/SessionPage.jsx";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./Pages/DashboardPage.jsx";
import SchoolProblems from "./Pages/problems/school/SchoolProblems.jsx";
import AITutor from "./Pages/ai/AITutorPage.jsx";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();
  if(!isLoaded) {
    return null;}
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
      {/* //AI */}
      <Route path="/ai" element={isSignedIn ? <AITutor /> : <Navigate to={"/"} />} />
      
      <Route path="/dashboard" element={isSignedIn ? <DashboardPage />: <Navigate to={"/"} />}/>

      <Route path="/problems" element={isSignedIn ? <ProblemLayout /> : <Navigate to={"/"} />} />

      <Route path="/problems/coding" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
      <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
      <Route path="/problems/school" element={isSignedIn ? <SchoolProblems/> : <Navigate to={"/"} />} />
       <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster toastOptions={{ duration: 3000}} />
    </>
  );
};

export default App;