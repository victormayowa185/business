import React, { useEffect, useRef } from 'react';

interface HeroTriggerProps {
  pageName?: string;
  position: 'top' | 'bottom';  // ← required
}

const HeroTrigger: React.FC<HeroTriggerProps> = ({ pageName = 'page', position }) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        window.dispatchEvent(
          new CustomEvent('hero-visibility', {
            detail: { isVisible, page: pageName, position },
          })
        );
      },
      { threshold: 0 }
    );

    observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, [pageName, position]);

  return <div ref={triggerRef} style={{ height: '1px', visibility: 'hidden' }} />;
};

export default HeroTrigger;