import { getGeminiReply } from "../services/gemini.service.js";
import User from "../models/User.js";

export const aiTutor = async (req, res) => {
  try {
    const { messages } = req.body;
    const userId = req.user._id;

    // Get the latest user message to determine what they're learning
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    const topic = lastUserMessage?.content?.substring(0, 50) || 'General';

    const reply = await getGeminiReply(messages);

    // Track AI tutor usage as activity
    try {
      await User.findByIdAndUpdate(userId, {
        $push: {
          activities: {
            $each: [{
              action: 'AI Session',
              target: topic,
              icon: '🧠',
              time: new Date()
            }],
            $position: 0,
            $slice: 20
          }
        },
        $inc: { 'stats.aiSummaries': 1 }
      });
    } catch (activityError) {
      console.log('Failed to track AI activity:', activityError.message);
    }

    res.json({ reply });
  } catch (error) {
    console.error("AI Tutor Error:", error.message);
    res.status(500).json({
      reply: "AI service unavailable. Please try again later.",
    });
  }
};
