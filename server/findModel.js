import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  const models = ["gemini-pro", "gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro"];
  for (const m of models) {
      try {
          const model = genAI.getGenerativeModel({ model: m });
          const result = await model.generateContent("hi");
          console.log(`Model ${m} WORKS!`);
          return;
      } catch (e) {
          console.log(`Model ${m} FAILED: ${e.message}`);
      }
  }
}

listModels();
