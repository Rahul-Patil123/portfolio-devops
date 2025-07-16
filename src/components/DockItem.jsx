export default function DockItem({ name, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative group w-24 h-12 sm:w-14 sm:h-14 transition-transform duration-200 hover:scale-65 active:scale-110 flex items-center justify-center"
    >
      {/* Icon */}
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain pointer-events-none"
      />
    </button>
  );
}
