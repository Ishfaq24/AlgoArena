
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

export const generateMockTest = async (domain, topic, count = 10) => {
  // Check for API key
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error('API key not configured. Please add VITE_API_KEY to your .env file.');
  }

  const prompt = `
Generate a high-quality mock test for the domain "${domain}" on the specific topic "${topic}".
Provide exactly ${count} multiple-choice questions.
Each question must have:
- 4 options
- 1 correct answer index (0–3)
- A detailed explanation of why the answer is correct

The difficulty should be appropriate for ${domain} level practice.

Respond strictly in valid JSON with this format:
{"testTitle": "...", "questions": [{"text": "...", "options": ["...", "...", "...", "..."], "correctAnswerIndex": 0, "explanation": "..."}]}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    // Gemini returns JSON as text
    const jsonStr = response.text?.trim() || '{}';
    const data = JSON.parse(jsonStr);

    if (!data.questions || data.questions.length === 0) {
      throw new Error('No questions were generated. Please try a different topic.');
    }

    const questions = (data.questions || []).map((q, idx) => ({
      ...q,
      id: `q-${idx}`,
    }));

    return {
      id: `test-${Date.now()}`,
      title: data.testTitle || `${topic} Practice Set`,
      domain,
      topic,
      questions,
      createdAt: Date.now(),
    };
  } catch (error) {
    console.error('Test generation error:', error);
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your VITE_API_KEY in .env file.');
    }
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    throw error;
  }
};
