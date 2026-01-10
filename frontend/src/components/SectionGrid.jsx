import { Link } from "react-router-dom";
import {
  GraduationCapIcon,
  BookOpenIcon,
  BrainIcon,
  CodeIcon,
  ArrowRightIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";

const TESTS_SECTIONS = [
  {
    title: "School Practice",
    description: "Class 6–12 subject-wise practice questions",
    icon: BookOpenIcon,
    path: "school",
    gradient: "from-sec to-primary",
  },
  {
    title: "Competitive Practice",
    description: "JEE, NEET & exam-level practice sets",
    icon: BrainIcon,
    path: "competitive",
    gradient: "from-sec to-primary",
  },
  {
    title: "Graduation Practice",
    description: "University-level problems & exercises",
    icon: GraduationCapIcon,
    path: "graduation",
    gradient: "from-sec to-primary",
  },
  {
    title: "Engineering Practice",
    description: "DSA, Web, CS & coding practice",
    icon: CodeIcon,
    path: "engineering",
    gradient: "from-sec to-primary",
  },
  {
    title: "Job Oriented Practice",
    description: "UPSC, SSC, Banking & aptitude practice",
    icon: BrainIcon,
    path: "jobs",
    gradient: "from-sec to-primary",
  },
];

function TestLayout() {

  return (
    <section className="relative">

      
        {/* PAGE HEADER */}
        {/* PRACTICE DOMAIN CARDS (ONLY ON /practice) */}
        { (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-14">
            {TESTS_SECTIONS.map((section) => (
              <TestSectionCard key={section.title} {...section} />
            ))}
          </div>
        )}

        {/* CHILD ROUTES */}
    </section>
  );
}

function TestSectionCard({
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
        Start Practice
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default TestLayout;
