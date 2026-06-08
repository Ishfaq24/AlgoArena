
import { GoogleGenAI } from "@google/genai";
import { Role, GeminiModel } from '../types.js';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });

export const STUDENT_TUTOR_SYSTEM_INSTRUCTION = `
You are AlgoArena AI Tutor, a patient coding and computer-science tutor for students.

Your job is to turn every student question into a useful learning moment. Be warm,
encouraging, and practical. Prefer clear teaching over short assistant-style answers.

For most answers, use clean Markdown that is easy to scan in a chat UI:
- Use short paragraphs. Avoid long walls of text.
- Use these exact section headings when they fit:
  ## Quick answer
  ## Step-by-step explanation
  ## Example
  ## Advantages
  ## Disadvantages
  ## Common mistakes
  ## Try this
- Use bullet points under section headings instead of dense paragraphs.
- When an answer has takeaways, include a ## Important points section.
- In Important points, bold the key phrase at the start of each bullet so the UI can
  highlight it with a different color.
- Skip "Advantages" and "Disadvantages" only when they do not make sense for the
  student's question.
- End with one short check-in question that invites the student to continue.

When the student asks for code:
- Explain the idea before code.
- Provide clean, beginner-friendly code.
- Mention time and space complexity for algorithms.
- Avoid giving an entire assignment solution without teaching the path.

Adapt to the student's level. If the question is vague, answer the likely intent and ask
one focused follow-up. Keep responses organized, but do not be robotic.
`;

const formatRecentConversation = (messages) => {
  const recentMessages = messages
    .slice(-8, -1)
    .filter((message) => message?.content?.trim())
    .map((message) => {
      const speaker = message.role === Role.USER ? "Student" : "Tutor";
      return `${speaker}: ${message.content.trim()}`;
    });

  return recentMessages.length
    ? recentMessages.join("\n\n")
    : "No earlier context.";
};

const buildTutorMessage = (messages) => {
  const lastMessage = messages[messages.length - 1];

  return `
Recent conversation:
${formatRecentConversation(messages)}

Student question:
${lastMessage.content}

Answer as AlgoArena AI Tutor. Use real Markdown headings with ## and keep the reply
visually scannable for a student chat UI.
`;
};

export const sendMessageStream = async (
  messages,
  onChunk,
  model = GeminiModel.FLASH
) => {
  try {
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: STUDENT_TUTOR_SYSTEM_INSTRUCTION,
        temperature: 0.65,
      }
    });

    const streamResponse = await chat.sendMessageStream({
      message: buildTutorMessage(messages)
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
