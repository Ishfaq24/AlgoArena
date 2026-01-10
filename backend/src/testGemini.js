import { GoogleGenerativeAI } from "@google/generative-ai";
console.log("API KEY:", process.env.GEMINI_API_KEY);
import { ENV } from "../lib/env.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1",
});

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const res = await model.generateContent({
  contents: [{ role: "user", parts: [{ text: "Hello Gemini" }] }],
});

console.log(res.response.text());
