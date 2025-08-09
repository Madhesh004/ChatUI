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
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Normalize the input for easier matching
    const normalizedInput = input.trim().toLowerCase();

    let botResponseText;
    if (normalizedInput.includes('what is your name') || normalizedInput.includes('who are you')) {
      botResponseText = 'I am your personal chatbot.';
    } else {
      // Generic response for all other messages
      botResponseText = "Hello How can I help you today?";
    }

    // Simulate a bot response with a delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponseText }]);
      setIsTyping(false);
    }, 1500); // 1.5-second delay for a more realistic feel
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