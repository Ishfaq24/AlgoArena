import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  Check,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignIn, SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Navbar  */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                AlgoArena
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">
                Code Together
              </span>
            </div>
          </Link>
          {/* AUTH BTN */}
          <SignInButton mode="modal">
            <button
              className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold  shadow-lg hover:shadow-xl transition-all duration-200
            hover:scale-105 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-4" />
              Fast. Collaborative. Fun.
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="">Learn Together</span>
            </h1>
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              Join AlgoArena to practice coding interviews in a collaborative
              environment. Enhance your skills, get real-time feedback, and ace
              your next interview!
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <Check className="size-4 text-success" />
                Real-time Collaboration
              </div>
              <div className="badge badge-lg badge-outline">
                <Check className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <Check className="size-4 text-success" />
                Interview Practice
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>
            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100/70 flex hover:scale-105 transition-transform duration-200">
              <div className="stat">
                <div className="stat-value text-primary">1K+</div>
                <div className="stat-desc">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">500+</div>
                <div className="stat-desc">Coding Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">95%</div>
                <div className="stat-desc">User Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <img
            src="/public/hero.png"
            alt="Coding Together"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 transition-transform duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105"
          />
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to
            <span className="text-primary font-mono"> Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to enhance your coding interview
            practice.
          </p>
        </div>
        {/* features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-lg hover:transform hover:scale-105 transition-transform">
            <div className="card-body items-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70 justify-around text-center">
                Crystal Clear video and audio for seamless communication during
                interviews
              </p>
            </div>
          </div>
           <div className="card bg-base-100 shadow-lg hover:transform hover:scale-105 transition-transform">
            <div className="card-body items-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70 justify-around text-center">
                Invite peers or mentors to join your coding sessions with ease
              </p>
            </div>
          </div>

           <div className="card bg-base-100 shadow-lg hover:transform hover:scale-105 transition-transform">
            <div className="card-body items-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70 justify-around text-center">
                Collaborative code editor with syntax highlighting and
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
