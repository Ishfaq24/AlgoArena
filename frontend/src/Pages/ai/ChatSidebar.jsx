import { PlusIcon, TrashIcon } from "lucide-react";

function ChatSidebar({ chats, activeId, onSelect, onNew, onDelete }) {
  return (
    <aside className="w-64 border-r border-primary/10 bg-base-200/50">
      <div className="p-4">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2 btn btn-primary btn-sm"
        >
          <PlusIcon className="size-4" /> New Chat
        </button>
      </div>

      <div className="px-2 space-y-1">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`
              group px-3 py-2 rounded-lg cursor-pointer
              ${chat.id === activeId ? "bg-primary/10" : "hover:bg-base-300"}
            `}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm truncate">{chat.title}</span>
              <TrashIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chat.id);
                }}
                className="size-4 opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar;
