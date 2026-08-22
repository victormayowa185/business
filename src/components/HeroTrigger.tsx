// src/components/HeroTrigger.tsx
import React, { useEffect, useRef } from 'react';

interface HeroTriggerProps {
  pageName?: string;
  position: 'top' | 'bottom';
}

const HeroTrigger: React.FC<HeroTriggerProps> = ({ pageName = 'page', position }) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;
    const el = triggerRef.current;

    const dispatch = (isVisible: boolean) => {
      window.dispatchEvent(
        new CustomEvent('hero-visibility', {
          detail: { isVisible, page: pageName, position },
        })
      );
    };

    // ── Fire an immediate, synchronous check on mount ──
    // IntersectionObserver's first callback is async and can land a
    // frame or two late, which is exactly what let the old race
    // condition slip in (a stale/late event overwriting a correct one).
    // Checking getBoundingClientRect() right away gives the Navbar the
    // true initial state instantly, with no flash of the wrong color.
    const rect = el.getBoundingClientRect();
    const initiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    dispatch(initiallyVisible);

    const observer = new IntersectionObserver(
      ([entry]) => dispatch(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [pageName, position]);

  return <div ref={triggerRef} style={{ height: '1px', visibility: 'hidden' }} />;
};

export default HeroTrigger;