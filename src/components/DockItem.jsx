import { useRef, useEffect, useState } from 'react';

export default function DockItem({ name, icon, onClick, mouseX, dockRef }) {
  const itemRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    scale: 1,
    translateY: 0,
    marginInline: 0,
  });

  const sigma = 50;
  const maxLift = -10;         // Reduced lift for smaller size
  const baseGap = 12;          // Match with Dock gap-x-3 or similar
  const baseScale = 1;
  const scaleMultiplier = 0.6; // Reduced scale factor for small icons

  useEffect(() => {
    if (!itemRef.current || !dockRef.current || mouseX === null) {
      setTransformStyle({ scale: baseScale, translateY: 0, marginInline: baseGap / 2 });
      return;
    }

    const dockRect = dockRef.current.getBoundingClientRect();
    const itemRect = itemRef.current.getBoundingClientRect();
    const itemCenter = itemRect.left - dockRect.left + itemRect.width / 2;

    const distance = mouseX - itemCenter;

    const gaussian = Math.exp(-(distance * distance) / (2 * sigma * sigma));
    const scale = baseScale + gaussian * scaleMultiplier;
    const translateY = maxLift * gaussian;
    const marginInline = (scale - baseScale) * 20; // adjust spread with icon size

    setTransformStyle({
      scale,
      translateY,
      marginInline,
    });
  }, [mouseX, dockRef]);

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      style={{
        transform: `translateY(${transformStyle.translateY}px) scale(${transformStyle.scale})`,
        transformOrigin: 'bottom center',
        marginLeft: `${transformStyle.marginInline}px`,
        marginRight: `${transformStyle.marginInline}px`,
        transition: 'transform 0.2s ease, margin 0.2s ease',
      }}
      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
    >
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain pointer-events-none"
      />
    </button>
  );
}
