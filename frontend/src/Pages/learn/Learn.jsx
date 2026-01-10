import { Link, Outlet, useLocation } from "react-router-dom";
import {
  GraduationCapIcon,
  BookOpenIcon,
  BrainIcon,
  CodeIcon,
  ArrowRightIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar";

const LEARN_SECTIONS = [
  {
    title: "School Learning",
    description: "Class 6–12 structured learning by subjects",
    icon: BookOpenIcon,
    path: "school",
    gradient: "from-sec to-primary",
  },
  {
    title: "Competitive Exams",
    description: "JEE, NEET & exam-focused preparation",
    icon: BrainIcon,
    path: "competitive",
    gradient: "from-sec to-primary",
  },
  {
    title: "Graduation",
    description: "University-level courses & concepts",
    icon: GraduationCapIcon,
    path: "graduation",
    gradient: "from-sec to-primary",
  },
  {
    title: "Engineering ",
    description: "Engineering topics & practical applications",
    icon: CodeIcon,
    path: "engineering",
    gradient: "from-sec to-primary",
  },
  {
    title: "Job Oriented ",
    description: "UPSC, SSC, Banking & other job prep",
    icon: BrainIcon,
    gradient: "from-sec to-primary",
  }
];

function Learn() {
  const location = useLocation();
  const isRoot = location.pathname === "/learn";

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
            Learn
          </h1>
          <p className="text-base-content/60 mt-2 max-w-2xl">
            Choose a learning path designed for your level and goals.
          </p>
        </header>

        {/* LEARN DOMAIN CARDS (ONLY ON /learn) */}
        {isRoot && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {LEARN_SECTIONS.map((section) => (
              <LearnSectionCard key={section.title} {...section} />
            ))}
          </div>
        )}

        {/* CHILD ROUTES */}
        <Outlet />
      </div>
    </section>
  );
}

function LearnSectionCard({
  title,
  description,
  // eslint-disable-next-line no-unused-vars
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
        Start Learning
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default Learn;
