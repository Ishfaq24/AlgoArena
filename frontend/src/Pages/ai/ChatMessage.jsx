function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-xl text-sm
          ${isUser
            ? "bg-primary text-primary-content"
            : "bg-base-200 text-base-content"}
        `}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatMessage;
