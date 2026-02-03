
import React, { useState, useRef, useEffect } from 'react';

export const ChatInput = ({ onSend, isStreaming }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (input.trim() && !isStreaming) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 300)}px`;
    }
  }, [input]);

  return (
    <div className="px-4 pb-6 sm:px-6 lg:px-8 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
          className="w-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all resize-none shadow-2xl text-slate-100 placeholder:text-slate-500 text-sm sm:text-base"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isStreaming}
          className={`
            absolute right-3 bottom-3 p-2.5 rounded-xl transition-all duration-200
            ${input.trim() && !isStreaming 
              ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 scale-100' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed scale-95'}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};
