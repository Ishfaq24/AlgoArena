import { getGeminiReply } from "../services/gemini.service.js";

export const aiTutor = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const reply = await getGeminiReply(messages);

    res.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI Tutor failed" });
  }
};
