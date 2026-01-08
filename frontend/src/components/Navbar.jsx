import { Link, useLocation } from "react-router-dom";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  BrainIcon,
  GraduationCapIcon,
  BotIcon,
  CodeIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const navItem = (to, label, Icon) => (
    <Link
      to={to}
      className={`px-4 py-2.5 rounded-lg transition-all duration-200
        ${
          isActive(to)
            ? "bg-primary text-primary-content"
            : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
        }`}
    >
      <div className="flex items-center gap-x-2.5">
        <Icon className="size-4" />
        <span className="font-medium hidden lg:inline">
          {label}
        </span>
      </div>
    </Link>
  );

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              AlgoArena
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">
              Learn • Practice • Grow
            </span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-1">

          {navItem("/learn", "Learn", GraduationCapIcon)}

          {navItem("/practice", "Practice", BrainIcon)}

          {navItem("/problems", "Problems", CodeIcon)}

          {navItem("/tests", "Tests", BookOpenIcon)}

          {navItem("/ai", "AI Tutor", BotIcon)}

          {navItem("/dashboard", "Dashboard", LayoutDashboardIcon)}

          {/* USER */}
          <div className="ml-4 mt-1">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
