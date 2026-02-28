import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";

// Use the v1 API endpoint
const genAI = new GoogleGenerativeAI({
  apiKey: ENV.GEMINI_API_KEY,
});

export const generateTest = async (req, res) => {
  try {
    const { domain, topic, count = 10 } = req.body;
    console.log("Test generation request:", { domain, topic, count });

    if (!domain || !topic) {
      return res.status(400).json({ message: "Domain and topic are required" });
    }

    console.log("GEMINI_API_KEY present:", !!ENV.GEMINI_API_KEY);
    if (!ENV.GEMINI_API_KEY) {
      return res.status(500).json({ message: "API key not configured on server" });
    }

    // Try gemini-2.0-flash-exp which is the experimental model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
Generate a high-quality mock test for the domain "${domain}" on the specific topic "${topic}".
Provide exactly ${count} multiple-choice questions.
Each question must have:
- 4 options
- 1 correct answer index (0-3)
- A detailed explanation of why the answer is correct

The difficulty should be appropriate for ${domain} level practice.

Respond strictly in valid JSON with this format:
{"testTitle": "...", "questions": [{"text": "...", "options": ["...", "...", "...", "..."], "correctAnswerIndex": 0, "explanation": "..."}]}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON response
    let data;
    try {
      // Try to extract JSON from response (in case there's any surrounding text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        data = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseText);
      return res.status(500).json({ message: "Failed to parse AI response. Please try again." });
    }

    if (!data.questions || data.questions.length === 0) {
      return res.status(500).json({ message: "No questions were generated. Please try a different topic." });
    }

    const questions = data.questions.map((q, idx) => ({
      ...q,
      id: `q-${idx}`,
    }));

    const test = {
      id: `test-${Date.now()}`,
      title: data.testTitle || `${topic} Practice Set`,
      domain,
      topic,
      questions,
      createdAt: Date.now(),
    };

    res.status(200).json({ test });
  } catch (error) {
    console.error("Test generation error:", error.message);
    
    if (error.message?.includes('API key')) {
      return res.status(500).json({ message: "Invalid API key" });
    }
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(500).json({ message: "API quota exceeded. Please try again later." });
    }
    
    res.status(500).json({ message: "Failed to generate test. Please try again." });
  }
};