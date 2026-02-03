
import { GoogleGenAI } from "@google/genai";
import { Role, GeminiModel } from '../types.js';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });

export const sendMessageStream = async (
  messages,
  onChunk,
  model = GeminiModel.FLASH
) => {
  try {
    const lastMessage = messages[messages.length - 1];

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: "You are Pulse, a world-class AI assistant. You provide clear, concise, and helpful information. Use Markdown for formatting and code blocks where appropriate. Be friendly but professional.",
      }
    });

    const streamResponse = await chat.sendMessageStream({
      message: lastMessage.content
    });

    for await (const chunk of streamResponse) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
