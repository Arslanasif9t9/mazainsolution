import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatCodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-2 rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-1.5 right-1.5 text-xs px-2 py-1 rounded-md bg-white/10 text-gray-300 hover:bg-white/20 transition"
      >
        {copied ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
      </button>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: 8, fontSize: 13 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}