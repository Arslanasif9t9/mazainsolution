import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatCodeBlock from './ChatCodeBlock';

function formatTimestamp(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatMessage({ role, content, timestamp }) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
          <i className="fas fa-robot text-sm"></i>
        </div>
      )}

      <div className={`max-w-[75%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2.5 text-sm ${
            isUser
              ? 'bg-purple-600 text-white rounded-2xl rounded-br-md'
              : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose-chat">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeText = String(children).replace(/\n$/, '');

                    if (inline) {
                      return (
                        <code className="bg-black/5 px-1.5 py-0.5 rounded text-[0.85em]">
                          {children}
                        </code>
                      );
                    }
                    return <ChatCodeBlock language={match?.[1]} code={codeText} />;
                  },
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="pl-5 mb-2 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="pl-5 mb-2 list-decimal">{children}</ol>,
                  a: ({ children, href }) => (
                    <a href={href} target="_blank" rel="noreferrer" className="text-purple-600 underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1 px-1">
          {timestamp && <span className="text-[11px] text-gray-400">{formatTimestamp(timestamp)}</span>}
          {!isUser && (
            <button onClick={handleCopyMessage} className="text-gray-400 hover:text-purple-600 transition text-[11px]">
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center shrink-0">
          <i className="fas fa-user text-sm"></i>
        </div>
      )}
    </div>
  );
}