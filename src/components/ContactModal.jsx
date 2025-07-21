import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";


export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-black/80 mb-4 text-center">Let's Connect</h2>

        <div className="flex flex-col space-y-4 items-start">
          <a
            href="mailto:you@example.com"
            className="flex items-center space-x-2 text-red-400 hover:text-red-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="w-5 h-5" />
            <span>you@example.com</span>
          </a>

          <a
            href="https://linkedin.com/in/your-profile"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5" />
            <span>linkedin.com/in/your-profile</span>
          </a>

          <a
            href="https://github.com/your-username"
            className="flex items-center space-x-2 text-black/80 hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5" />
            <span>github.com/your-username</span>
          </a>
        </div>
      </div>
    </div>
  );
}
