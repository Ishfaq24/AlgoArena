import React from "react";
import { GeminiModel } from "../../types.js";

export const Header = ({
  activeThread,
  onToggleSidebar,
  isSidebarOpen,
  selectedModel,
  onModelChange,
  isDbConnected,
}) => {
  return (
    <header className="sticky top-0 z-10 h-16 bg-base-100 border-b border-base-200 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-base-content/70 hover:bg-base-200 transition-colors"
          title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex flex-col min-w-0">
          <h2 className="text-sm font-semibold text-base-content truncate">
            {activeThread?.title || "New chat"}
          </h2>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDbConnected ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
              }`}
            />
            <span className="text-[9px] text-base-content/60 uppercase tracking-widest font-bold">
              {isDbConnected ? "Saved locally" : "Connecting"}
            </span>
          </div>
        </div>
      </div>

      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="
          bg-base-100 border border-base-300 text-[11px] font-medium
          text-base-content/80 rounded-lg px-2 py-1.5
          focus:outline-none focus:ring-1 focus:ring-emerald-500
          transition-all cursor-pointer appearance-none text-center min-w-[120px]
        "
      >
        <option value={GeminiModel.FLASH}>Algo 3 Flash</option>
        <option value={GeminiModel.PRO}>Algo 3 Pro</option>
      </select>
    </header>
  );
};
