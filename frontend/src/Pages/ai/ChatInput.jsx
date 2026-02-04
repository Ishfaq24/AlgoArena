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
    <div className="px-4 pb-6 sm:px-6 lg:px-8 bg-base-100 border-t border-base-200">
      <div className="max-w-4xl mx-auto relative">
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
            rounded-2xl
            py-4 pl-5 pr-14
            text-sm sm:text-base
            text-base-content
            placeholder:text-base-content/50
            focus:outline-none
            focus:ring-2 focus:ring-primary/30
            focus:border-primary/50
            transition-all
            shadow-sm
          "
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || isStreaming}
          className={`
            absolute right-3 bottom-3
            p-2.5 rounded-xl
            transition-all duration-200
            ${
              input.trim() && !isStreaming
                ? `
                  bg-primary text-primary-content
                  hover:bg-primary/90
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
