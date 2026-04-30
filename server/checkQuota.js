import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function checkModel() {
  const modelName = "gemini-flash-latest";
  try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("hi");
      console.log(`Model ${modelName} WORKS!`);
  } catch (e) {
      console.log(`Model ${modelName} FAILED: ${e.message}`);
  }
}

checkModel();
