import { Link, Outlet } from "react-router-dom";
import {
  GraduationCapIcon,
  BookOpenIcon,
  BrainIcon,
  CodeIcon,
  ArrowRightIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import SectionGrid from "../../components/SectionGrid.jsx";

function TestLayout() {

  return (
    <section className="relative">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* PAGE HEADER */}
        <header className="mb-10">
          <h1
            className="
              text-3xl sm:text-4xl font-black
              bg-gradient-to-r from-primary via-secondary to-accent
              bg-clip-text text-transparent
            "
          >
            Tests
          </h1>
          <p className="text-base-content/60 mt-2 max-w-2xl">
            Timed tests to evaluate your knowledge and readiness.
          </p>
        </header>

        {/* PRACTICE DOMAIN CARDS (ONLY ON /practice) */}
        <SectionGrid />
        

        {/* CHILD ROUTES */}
        <Outlet />
      </div>
    </section>
  );
}



export default TestLayout;
