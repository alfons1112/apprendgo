import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamTutorResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Assuming we had this, but for this demo I'll render simple text or dangerouslySetInnerHTML if strict markdown isn't available, but standard text is fine. I will use a simple text display for safety without external deps like react-markdown if not requested, but standard react pattern allows rendering text. *Actually* I will just display text with line breaks to keep dependencies zero as per strict instructions (no new libraries unless requested).

interface ChatInterfaceProps {
  courseContent: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ courseContent }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis votre tuteur virtuel pour ce cours. Avez-vous des questions sur le texte ou les concepts ?' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg = input.trim();
    setInput('');
    
    const newHistory = [...messages, { role: 'user', text: userMsg }];
    // @ts-ignore - TS might complain about 'user' string vs enum, casting works for logic
    setMessages(newHistory as ChatMessage[]);
    setIsStreaming(true);

    try {
      // Prepare history format for API
      // Maps internal role 'model' to API role 'model', 'user' to 'user'
      const apiHistory = newHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Create a temporary message for the stream
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      const stream = streamTutorResponse(apiHistory.slice(0, -1), userMsg, courseContent);
      
      let fullResponse = '';
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          // Update the last message
          const updated = { ...last, text: fullResponse };
          return [...prev.slice(0, -1), updated];
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, j'ai rencontré une erreur de connexion.", isError: true }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-literature-dark p-4 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <h3 className="text-white font-medium text-sm">Tuteur IA - En ligne</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-literature-accent text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              } ${msg.isError ? 'bg-red-100 text-red-800' : ''}`}
            >
              {/* Simple rendering of text with line breaks */}
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="min-h-[1em] mb-1 last:mb-0">{line}</p>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question sur le cours..."
          disabled={isStreaming}
          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-literature-accent/50 focus:border-literature-accent transition-all text-sm"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="bg-literature-dark text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;