// ContactModal.jsx
export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Let's Connect</h2>
        <p>Email: <a href="mailto:you@example.com" className="text-blue-600">you@example.com</a></p>
        <p className="mt-2">LinkedIn: <a href="#" className="text-blue-600">linkedin.com/in/you</a></p>
      </div>
    </div>
  );
}
