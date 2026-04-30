import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// We only initialize this when the route is hit to allow for lazy loading of the API key
// if the user adds it while the server is running.

export const handleChat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is missing from server/.env" 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format history for Gemini
    // Gemini expects history as: [{ role: "user", parts: [{ text: "hi" }] }, { role: "model", parts: [{ text: "hello" }] }]
    const formattedHistory = history ? history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })) : [];

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful and polite virtual assistant for Travesia, an online hotel booking platform. Your goal is to help users find information about hotels, rooms, booking processes, and answer general queries. Be concise, friendly, and professional. If you don't know the answer, ask them to contact support at karan9302451907@gmail.com." }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am the Travesia virtual assistant, ready to help users with hotel bookings, room information, and general inquiries in a concise, friendly, and professional manner." }]
        },
        ...formattedHistory
      ]
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
};
