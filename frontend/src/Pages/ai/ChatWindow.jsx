import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} {...msg} />
      ))}
    </div>
  );
}

export default ChatWindow;
