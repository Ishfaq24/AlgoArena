import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";


const genAI = new GoogleGenerativeAI({
  apiKey: ENV.GEMINI_API_KEY,
});

export async function getGeminiReply(messages) {
  // Create model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  // Convert chat history to a single prompt
  const prompt = messages
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  // 🔥 THIS is where generateContent(prompt) is used
  const result = await model.generateContent(prompt);

  return result.response.text();
}
