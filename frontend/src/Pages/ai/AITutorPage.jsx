import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Navbar from "../../components/Navbar";
import ChatSidebar from "./ChatSidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import PromptInput from "./PromptInput.jsx";
import { useChatStore } from "../../hooks/useChatStore.js";
import { fakeAIResponse } from "./fakeAI.js";

function AITutorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
    deleteChat,
  } = useChatStore();

  const handleSend = async (prompt) => {
    const reply = await fakeAIResponse(prompt);
    sendMessage(prompt, reply);
  };

  return (
    <section className="relative h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-72px)] max-w-7xl mx-auto relative">
        
        {/* MOBILE SIDEBAR OVERLAY */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed z-50 inset-y-0 left-0 w-64
            bg-base-100
            transform transition-transform duration-300
            md:relative md:translate-x-0 md:z-auto
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <ChatSidebar
            chats={chats}
            activeId={activeChatId}
            onSelect={(id) => {
              setActiveChatId(id);
              setIsSidebarOpen(false);
            }}
            onNew={createChat}
            onDelete={deleteChat}
          />
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col w-full">

          {/* MOBILE HEADER */}
          <div className="md:hidden flex items-center gap-2 border-b border-primary/10 p-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-ghost btn-sm"
            >
              <MenuIcon className="size-5" />
            </button>
            <h2 className="font-semibold truncate">
              {activeChat?.title || "AI Tutor"}
            </h2>
          </div>

          <ChatWindow messages={activeChat?.messages || []} />

          <div className="border-t border-primary/10 p-4">
            <PromptInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AITutorPage;
