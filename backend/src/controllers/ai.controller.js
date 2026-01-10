import { getGeminiReply } from "../services/gemini.service.js";

export const aiTutor = async (req, res) => {
  try {
    const { messages } = req.body;

    const reply = await getGeminiReply(messages);

    res.json({ reply });
  } catch (error) {
    console.error("AI Tutor Error:", error.message);
    res.status(500).json({
      reply: "AI service unavailable. Please try again later.",
    });
  }
};
