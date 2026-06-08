/* eslint-disable no-unused-vars */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { STUDENT_TUTOR_SYSTEM_INSTRUCTION } from "../services/geminiService.js";

const MarkdownMessage = ({ text }) => {
  const html = useMemo(() => {
    return DOMPurify.sanitize(marked.parse(text || ""));
  }, [text]);

  return (
    <div
      className="
        prose prose-sm max-w-none
        prose-p:my-2 prose-ul:my-2 prose-ol:my-2
        prose-li:my-1 prose-li:marker:text-primary
        prose-h2:mt-4 prose-h2:mb-2 prose-h2:text-sm
        prose-h2:border-l-4 prose-h2:border-primary
        prose-h2:bg-base-100/70 prose-h2:px-2.5 prose-h2:py-1.5
        prose-h2:rounded-r-md
        prose-strong:text-inherit
        prose-code:text-primary prose-code:bg-base-100
        prose-code:px-1 prose-code:rounded
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-base-100 prose-pre:border prose-pre:border-base-300
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const buildCoachPrompt = (messages, userPrompt, userPath) => {
  const recentContext = messages
    .slice(-6)
    .map((message) => `${message.role === 'user' ? 'Student' : 'Tutor'}: ${message.text}`)
    .join('\n\n');

  return `
Learning path: ${userPath || 'AlgoArena student'}

Recent conversation:
${recentContext || 'No earlier context.'}

Student question:
${userPrompt}

Answer as a tutor for this learning path. Use real Markdown headings with ##,
short paragraphs, and bullets so the answer is easy to scan in a small chat window.
`;
};

const AITutorFab = ({ userPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Hi! I'm your AI Tutor for ${userPath || 'AlgoArena'}. Ask me anything and I'll explain it like a lesson.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userPrompt = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: buildCoachPrompt(messages, userPrompt, userPath),
        config: {
          systemInstruction: STUDENT_TUTOR_SYSTEM_INSTRUCTION,
          temperature: 0.65,
        }
      });

      setMessages(prev => [
        ...prev,
        { role: 'ai', text: response.text || "I'm processing that..." }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: "I could not connect to the tutor service right now. Please try again in a moment."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-base-100 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-primary text-base-100 flex justify-between items-center">
            <span className="font-bold text-sm">AI Tutor - {userPath || 'AlgoArena'}</span>
            <button onClick={() => setIsOpen(false)}>x</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-base-100'
                      : 'bg-base-200 text-base-content'
                  }`}
                >
                  <MarkdownMessage text={message.text} />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-base-200 text-base-content px-4 py-3 rounded-2xl text-sm">
                  Thinking through the lesson...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-base-200 border-t border-white/5">
            <div className="flex gap-2">
              <input
                className="flex-1 bg-base-100 rounded-xl px-4 py-2 text-sm outline-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a study question..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-primary text-base-100 px-4 rounded-xl disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-xl"
      >
        AI
      </button>
    </div>
  );
};

export default AITutorFab;
