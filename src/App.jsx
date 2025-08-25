import React, { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

// Utility component to display a message with a typewriter effect
const TypewriterMessage = ({ text }) => {
  return (
    <div className="text-white text-base">
      <TypeAnimation
        sequence={[text]}
        wrapper="span"
        speed={60}
        cursor={false}
      />
    </div>
  );
};

// Utility component for the typing indicator
const TypingIndicator = () => {
  return (
    <div className="text-white/70 italic animate-fade-in flex items-center space-x-1">
      <span className="animate-pulse">Bot is typing...</span>
    </div>
  );
};

const App = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Smoothly scrolls to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handles sending a user message
  const handleSend = (text) => {
    const messageText = text !== undefined ? text : input;

    if (!messageText.trim()) return;

    const userMessage = { sender: 'user', text: messageText };
    setMessages((prev) => [...prev, userMessage]);

    if (text === undefined) setInput(''); // clear input only for manual typing

    setIsTyping(true);

    const normalizedInput = messageText.trim().toLowerCase();
    let botResponseText;

    if (normalizedInput.includes('what is your name') || normalizedInput.includes('who are you')) {
      botResponseText = 'I am your personal chatbot.';
    } else if (normalizedInput.includes('help me with tasks')) {
      botResponseText = 'Sure! I can help you manage your tasks.';
    } else if (normalizedInput.includes('show recent messages')) {
      botResponseText = `Here are your last messages:\n${messages.slice(-3).map(m => `${m.sender}: ${m.text}`).join('\n')}`;
    } else {
      botResponseText = "Hello! How can I help you today?";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <div className="text-center py-6 border-b border-white/10 shadow-sm">
        <h1 className="text-3xl font-bold tracking-wide animate-fade-in">
          💬 ChatBot UI
        </h1>
      </div>

      {/* Messages container */}
      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
        {/* Welcome Section */}
        <div className="bg-[#1f1f1f] border border-white/10 rounded-xl p-6 mb-4">
          <h2 className="text-white text-lg font-semibold mb-2">Welcome! 🤖</h2>
          <p className="text-white/70 mb-3">I am your personal assistant. You can ask me things like:</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-1 bg-[#2a2a2a] text-white rounded-md hover:bg-[#333]"
              onClick={() => handleSend('What is your name?')}
            >
              What is your name?
            </button>
            <button
              className="px-3 py-1 bg-[#2a2a2a] text-white rounded-md hover:bg-[#333]"
              onClick={() => handleSend('Help me with tasks')}
            >
              Help me with tasks
            </button>
            <button
              className="px-3 py-1 bg-[#2a2a2a] text-white rounded-md hover:bg-[#333]"
              onClick={() => handleSend('Show recent messages')}
            >
              Show recent messages
            </button>
          </div>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className="animate-slide-up">
            {msg.sender === 'user' ? (
              <div className="ml-auto bg-white text-black max-w-md px-4 py-3 rounded-xl shadow">
                {msg.text}
              </div>
            ) : (
              <TypewriterMessage text={msg.text} />
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="px-6 py-4 border-t border-white/10 bg-[#1a1a1a] flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-md bg-[#2a2a2a] text-white/80 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="px-4 py-2 bg-[#2a2a2a] text-white/80 rounded-md hover:bg-[#333] transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;