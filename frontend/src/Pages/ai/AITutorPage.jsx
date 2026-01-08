import { useState } from "react";
import Navbar from "../../components/Navbar";
import PromptInput from "./PromptInput";
import ChatMessage from "./ChatMessage";

function AITutorPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I’m your AI Tutor. What would you like to learn today?",
    },
  ]);

  const sendPrompt = async (prompt) => {
    const newMessages = [...messages, { role: "user", content: prompt }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <section className="relative">
      <Navbar />

      {/* SAME CONTAINER AS OTHER PAGES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* PAGE HEADER */}
        <header className="mb-8">
          <h1
            className="
              text-3xl sm:text-4xl font-black
              bg-gradient-to-r from-primary via-secondary to-accent
              bg-clip-text text-transparent
            "
          >
            AI Tutor
          </h1>
          <p className="text-base-content/60 mt-2 max-w-2xl">
            Learn concepts interactively with your personal AI tutor.
          </p>
        </header>

        {/* CHAT CONTAINER */}
        <div
          className="
            bg-base-100/80 backdrop-blur-md
            border border-primary/20
            rounded-2xl
            shadow-lg
            h-[65vh]
            flex flex-col
          "
        >
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} {...msg} />
            ))}
          </div>

          {/* INPUT */}
          <div className="border-t border-primary/10 p-4">
            <PromptInput onSend={sendPrompt} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AITutorPage;
