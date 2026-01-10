export async function fakeAIResponse(prompt) {
  await new Promise(r => setTimeout(r, 700));

  return `📘 Explanation (Mock AI):

You asked about "${prompt}"

This is a simulated AI Tutor response.
Later, you can connect:
• OpenAI
• Gemini
• Local LLM
• Ollama

UI will remain unchanged.`;
}
