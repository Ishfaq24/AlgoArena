import { useEffect, useState } from "react";

const STORAGE_KEY = "ai_tutor_chats";

export function useChatStore() {
  const [chats, setChats] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });

  const [activeChatId, setActiveChatId] = useState(
    chats[0]?.id || null
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find(c => c.id === activeChatId);

  const createChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [
        {
          role: "assistant",
          content: "Hi! I’m your AI Tutor. What would you like to learn today?"
        }
      ],
      createdAt: Date.now()
    };

    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const sendMessage = (content, aiReply) => {
    setChats(chats =>
      chats.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              title:
                chat.title === "New Chat"
                  ? content.slice(0, 30)
                  : chat.title,
              messages: [
                ...chat.messages,
                { role: "user", content },
                { role: "assistant", content: aiReply }
              ]
            }
          : chat
      )
    );
  };

  const deleteChat = (id) => {
    const filtered = chats.filter(c => c.id !== id);
    setChats(filtered);
    setActiveChatId(filtered[0]?.id || null);
  };

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
    deleteChat
  };
}
