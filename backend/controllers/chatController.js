import { generateChatResponse } from '../services/chatService.js';

export const sendMessage = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid prompt' });
    }

    const aiText = await generateChatResponse(prompt);
    return res.json({ response: aiText });
  } catch (error) {
    console.error('Chat error:', error.message);
    switch (error.message) {
      case 'RATE_LIMITED':
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      case 'MODEL_OVERLOADED':
        return res.status(503).json({ error: 'AI model is currently overloaded. Try again shortly.' });
      case 'INVALID_API_KEY':
        return res.status(500).json({ error: 'Server configuration error (API key).' });
      default:
        return res.status(500).json({ error: 'Failed to get AI response.' });
    }
  }
};