import React, { useState, useRef, useEffect } from "react";

export const ChatInput = ({ onSend, isStreaming }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (input.trim() && !isStreaming) {
      onSend(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        300
      )}px`;
    }
  }, [input]);

  return (
    <div className="bg-base-100 px-4 pb-5 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            className="
              w-full resize-none
              bg-base-100
              border border-base-300
              rounded-3xl
              py-4 pl-5 pr-14
              text-sm sm:text-base
              text-base-content
              placeholder:text-base-content/50
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500/20
              focus:border-emerald-500/50
              transition-all
              shadow-[0_8px_28px_rgba(0,0,0,0.08)]
            "
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className={`
              absolute right-3 bottom-3
              p-2.5 rounded-full
              transition-all duration-200
              ${
                input.trim() && !isStreaming
                  ? `
                    bg-base-content text-base-100
                    hover:opacity-90
                    shadow-sm
                    scale-100
                  `
                  : `
                    bg-base-200 text-base-content/40
                    cursor-not-allowed
                    scale-95
                  `
              }
            `}
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
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-base-content/40">
          AlgoArena AI can make mistakes. Check important answers before using them.
        </p>
      </div>
    </div>
  );
};
