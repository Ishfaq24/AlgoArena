import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  BrainIcon,
  GraduationCapIcon,
  BotIcon,
  CodeIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItem = (to, label, Icon) => (
    <Link
      key={to}
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
        <span className="font-medium">{label}</span>
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
          <div className="size-10 rounded-xl bg-gradient-to-r from-sec to-primary to-accent flex items-center justify-center shadow-lg">
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

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navItem("/learn", "Learn", GraduationCapIcon)}
          {navItem("/practice", "Practice", BrainIcon)}
          {navItem("/problems", "Problems", CodeIcon)}
          {navItem("/tests", "Tests", BookOpenIcon)}
          {navItem("/ai", "AI Tutor", BotIcon)}
          {navItem("/dashboard", "Dashboard", LayoutDashboardIcon)}

          <div className="ml-4 mt-1">
            <UserButton />
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-base-200 transition"
        >
          {open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-primary/20 bg-base-100/95 backdrop-blur-md ">
          <div className="flex flex-col gap-1 p-4">
            {navItem("/learn", "Learn", GraduationCapIcon)}
            {navItem("/practice", "Practice", BrainIcon)}
            {navItem("/problems", "Problems", CodeIcon)}
            {navItem("/tests", "Tests", BookOpenIcon)}
            {navItem("/ai", "AI Tutor", BotIcon)}
            {navItem("/dashboard", "Dashboard", LayoutDashboardIcon)}

            <div className="mt-4">
              <UserButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
