import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiReply = async (messages) => {
  if (!messages || messages.length === 0) {
    throw new Error("No messages provided");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = messages
    .map((m) => {
      if (!m.role || !m.content) return "";
      return `${m.role === "user" ? "User" : "Tutor"}: ${m.content}`;
    })
    .join("\n");

  const result = await model.generateContent(prompt);
  const response = result.response;

  if (!response || !response.text) {
    throw new Error("Empty Gemini response");
  }

  return response.text();
};
