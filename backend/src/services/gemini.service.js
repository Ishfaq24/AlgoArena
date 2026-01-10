import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

export async function getGeminiReply(messages) {
  // Create model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Convert chat history to a single prompt
  const prompt = messages
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  // 🔥 THIS is where generateContent(prompt) is used
  const result = await model.generateContent(prompt);

  return result.response.text();
}
