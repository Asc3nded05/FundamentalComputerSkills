import { GoogleGenerativeAI } from '@google/generative-ai';

let model;

function getModel() {
  if (!model) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  }
  return model;
}

export async function generateChatResponse(prompt) {
  try {
    const genModel = getModel();
    const result = await genModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    if (error.status === 429) {
      throw new Error('RATE_LIMITED');
    } else if (error.status === 503 || error.message?.includes('overloaded')) {
      throw new Error('MODEL_OVERLOADED');
    } else if (error.message?.includes('API key')) {
      throw new Error('INVALID_API_KEY');
    }
    throw new Error('AI_SERVICE_ERROR');
  }
}