import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '../api/useChat';   // adjust the path to your folder

function AIChat({ steps, completedSteps, stepInstructions, nextStep }) {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset chat when the lesson context changes (effectively a resetChat)
  useEffect(() => {
    setMessages([]);
  }, [steps, stepInstructions]);

  const buildPrompt = (userMessage) => {
    const stepTexts = steps ? steps.map(s => s.text).join(', ') : '';
    const lessonContext = `You are an AI assistant helping a user learn computer skills in a website that contains a simulated desktop environment similar to Windows 11. The desktop, taskbar, and start menu have app icons for: File Explorer, Notepad, Settings, and Task Manager. Not every functionality is the same as Windows 11, but they are similar. The instructions are in a sidebar to the right of the simulated desktop.

The user is currently in the following lesson: ${stepTexts}.
Current step instruction: "${stepInstructions}".
Next step will be: "${nextStep}".

Answer the user's question clearly and helpfully, focusing on the current lesson context.`;

    // Build conversation history for context (previous messages)
    const history = messages
      .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`)
      .join('\n');

    // Full prompt = system + history + latest user query
    return `${lessonContext}\n\nConversation history:\n${history}\nUser: ${userMessage}\nAI:`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', text: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const fullPrompt = buildPrompt(userInput);
      const aiText = await sendMessage(fullPrompt);
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      const errMsg = err.message || 'Unknown error';
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${errMsg}` }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
            <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong>{' '}
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="chat-message ai-message"><em>Thinking…</em></div>}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          className="chat-input"
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChat;