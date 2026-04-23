import { GoogleGenerativeAI } from '@google/generative-ai';

let model;

// Initialise model once
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

/**
 * Build a system instruction + conversation history + current user prompt
 * and call the Gemini model.
 * @param {Object} params
 * @param {Array}  params.messages       - Previous messages [{ role: 'user'|'ai', text }]
 * @param {String} params.userInput      - Latest user query
 * @param {Array}  params.stepTexts      - steps.map(s => s.text) from lesson
 * @param {String} params.stepInstructions - Current instruction
 * @param {String} params.nextStep       - Next step description
 * @returns {Promise<string>} AI response text
 */
export async function generateChatResponse({
  messages = [],
  userInput,
  stepTexts = [],
  stepInstructions = '',
  nextStep = '',
}) {
  const system = `You are an AI assistant helping a user learn computer skills in a website that contains a simulated desktop environment similar to Windows 11. The desktop, taskbar, and start menu have app icons for: File Explorer, Notepad, Settings, and Task Manager. Not every functionality is the same as Windows 11, but they are similar.

The user is currently in a lesson with the following steps: ${stepTexts.join(', ')}.
The current step instruction: "${stepInstructions}".
The next step is: "${nextStep}".

Answer the user's question clearly and helpfully, focusing on the current lesson context. Provide short, conversational answers.`;

  // Build a prompt that includes previous messages
  const conversation = messages
    .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`)
    .join('\n');

  const fullPrompt = `${system}\n\nConversation history:\n${conversation}\nUser: ${userInput}\nAI:`;

  try {
    const genModel = getModel();
    const result = await genModel.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    // Map known Gemini errors to more descriptive messages
    if (error.status === 429) {
      throw new Error('RATE_LIMITED');
    } else if (error.status === 503 || error.message?.includes('overloaded')) {
      throw new Error('MODEL_OVERLOADED');
    } else if (error.message?.includes('API key')) {
      throw new Error('INVALID_API_KEY');
    }
    // Re-throw for generic handling
    throw new Error('AI_SERVICE_ERROR');
  }
}