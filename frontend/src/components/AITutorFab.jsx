/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AITutorFab = ({ userPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm your AI Coach for ${userPath}. How can I help you today?` }
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
        contents: userPrompt,
        config: {
          systemInstruction: `You are EduFlow AI Coach for ${userPath}. Be helpful and domain-specific.`,
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm processing that..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-base-100 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-primary text-base-100 flex justify-between items-center">
            <span className="font-bold text-sm">AI Tutor • {userPath}</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-base-100' : 'bg-base-200 text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-base-200 border-t border-white/5">
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-base-100 rounded-xl px-4 py-2 text-sm outline-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask..."
              />
              <button onClick={handleSend} className="bg-primary text-base-100 px-4 rounded-xl">→</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
        AI
      </button>
    </div>
  );
};

export default AITutorFab;
