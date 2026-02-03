import React, { useEffect, useRef, useMemo } from 'react';
import { Role } from '../../types.js';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const MarkdownContent = ({ content }) => {
  const html = useMemo(() => {
    if (!content) return '';
    const rawHtml = marked.parse(content);
    return DOMPurify.sanitize(rawHtml);
  }, [content]);

  return (
    <div
      className="prose prose-invert prose-sm leading-relaxed text-gray-200"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const ChatContainer = ({ messages, isStreaming }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  /* ---------------- EMPTY STATE ---------------- */
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-700">
        
        <div className="
          w-20 h-20 rounded-3xl
          bg-gradient-to-tr from-emerald-500 to-emerald-600
          flex items-center justify-center
          shadow-2xl shadow-emerald-500/20
          rotate-3
        ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-black -rotate-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            AlgoArena AI
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto text-lg">
            Learn. Practice. Grow — with your intelligent coding companion.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- CHAT ---------------- */
  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-8 space-y-8 max-w-5xl mx-auto w-full"
    >
      {messages.map((message) => {
        if (message.role === Role.ASSISTANT && !message.content && isStreaming) {
          return null;
        }

        const isUser = message.role === Role.USER;

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}
              animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`
                max-w-[90%] sm:max-w-[80%] rounded-2xl px-5 py-4
                shadow-lg border
                ${isUser
                  ? `
                    bg-gradient-to-br from-emerald-500 to-emerald-600
                    text-black border-emerald-400/40
                  `
                  : `
                    bg-[#111827] text-gray-200
                    border-[#1f2933]
                  `
                }
              `}
            >
              <div className="
                flex items-center gap-2 mb-3
                text-[10px] uppercase tracking-widest font-bold opacity-60
              ">
                <span className={isUser ? 'text-black/80' : 'text-emerald-400'}>
                  {isUser ? 'You' : 'AlgoArena AI'}
                </span>
                <span>•</span>
                <span>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <MarkdownContent content={message.content} />
            </div>
          </div>
        );
      })}

      {/* ---------------- STREAMING INDICATOR ---------------- */}
      {isStreaming && (
        <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-500">
          <div className="
            bg-[#111827] border border-[#1f2933]
            rounded-2xl px-6 py-4
          ">
            <div className="flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
};
