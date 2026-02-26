
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
  // Initialize Gemini AI with API key
  
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });


  const prompt = `
Generate a high-quality mock test for the domain "${domain}" on the specific topic "${topic}".
Provide exactly ${count} multiple-choice questions.
Each question must have:
- 4 options
- 1 correct answer index (0–3)
- A detailed explanation of why the answer is correct

The difficulty should be appropriate for ${domain} level practice.

Respond strictly in valid JSON.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          testTitle: { type: 'string' },
          questions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                text: { type: 'string' },
                options: {
                  type: 'array',
                  items: { type: 'string' },
                },
                correctAnswerIndex: { type: 'integer' },
                explanation: { type: 'string' },
              },
              required: [
                'text',
                'options',
                'correctAnswerIndex',
                'explanation',
              ],
            },
          },
        },
        required: ['testTitle', 'questions'],
      },
    },
  });

  // Gemini returns JSON as text
  const jsonStr = response.text?.trim() || '{}';
  const data = JSON.parse(jsonStr);

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
};
