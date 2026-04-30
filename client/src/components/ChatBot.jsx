import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! I am the Travesia AI Assistant. How can I make your stay perfect today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      const history = messages.slice(1).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await axios.post(`${apiUrl}/api/chat`, {
        message: userMessage.text,
        history: history
      });

      setMessages((prev) => [...prev, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
            className="w-[360px] h-[520px] mb-4 flex flex-col overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-white/40 bg-white/70 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center shrink-0">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm mix-blend-overlay"></div>
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
                  <span className="text-xl">✨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[1.05rem] tracking-tight leading-tight">Travesia Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-blue-100/90 font-medium tracking-wide">Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="relative w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white/90 hover:text-white transition-all backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] text-white shrink-0 mt-auto mr-2 shadow-sm">
                      ✨
                    </div>
                  )}
                  <div 
                    className={`max-w-[82%] px-4 py-3 text-[0.925rem] leading-[1.4] shadow-sm transition-all ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-sm' 
                        : 'bg-white/80 text-gray-800 border border-white/50 backdrop-blur-md rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-end">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] text-white shrink-0 mr-2 shadow-sm">
                    ✨
                  </div>
                  <div className="bg-white/80 border border-white/50 backdrop-blur-md px-4 py-3.5 rounded-2xl rounded-bl-sm flex gap-1.5 shadow-sm items-center">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 backdrop-blur-md border-t border-white/40 shrink-0">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-5 pr-14 py-3.5 bg-white/70 border border-white shadow-sm focus:border-indigo-300 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-[0.95rem] transition-all placeholder:text-gray-400 text-gray-700"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-[60px] h-[60px] rounded-[1.25rem] shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all duration-300 z-50 border border-white/20 backdrop-blur-md ${
          isOpen 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white rotate-90 rounded-full' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
        }`}
      >
        <div className="absolute inset-0 rounded-inherit bg-white/10 opacity-0 hover:opacity-100 transition-opacity mix-blend-overlay"></div>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
