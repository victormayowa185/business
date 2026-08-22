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

    // Immediate synchronous check on mount (fixes the initial-load
    // race from before). Using <= / >= here (not < / >) since a
    // 0px-tall element has rect.top === rect.bottom, so the check
    // needs to be inclusive or it can never register as "visible".
    const rect = el.getBoundingClientRect();
    const initiallyVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
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

  return (
    <div
      ref={triggerRef}
      style={{
        // Normal document flow (this is the version that correctly
        // fixed the top/bottom race condition). Height is 0px, not
        // 1px, so it takes up NO layout space at all — no gap,
        // regardless of where in the JSX it sits.
        height: '0px',
        margin: 0,
        padding: 0,
        border: 'none',
        visibility: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
};

export default HeroTrigger;