import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ReadmeModal = ({ isOpen, onClose, content, githubUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 overflow-auto">
      <div className="bg-[#0e0e0e] text-white rounded-xl max-w-4xl w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">README.md</h2>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline break-all mb-4 inline-block"
        >
          🔗 {githubUrl}
        </a>
        <div className="max-h-[70vh] overflow-y-auto mt-2 prose prose-invert prose-pre:bg-transparent prose-code:text-sm prose-code:font-mono">
          <ReactMarkdown
            children={content}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800 p-1 rounded" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadmeModal;
