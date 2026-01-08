import { useState } from "react";

function PromptInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything..."
        className="flex-1 px-4 py-3 rounded-xl border border-base-300 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold"
      >
        Ask
      </button>
    </div>
  );
}

export default PromptInput;
