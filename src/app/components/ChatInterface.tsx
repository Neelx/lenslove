'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, X, Heart, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your AI Love Advisor 💕 I'm here to help you with relationship advice, analyze conversations, or answer any questions about love and dating. What would you like to talk about today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      image: uploadedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setUploadedImage(null);
    setIsLoading(true);

    try {
      // Call your API endpoint that interfaces with Gemini
      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          image: uploadedImage,
          history: messages
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback response for demo
      const demoResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand you want relationship advice. While I'm connecting to my full capabilities, I can still offer general guidance. What specific aspect of relationships would you like to explore? 💝",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, demoResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-4xl h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff1744] to-[#ff6b9d] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">AI Love Advisor</h2>
                    <p className="text-sm opacity-90">Your personal relationship guide</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-pink-50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-[#ff1744] to-[#ff6b9d] text-white'
                          : 'bg-white shadow-md border border-pink-100'
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Uploaded"
                          className="max-w-full h-auto rounded-lg mb-2"
                        />
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'} text-gray-500`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mr-3 order-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-md border border-pink-100 p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin text-pink-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              {uploadedImage && (
                <div className="mb-3 relative inline-block">
                  <img
                    src={uploadedImage}
                    alt="To upload"
                    className="h-20 w-auto rounded-lg border border-pink-200"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex items-end gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Upload image"
                >
                  <Upload className="w-5 h-5 text-gray-600" />
                </button>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about love and relationships..."
                  className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors min-h-[50px] max-h-[150px]"
                  rows={1}
                />
                <button
                  onClick={sendMessage}
                  disabled={(!inputText.trim() && !uploadedImage) || isLoading}
                  className="p-3 bg-gradient-to-r from-[#ff1744] to-[#ff6b9d] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}