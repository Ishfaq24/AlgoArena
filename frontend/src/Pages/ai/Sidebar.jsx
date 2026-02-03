
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
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-80 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:relative lg:translate-x-0 ${!isOpen && 'lg:hidden'}
    `}>
      <div className="p-4 h-16 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Pulse
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onNew}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center"
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors lg:hidden"
            title="Close Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Recents
        </div>
        {threads.length === 0 ? (
          <div className="text-center py-10 px-4 opacity-40">
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          threads.map(thread => (
            <div 
              key={thread.id}
              className={`
                group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                ${activeId === thread.id 
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700/50' 
                  : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}
              `}
              onClick={() => onSelect(thread.id)}
            >
              <div className={`shrink-0 w-2 h-2 rounded-full ${activeId === thread.id ? 'bg-indigo-500' : 'bg-slate-700'}`} />
              <span className="text-sm truncate pr-8 font-medium">{thread.title}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(thread.id);
                }}
                className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                title="Delete Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
