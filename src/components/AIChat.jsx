import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown'

function AIChat({steps, completedSteps, stepInstructions, nextStep}) {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const AI = new GoogleGenerativeAI(apiKey);
    const model = AI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const userMessage = { role: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');

        try {
            const prompt = "You are an AI assistant helping a user learn computer skills in a website that contains a simulated desktop environment similar to windows 11. The desktop, taskbar, and start menu have app icons for: " + 
                "File Explorer, Notepad, Settings, and Task Manager. Not every functionality is the same as windows 11, but they are similar. The instructions are in a sidebar to the right of the simulated desktop." +
            "The user is currently in the following lesson: " + 
                steps?.map(step => step.text).join(', ') + ". The current step instructions are: " + 
                stepInstructions + ". The next step is: " + 
                nextStep + ". Answer the user's question based on this context: \"" +
                userInput + "\""
            console.log(prompt);
            const result = await model.generateContent(prompt);
            const aiMessage = { role: 'ai', text: result.response.text() };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error generating AI response:", error);
            const errorMessage = { role: 'ai', text: 'Sorry, I encountered an error.' };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
                        <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong> <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                ))}
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question here..."
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-send-button">Send</button>
            </div>
        </div>
    );
}

export default AIChat;