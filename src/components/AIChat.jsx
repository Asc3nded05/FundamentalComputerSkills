import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '../api/useChat';
import { useLessons } from '../api/useLessons';
import { useLessonCompletionContext } from '../components/LessonCompletionContext.jsx';


function AIChat({ lessonId, steps, completedSteps, stepInstructions, nextStep, messages, setMessages }) {
  const [userInput, setUserInput] = useState('');
  const [placeholder, setPlaceholder] = useState("Type a question here, like 'How do I open File Explorer?'");

  const { sendMessage, loading, error } = useChat();
  const { response, loading: lessonsLoading, error: lessonsError } = useLessons();
  const { completedLessons } = useLessonCompletionContext();

  const buildPrompt = (userMessage) => {
    const stepTexts = steps ? steps.map(s => s.text).join('\n') : '';
    let lessonContext = `You are an AI assistant helping a user learn computer skills in a website that contains a simulated desktop environment similar to Windows 11. The desktop, taskbar, and start menu have app icons for: File Explorer, Notepad, Settings, and Task Manager. Not every functionality is the same as Windows 11, but they are similar. The instructions, lesson selection, and AI chat are in a sidebar to the right of the simulated desktop. The Main instruction tab also has a button to display extra hints for the current step and a button with a volume icon to toggle read-aloud for the current step.

The list of lessons is as follows: 
${response?.length > 0
    ? response.map(l => {
        const completed = completedLessons[l.lessonId]?.completed || false;
        return `- ${l.lessonName} (${completed ? 'Completed' : 'Not Completed'})`;
      }).join('\n')
    : 'No lessons data available.'
}`;

    // Only add step-specific instructions if a lesson has started
    if (stepInstructions && stepInstructions !== 'Press Start Lesson to Begin') {
      lessonContext += `
The user is currently in the following lesson: 
${stepTexts ? stepTexts : 'No lesson started.'}

Current step: 
"${stepInstructions}"

Action to perform next: "${nextStep}"`;
    }

    lessonContext += '\n\nAnswer the user\'s question clearly and helpfully, focusing on the current lesson context. You can use markdown to highlight key words.';

    // Build conversation history for context (previous messages)
    const history = messages
      .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`)
      .join('\n');

    // console.log('Lesson context for AI:', lessonContext);

    // Full prompt = system + history + latest user query
    return `${lessonContext}\n\nConversation history:\n${history}\nUser: ${userMessage}\nAI:`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setPlaceholder("Type a question here...");

    const newUserMessage = { role: 'user', text: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const fullPrompt = buildPrompt(userInput);
      // console.log('AI prompt:', fullPrompt);
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
            <strong className="speaker-tag">{msg.role === 'user' ? 'You:' : 'AI:'}</strong>{' '}
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="chat-message ai-message"><em>Thinking…</em></div>}
      </div>
      <div className="chat-input-area">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
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