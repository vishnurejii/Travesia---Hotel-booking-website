import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function run() {
  try {
    const result = await model.generateContent("hello");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
