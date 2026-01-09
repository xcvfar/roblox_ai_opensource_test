import OpenAI from 'openai';

// Setup OpenRouter Client
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Reads from Vercel Settings
});

export default async function handler(req, res) {
  // 1. Security: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // 2. Get data from the user/Roblox
    const { message, systemPrompt } = req.body;

    // Check if message exists
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 3. Prepare the "Context Stuffing"
    // We combine the role and message so the AI pays attention.
    const finalSystem = systemPrompt || "You are a helpful assistant.";
    
    const combinedMessage = `
    [INSTRUCTION]: ${finalSystem}
    
    [USER SAYS]: ${message}
    
    [YOUR REPLY]:
    `;

    // 4. Call the AI Model
    const completion = await openai.chat.completions.create({
      // Recommended Roleplay Model: "gryphe/mythomax-l2-13b:free"
      // Current Speed Model: "xiaomi/mimo-v2-flash:free"
      model: "xiaomi/mimo-v2-flash:free", 
      messages: [
        { role: "user", content: combinedMessage }
      ],
      max_tokens: 1000, // Increased to prevent text cropping
    });

    const reply = completion.choices[0].message.content;

    // 5. Send result back
    return res.status(200).json({ 
      reply: reply 
    });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
