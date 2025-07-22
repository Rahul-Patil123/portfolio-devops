import { useRef, useEffect, useState } from 'react';

export default function DockItem({ name, icon, onClick, mouseX, dockRef }) {
  const itemRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    scale: 1,
    translateY: 0,
    marginInline: 0,
  });

  const [isTapped, setIsTapped] = useState(false);

  const sigma = 50;
  const maxLift = -10;
  const baseGap = 12;
  const baseScale = 1;
  const scaleMultiplier = 0.6;

  useEffect(() => {
    if (!itemRef.current || !dockRef.current || mouseX === null) {
      setTransformStyle({
        scale: baseScale,
        translateY: 0,
        marginInline: baseGap / 2,
      });
      return;
    }

    const dockRect = dockRef.current.getBoundingClientRect();
    const itemRect = itemRef.current.getBoundingClientRect();
    const itemCenter = itemRect.left - dockRect.left + itemRect.width / 2;

    const distance = mouseX - itemCenter;

    const gaussian = Math.exp(-(distance * distance) / (2 * sigma * sigma));
    const scale = baseScale + gaussian * scaleMultiplier;
    const translateY = maxLift * gaussian;
    const marginInline = (scale - baseScale) * 20;

    setTransformStyle({
      scale,
      translateY,
      marginInline,
    });
  }, [mouseX, dockRef]);

  const handleClick = () => {
    if (mouseX === null) {
      setIsTapped(true);
      setTransformStyle({
        scale: 1.3,
        translateY: -8,
        marginInline: baseGap / 2,
      });

      setTimeout(() => {
        setTransformStyle({
          scale: 1,
          translateY: 0,
          marginInline: baseGap / 2,
        });
        setIsTapped(false);
      }, 200);
    }

    if (onClick) onClick();
  };

  return (
    <button
      ref={itemRef}
      onClick={handleClick}
      style={{
        transform: `translateY(${transformStyle.translateY}px) scale(${transformStyle.scale})`,
        transformOrigin: 'bottom center',
        marginLeft: `${transformStyle.marginInline}px`,
        marginRight: `${transformStyle.marginInline}px`,
        marginBottom: `${Math.abs(transformStyle.translateY)}px`, // ⬅️ allows upward space
        transition: 'transform 0.2s ease, margin 0.2s ease',
      }}

      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 min-w-10 sm:min-w-12"
    >
      <div className="snap-center">
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </button>
  );
}
