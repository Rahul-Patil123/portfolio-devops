export default function ProjectCard({ title, description, url, image }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#0e0e0e] rounded-2xl shadow-lg hover:scale-[0.9] transition-transform duration-300 w-64 p-4 flex-shrink-0 border border-white/10"
    >
      {image ? (
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy" // ✅ lazy load
          className="w-full h-36 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="w-full h-36 flex items-center justify-center rounded-lg bg-white/10 text-sm text-white/50 mb-3">
          No image available
        </div>
      )}
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </a>
  );
}
