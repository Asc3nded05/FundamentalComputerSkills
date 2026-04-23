import { generateChatResponse } from '../services/chatService.js';

export const sendMessage = async (req, res) => {
  try {
    const { messages, userInput, stepTexts, stepInstructions, nextStep } = req.body;

    if (!userInput || typeof userInput !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid userInput' });
    }

    const aiText = await generateChatResponse({
      messages: messages || [],
      userInput,
      stepTexts: stepTexts || [],
      stepInstructions: stepInstructions || '',
      nextStep: nextStep || '',
    });

    return res.json({ response: aiText });
  } catch (error) {
    console.error('Chat error:', error.message);
    const message = error.message;

    switch (message) {
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