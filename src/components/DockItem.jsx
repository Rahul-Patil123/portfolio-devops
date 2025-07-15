export default function DockItem({ name, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative group w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-200 hover:scale-125 active:scale-110 flex items-center justify-center"
    >
      {/* Icon */}
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain pointer-events-none"
      />

      {/* Tooltip (only visible on md+ screens) */}
      <span className="
        hidden md:block
        absolute bottom-full mb-3 px-2 py-1 text-xs font-medium
        bg-gray-900 text-white rounded-md shadow-md
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        whitespace-nowrap
      ">
        {name}

        {/* Tail (v-shape) */}
        <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
      </span>
    </button>
  );
}
