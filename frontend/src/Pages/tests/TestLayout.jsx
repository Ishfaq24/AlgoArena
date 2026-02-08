import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCapIcon,
  BookOpenIcon,
  BrainIcon,
  ArrowRightIcon,
  Target,
  Trophy,
  Sparkles,
  Cpu,
} from "lucide-react";
import Navbar from '../../components/Navbar.jsx';

/* ---------- DATA ---------- */

const TESTS_SECTIONS = [
  {
    title: "School Practice",
    description: "Subject-wise practice for Class 6–12",
    icon: BookOpenIcon,
    path: "school",
    gradient: "from-green-500/20 to-emerald-500/20",
    tags: ["Math", "Physics", "Chemistry"],
  },
  {
    title: "Competitive Exams",
    description: "JEE, NEET & high-stakes entrance practice",
    icon: BrainIcon,
    path: "competitive",
    gradient: "from-green-500/20 to-emerald-500/20",
    tags: ["JEE Mains", "NEET-UG", "GATE"],
  },
  {
    title: "University Level",
    description: "Advanced degree subjects & academic exercises",
    icon: GraduationCapIcon,
    path: "graduation",
    gradient: "from-green-500/20 to-emerald-500/20",
    tags: ["B.Sc", "B.Tech", "M.Tech"],
  },
  {
    title: "Engineering Streams",
    description: "Comprehensive practice for all engineering fields",
    icon: Cpu,
    path: "engineering",
    gradient: "from-green-500/20 to-emerald-500/20",
    tags: ["Mechanical", "Civil", "Electrical", "CSE", "ECE", "AI/ML"],
  },
  {
    title: "Career & Jobs",
    description: "UPSC, SSC, Banking & aptitude assessments",
    icon: Target,
    path: "jobs",
    gradient: "from-green-500/20 to-emerald-500/20",
    tags: ["Aptitude", "Reasoning", "English"],
  },
];

/* ---------- CARD ---------- */

const TestSectionCard = ({
  title,
  description,
  icon: Icon,
  path,
  tags,
}) => {
  return (
    <Link
      to={`/practice/${path}`}
      className="
        group relative flex flex-col rounded-[2.5rem]
        bg-base-200/30 backdrop-blur-2xl
        border border-primary/5 p-8
        transition-all duration-700
        hover:-translate-y-4 hover:bg-base-200/60
        hover:border-primary/40 overflow-hidden
      "
    >
      <div className="absolute -right-20 -top-20 size-40 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />

      <div className="relative mb-8">
        <div
          className="
            size-16 rounded-2xl bg-primary/10 border border-primary/20
            flex items-center justify-center text-primary shadow-inner
            transition-all duration-500
            group-hover:scale-110 group-hover:bg-primary
            group-hover:text-base-100 group-hover:rotate-[10deg]
          "
        >
          <Icon className="size-8" />
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-2xl font-display font-black mb-3 text-base-content group-hover:text-primary transition-all duration-500">
          {title}
        </h3>
        <p className="text-sm text-muted mb-6 font-medium leading-relaxed">
          {description}
        </p>

        {tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1 rounded-full text-[9px] font-black uppercase
                  tracking-widest bg-primary/5 border border-primary/10
                  text-primary/60 group-hover:border-primary/30
                  group-hover:text-primary transition-all duration-500
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-display font-black text-[10px] uppercase tracking-[0.2em]">
          Launch Test
          <ArrowRightIcon className="size-4 transition-transform duration-500 group-hover:translate-x-3" />
        </div>

        <Sparkles className="size-5 text-primary/0 group-hover:text-primary transition-all duration-700" />
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 group-hover:w-full opacity-50" />
    </Link>
  );
};

/* ---------- LAYOUT ---------- */

const TestsLayout = () => {
  return (
    <>
    <Navbar />
    <section className="relative min-h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 size-[500px] bg-primary/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute bottom-1/4 -right-20 size-[500px] bg-sec/5 blur-[120px] rounded-full opacity-30" />
      </div>

      <div className="relative mb-24 pt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-bounce">
          <Sparkles className="size-4 text-primary" />
          <span className="text-[10px] font-display font-black text-primary uppercase tracking-[0.25em]">
            Powered by AlgoArena V.1 Pro
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-[0.9]">
          Mastery is <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-sec to-primary animate-gradient-x">
            Engineered.
          </span>
        </h1>

        <p className="text-muted text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
          The ultimate polytechnic assessment platform. From Quantum Physics to Mechanical Vibrations, we curate your path to excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-24 px-2">
        {TESTS_SECTIONS.map((section) => (
          <TestSectionCard key={section.title} {...section} />
        ))}
      </div>

      <div className="relative mt-32 p-1 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-[4rem]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 py-1 rounded-[4rem]">
          {[ 
            { icon: BrainIcon, title: "Neuro-Adaptive", desc: "Gemini AI synthesizes questions that target your precise cognitive gaps across all engineering streams." },
            { icon: Trophy, title: "Global Ranking", desc: "Benchmark your performance against thousands of engineering students from Mechanical to CSE." },
            { icon: Sparkles, title: "Reasoning AI", desc: "Don't just see the answer—understand the physics and logic behind every engineering solution." }
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-base-100/60 backdrop-blur-3xl rounded-[3.8rem] flex flex-col items-center text-center p-12 transition-all duration-500 hover:bg-base-100/80 group"
            >
              <div className="bg-primary/10 p-6 rounded-[2rem] mb-8 border border-primary/20 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                <Icon className="size-12 text-primary group-hover:text-base-100 transition-colors" />
              </div>
              <h4 className="font-display font-black text-3xl mb-4 uppercase tracking-tighter">
                {title}
              </h4>
              <p className="text-sm text-muted font-medium leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 10s linear infinite;
        }
      `}</style>
    </section>
    </>
  );
};

export default TestsLayout;
