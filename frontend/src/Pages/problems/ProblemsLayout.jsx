import { Link, Outlet, useLocation } from "react-router-dom";
import {
  CodeIcon,
  GraduationCapIcon,
  BookOpenIcon,
  BrainIcon,
  ArrowRightIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const PROBLEM_SECTIONS = [
  {
    title: "Coding Problems",
    description: "DSA, algorithms, and real coding challenges",
    icon: CodeIcon,
    path: "coding",
    gradient: "from-primary to-secondary",
  },
  {
    title: "School Problems",
    description: "Class-wise problems with step-by-step solutions",
    icon: GraduationCapIcon,
    path: "school",
    gradient: "from-secondary to-accent",
  },
  {
    title: "Exam Problems",
    description: "Previous year & exam-level questions",
    icon: BookOpenIcon,
    path: "exam",
    gradient: "from-primary to-accent",
  },
  {
    title: "Aptitude & Logic",
    description: "Quantitative & logical reasoning practice",
    icon: BrainIcon,
    path: "aptitude",
    gradient: "from-secondary to-primary",
  },
];

function ProblemsLayout() {
  const location = useLocation();
  const isRoot = location.pathname === "/problems";

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
            Problems
          </h1>
          <p className="text-base-content/60 mt-2 max-w-2xl">
            Practice problems tailored to your learning goals and preferences.
          </p>
        </header>

        {/* PROBLEM DOMAIN CARDS (ONLY ON /problems) */}
        {isRoot && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {PROBLEM_SECTIONS.map((section) => (
              <ProblemSectionCard key={section.title} {...section} />
            ))}
          </div>
        )}

        {/* CHILD ROUTES */}
        <Outlet />
      </div>
    </section>
  );
}

function ProblemSectionCard({
  title,
  description,
  icon: Icon,
  path,
  gradient,
}) {
  return (
    <Link
      to={path}
      className="
        group
        relative
        rounded-2xl
        bg-base-100/80 backdrop-blur-md
        border border-primary/20
        shadow-lg
        p-6
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
      "
    >
      {/* ICON */}
      <div
        className={`
          size-12 rounded-xl
          bg-gradient-to-r ${gradient}
          flex items-center justify-center
          text-white shadow-md
          mb-4
        `}
      >
        <Icon className="size-6" />
      </div>

      {/* CONTENT */}
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-base-content/60 mb-5">
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-2 text-primary font-medium text-sm">
        Start Practice
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default ProblemsLayout;
