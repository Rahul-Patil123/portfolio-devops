export default function BrandingPanel({ image }) {
  return (
    <aside className="md:w-[30%] bg-white/80 rounded-3xl backdrop-blur-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl min-h-[440px]">
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg mb-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={image}
          alt="Profile"
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3">Hi, I'm You</h1>
      <p className="text-black/90 text-sm md:text-base leading-relaxed px-3">
        A web developer who loves creating beautiful UIs and smooth user experiences.
      </p>
    </aside>
  );
}
