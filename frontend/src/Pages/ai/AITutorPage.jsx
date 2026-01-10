import Navbar from "../../components/Navbar";
import ChatSidebar from "./ChatSidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import PromptInput from "./PromptInput.jsx";
import { useChatStore } from "../../hooks/useChatStore.js";
import { fakeAIResponse } from "./fakeAI.js";

function AITutorPage() {
  const {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
    deleteChat
  } = useChatStore();

  const handleSend = async (prompt) => {
    const reply = await fakeAIResponse(prompt);
    sendMessage(prompt, reply);
  };

  return (
    <section className="relative">
      <Navbar />

      <div className="flex h-[calc(100vh-72px)] max-w-7xl mx-auto">
        <ChatSidebar
          chats={chats}
          activeId={activeChatId}
          onSelect={setActiveChatId}
          onNew={createChat}
          onDelete={deleteChat}
        />

        <div className="flex-1 flex flex-col">
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
