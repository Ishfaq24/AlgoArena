import React from "https://esm.sh/react@19.2.4";

export const Sidebar = ({
  threads,
  activeId,
  onSelect,
  onNew,
  onDelete,
  isOpen,
  toggleSidebar,
}) => {
  return (
    <aside
      className={`
        fixed left-0 z-40 w-80
        top-16 bottom-0
        lg:top-0 lg:inset-y-0

        bg-base-100 border-r border-base-200
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 ${!isOpen && "lg:hidden"}
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-base-200">
        <h1
          className="
            text-xl font-extrabold tracking-tight
            bg-gradient-to-r from-primary to-secondary
            bg-clip-text text-transparent
          "
        >
          AlgoArena
        </h1>

        <div className="flex items-center gap-1">
          {/* New Chat */}
          <button
            onClick={onNew}
            className="
              p-2 rounded-lg
              bg-primary text-primary-content
              hover:bg-primary/90
              transition-colors
              shadow-sm
            "
            title="New Chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          {/* Close (mobile) */}
          <button
            onClick={toggleSidebar}
            className="
              p-2 rounded-lg
              text-base-content/60
              hover:text-base-content
              hover:bg-base-200
              transition-colors lg:hidden
            "
            title="Close Sidebar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[10px] font-bold text-base-content/50 uppercase tracking-widest">
            Recents
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-base-200 text-base-content/60">
            ⌘ K
          </span>
        </div>

        {threads.length === 0 ? (
          <div className="text-center py-12 px-6 space-y-3 text-base-content/60">
            <div className="text-sm">Start a conversation with</div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold">
              <span>AlgoArena AI</span>
              <span>⚡</span>
            </div>
            <p className="text-xs opacity-70">
              Ask DSA, Web, ML or exam doubts
            </p>
          </div>
        ) : (
          threads.map((thread) => {
            const isActive = activeId === thread.id;

            return (
              <div
                key={thread.id}
                onClick={() => onSelect(thread.id)}
                className={`
                  group relative flex items-center gap-3
                  p-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${
                    isActive
                      ? `
                        bg-base-200 text-base-content
                        ring-1 ring-primary/30
                      `
                      : `
                        text-base-content/70
                        hover:bg-base-200
                        hover:text-base-content
                        hover:-translate-y-[1px]
                      `
                  }
                `}
              >
                {/* Active Bar */}
                {isActive && (
                  <div
                    className="
                      absolute left-0 top-2 bottom-2
                      w-[2px] bg-primary rounded-full
                    "
                  />
                )}

                {/* Status Dot */}
                <div
                  className={`
                    shrink-0 w-2 h-2 rounded-full
                    ${isActive ? "bg-primary" : "bg-base-300"}
                  `}
                />

                {/* Title */}
                <div className="relative flex-1 overflow-hidden">
                  <span className="text-sm font-medium block truncate pr-10">
                    {thread.title}
                  </span>
                  <div
                    className="
                      pointer-events-none absolute right-0 top-0 h-full w-6
                      bg-gradient-to-l from-base-200 to-transparent
                    "
                  />
                </div>

                {/* DELETE — mobile safe */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(thread.id);
                  }}
                  className="
                    absolute right-2
                    p-2 rounded-lg
                    text-base-content/50
                    hover:text-error
                    hover:bg-error/10
                    transition-all

                    opacity-100 sm:opacity-0
                    sm:group-hover:opacity-100
                  "
                  title="Delete Chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="p-4 border-t border-base-200 text-xs flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-base-content/60">
          AlgoArena AI Online
        </span>
      </div>
    </aside>
  );
};
