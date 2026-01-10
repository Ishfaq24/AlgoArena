import { useState } from "react";
import { SendHorizonalIcon } from "lucide-react";

function PromptInput({ onSend }) {
  const [value, setValue] = useState("");

  const sendMessage = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 🚨 required
      sendMessage();
    }
  };

  return (
    <div className="relative flex items-end gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Message AI Tutor..."
        className="
          w-full resize-none
          rounded-2xl
          border border-primary/20
          bg-base-100
          px-4 py-3 pr-12
          text-sm
          focus:outline-none focus:ring-2 focus:ring-primary/40
          max-h-40
        "
      />

      {/* SEND ICON BUTTON */}
      <button
        onClick={sendMessage}
        disabled={!value.trim()}
        className="
          absolute right-3 bottom-3
          text-primary
          disabled:text-base-content/30
          transition
        "
      >
        <SendHorizonalIcon className="size-5" />
      </button>
    </div>
  );
}

export default PromptInput;
