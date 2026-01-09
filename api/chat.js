// api/chat.js
import OpenAI from 'openai';

// 1. Setup the client to talk to OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // We will set this in Vercel later. NEVER hardcode it here.
});

export default async function handler(req, res) {
  // 2. Only allow POST requests (Sending data)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // 3. Get the message sent from Roblox or ReqBin
    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 4. Default system prompt if none is provided
    const defaultSystem = "You are a helpful AI assistant inside a Roblox game. Keep your answers short, concise, and safe for all ages.";
    const finalSystem = systemPrompt || defaultSystem;

    // 5. Call the Xiaomi Model
    const completion = await openai.chat.completions.create({
      model: "xiaomi/mimo-v2-flash:free",
      messages: [
        { role: "system", content: finalSystem },
        { role: "user", content: message }
      ],
      max_tokens: 150, // Keep it short for Roblox chat bubbles
    });

    const reply = completion.choices[0].message.content;

    // 6. Send the answer back
    return res.status(200).json({ 
      reply: reply 
    });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
