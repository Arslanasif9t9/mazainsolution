import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { sendChatMessage, clearChatSession } from '../../api/chatClient';

const MAX_LENGTH = 1000;

// One sessionId per browser tab, generated on first load of this component
const sessionId = crypto.randomUUID();

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, open]);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setText('');
    setIsLoading(true);
    setError('');

    try {
      const reply = await sendChatMessage(sessionId, trimmed);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply, timestamp: new Date().toISOString() }]);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = async () => {
    try {
      await clearChatSession(sessionId);
      setMessages([]);
    } catch {
      setError('Failed to clear the conversation. Please try again.');
    }
  };

  return (
    <>
      {/* Floating toggle button — sits above the WhatsApp button (bottom-5) with a gap */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg flex items-center justify-center transition duration-300 animate-bounce"
        aria-label="Open Mazain AI Assistant"
      >
        <i className={`fas ${open ? 'fa-xmark' : 'fa-robot'} text-white text-xl`}></i>
      </button>

      {/* Chat panel — opens above both floating buttons */}
      {open && (
        <div className="fixed bottom-40 right-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-dark-gradient text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Mazain AI Assistant</p>
                <p className="text-[11px] text-purple-300 leading-tight">Ask us anything</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  title="Clear chat"
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition"
                >
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition"
              >
                <i className="fas fa-xmark text-sm"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 scrolling-container">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-10 px-4">
                <i className="fas fa-comments text-2xl mb-2 text-purple-300"></i>
                <p>Hi! Ask me about our services, courses, or anything Mazain Solution related.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {error && (
            <div className="px-3 py-2 bg-red-50 text-red-600 text-xs border-t border-red-100">{error}</div>
          )}

          {/* Input */}
          <div className="border-t border-gray-100 p-3 shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Message Mazain AI Assistant..."
                className="flex-1 resize-none max-h-24 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !text.trim()}
                className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition disabled:opacity-40 shrink-0"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
            <p className="text-right text-[11px] text-gray-400 mt-1">{text.length}/{MAX_LENGTH}</p>
          </div>
        </div>
      )}
    </>
  );
}