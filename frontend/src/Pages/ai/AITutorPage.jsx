
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { ChatContainer } from './ChatContainer.jsx';
import { ChatInput } from './ChatInput.jsx';
import { Header } from './Header.jsx';
import { Role, GeminiModel } from '../../types.js';
import { sendMessageStream } from '../../services/geminiService.js';
import { dbService } from '../../services/dbService.js';

const App = () => {
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [activeMessages, setActiveMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [selectedModel, setSelectedModel] = useState(GeminiModel.FLASH);

  useEffect(() => {
    const initDb = async () => {
      try {
        const allThreads = await dbService.getAllThreads();
        setThreads(allThreads);
        setIsDbConnected(true);
        const lastThreadId = localStorage.getItem('pulse_last_active_thread');
        if (lastThreadId && allThreads.find(t => t.id === lastThreadId)) {
          setActiveThreadId(lastThreadId);
        }
      } catch (err) {
        console.error("DB Init failed:", err);
      }
    };
    initDb();
  }, []);

  useEffect(() => {
    if (activeThreadId) {
      dbService.getMessagesForThread(activeThreadId).then(msgs => {
        setActiveMessages(msgs.sort((a, b) => a.timestamp - b.timestamp));
      });
      localStorage.setItem('pulse_last_active_thread', activeThreadId);
    } else {
      setActiveMessages([]);
    }
  }, [activeThreadId]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleSelectThread = (id) => {
    setActiveThreadId(id);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const createNewThread = useCallback(async () => {
    const newThread = {
      id: crypto.randomUUID(),
      title: 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await dbService.saveThread(newThread);
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
  }, []);

  const handleSendMessage = async (content) => {
    if (!content.trim() || isStreaming) return;

    let threadId = activeThreadId;
    if (!threadId) {
      const newThread = {
        id: crypto.randomUUID(),
        title: content.slice(0, 40) + '...',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await dbService.saveThread(newThread);
      setThreads(prev => [newThread, ...prev]);
      threadId = newThread.id;
      setActiveThreadId(threadId);
    }

    const userMsg = { id: crypto.randomUUID(), role: Role.USER, content, timestamp: Date.now() };
    const assistantMsg = { id: crypto.randomUUID(), role: Role.ASSISTANT, content: '', timestamp: Date.now() };

    setActiveMessages(prev => [...prev, userMsg, assistantMsg]);
    await dbService.saveMessage({ ...userMsg, threadId });
    await dbService.saveMessage({ ...assistantMsg, threadId });

    setIsStreaming(true);
    try {
      let accumulated = '';
      await sendMessageStream([...activeMessages, userMsg], (chunk) => {
        accumulated += chunk;
        setActiveMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: accumulated } : m));
      }, selectedModel);
      await dbService.saveMessage({ ...assistantMsg, content: accumulated, threadId });
      await dbService.updateThreadMetadata(threadId, {});
    } catch (error) {
      console.error(error);
    } finally {
      setIsStreaming(false);
    }
  };

  const deleteThread = async (id) => {
    await dbService.deleteThread(id);
    setThreads(prev => prev.filter(t => t.id !== id));
    if (activeThreadId === id) setActiveThreadId(null);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar threads={threads} activeId={activeThreadId} onSelect={handleSelectThread} onNew={createNewThread} onDelete={deleteThread} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col relative min-w-0">
        <Header activeThread={threads.find(t => t.id === activeThreadId)} onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} selectedModel={selectedModel} onModelChange={setSelectedModel} isDbConnected={isDbConnected} />
        <ChatContainer messages={activeMessages} isStreaming={isStreaming} />
        <ChatInput onSend={handleSendMessage} isStreaming={isStreaming} />
      </main>
    </div>
  );
};

export default App;
