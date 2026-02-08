/* eslint-disable no-unused-vars */

import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

/**
 * Note: Since Clerk requires a Provider at the root, 
 * this component will show a fallback if useUser() is called 
 * without a surrounding <ClerkProvider />.
 */
function WelcomeSection({ onCreateSession }) {
  let user = null;
  try {
    const clerk = useUser();
    user = clerk.user;
  } catch (e) {
    // Fallback for development if Provider is missing
    user = { firstName: "Ishfaq" };
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-0 py-10 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">

          {/* LEFT SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10 h-10 sm:w-12 sm:h-12 
                  rounded-2xl 
                  bg-gradient-to-br from-primary to-secondary 
                  flex items-center justify-center
                  shadow-md
                "
              >
                <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-base-100" />
              </div>

              <h1
                className="
                  text-3xl sm:text-4xl md:text-5xl 
                  font-black 
                  bg-gradient-to-r from-primary via-secondary to-accent 
                  bg-clip-text text-transparent 
                  leading-tight
                "
              >
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>

            <p className="text-base sm:text-lg text-white/50 pl-0 sm:pl-14 max-w-xl">
              Ready to crush your learning goals today?
            </p>
          </div>

          {/* RIGHT SECTION BUTTON */}
          <div className="flex md:justify-end">
            <button
              onClick={onCreateSession}
              className="
                group
                flex items-center gap-3
                w-full md:w-auto
                px-5 py-3 sm:px-8 sm:py-4
                bg-gradient-to-r from-primary to-secondary
                rounded-2xl
                text-base-100
                font-bold
                text-base sm:text-lg
                shadow-lg shadow-primary/20
                transition-all duration-300 ease-out
                hover:opacity-90 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              "
            >
              <ZapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Continue Learning</span>
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
