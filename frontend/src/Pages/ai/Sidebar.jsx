import React from 'https://esm.sh/react@19.2.4';

export const Sidebar = ({
  threads,
  activeId,
  onSelect,
  onNew,
  onDelete,
  isOpen,
  toggleSidebar
}) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-80
        bg-[#0b0b0b] border-r border-[#1f2933]
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 ${!isOpen && 'lg:hidden'}
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="p-4 h-16 flex items-center justify-between border-b border-[#1f2933]">
        <h1 className="
          text-xl font-extrabold tracking-tight
          bg-gradient-to-r from-emerald-400 to-emerald-600
          bg-clip-text text-transparent
        ">
          AlgoArena
        </h1>

        <div className="flex items-center gap-1">
          {/* New Chat */}
          <button
            onClick={onNew}
            className="
              p-2 rounded-lg
              bg-emerald-500 hover:bg-emerald-600
              text-black transition-colors
              shadow-md shadow-emerald-500/20
            "
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Close (mobile) */}
          <button
            onClick={toggleSidebar}
            className="
              p-2 rounded-lg
              text-gray-400 hover:text-gray-200
              hover:bg-[#111827]
              transition-colors lg:hidden
            "
            title="Close Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Recents
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#111827] text-gray-400">
            ⌘ K
          </span>
        </div>

        {threads.length === 0 ? (
          <div className="text-center py-12 px-6 space-y-3 text-gray-400">
            <div className="text-sm">
              Start a conversation with
            </div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
              <span>AlgoArena AI</span>
              <span>⚡</span>
            </div>
            <p className="text-xs opacity-70">
              Ask DSA, Web, ML or exam doubts
            </p>
          </div>
        ) : (
          threads.map(thread => {
            const isActive = activeId === thread.id;

            return (
              <div
                key={thread.id}
                onClick={() => onSelect(thread.id)}
                className={`
                  group relative flex items-center gap-3
                  p-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${isActive
                    ? `
                      bg-[#111827] text-white
                      ring-1 ring-emerald-500/30
                    `
                    : `
                      text-gray-400
                      hover:bg-[#111827]
                      hover:text-gray-200
                      hover:-translate-y-[1px]
                      hover:shadow-lg hover:shadow-black/40
                    `
                  }
                `}
              >
                {/* Active Energy Bar */}
                {isActive && (
                  <div className="
                    absolute left-0 top-2 bottom-2
                    w-[2px] bg-emerald-500 rounded-full
                  " />
                )}

                {/* Status Dot */}
                <div
                  className={`
                    shrink-0 w-2 h-2 rounded-full
                    ${isActive ? 'bg-emerald-500' : 'bg-[#1f2933]'}
                  `}
                />

                {/* Title with Fade */}
                <div className="relative flex-1 overflow-hidden">
                  <span className="text-sm font-medium block truncate pr-6">
                    {thread.title}
                  </span>
                  <div className="
                    pointer-events-none absolute right-0 top-0 h-full w-6
                    bg-gradient-to-l from-[#111827] to-transparent
                  " />
                </div>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(thread.id);
                  }}
                  className="
                    absolute right-2 opacity-0
                    group-hover:opacity-100
                    p-1.5 rounded-lg
                    text-gray-400
                    hover:text-red-400
                    hover:bg-red-400/10
                    transition-all
                  "
                  title="Delete Chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="
        p-4 border-t border-[#1f2933]
        text-xs flex items-center gap-2
      ">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-gray-400">
          AlgoArena AI Online
        </span>
      </div>
    </aside>
  );
};
