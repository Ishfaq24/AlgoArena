
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
      className="prose prose-invert prose-sm leading-relaxed"
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

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">Gemini Pulse</h2>
          <p className="text-slate-400 max-w-sm mx-auto text-lg">
            Your high-performance workspace for intelligent conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8 space-y-8 max-w-5xl mx-auto w-full">
      {messages.map((message) => {
        if (message.role === Role.ASSISTANT && !message.content && isStreaming) {
          return null;
        }

        return (
          <div 
            key={message.id} 
            className={`flex ${message.role === Role.USER ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`
              max-w-[90%] sm:max-w-[80%] rounded-2xl px-5 py-4 shadow-lg
              ${message.role === Role.USER 
                ? 'bg-indigo-600 text-white border border-indigo-500/50' 
                : 'bg-slate-900 border border-slate-800 text-slate-100'}
            `}>
              <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-widest font-bold opacity-50">
                <span className={message.role === Role.USER ? 'text-indigo-100' : 'text-blue-400'}>
                  {message.role === Role.USER ? 'User' : 'Pulse Engine'}
                </span>
                <span>•</span>
                <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <MarkdownContent content={message.content} />
            </div>
          </div>
        );
      })}
      
      {isStreaming && (messages.length === 0 || messages[messages.length - 1].role === Role.USER || (messages[messages.length-1].role === Role.ASSISTANT && !messages[messages.length-1].content)) && (
         <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-500">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 shadow-sm">
                <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
         </div>
      )}
      <div className="h-4" />
    </div>
  );
};
