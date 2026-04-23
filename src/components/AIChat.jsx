import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';

function AIChat({ steps, completedSteps, stepInstructions, nextStep }) {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset chat when the lesson changes (based on steps array identity or length)
  useEffect(() => {
    setMessages([]);
  }, [steps, stepInstructions]); // dependency on lesson-specific data

  // Optional: expose a resetChat function to parent via ref or prop
  // For simplicity, the useEffect above does it automatically.
  // If you need a manual trigger, add a function and maybe call it from outside.

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', text: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setLoading(true);

    try {
      const stepTexts = steps ? steps.map(s => s.text) : [];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.slice(0, -1), // send history without the latest user message
          userInput,
          stepTexts,
          stepInstructions,
          nextStep,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = { role: 'ai', text: data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'ai',
        text: `Error: ${error.message || 'Unknown error'}`,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
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
          <div
            key={index}
            className={`chat-message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong>{' '}
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="chat-message ai-message"><em>Thinking...</em></div>}
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