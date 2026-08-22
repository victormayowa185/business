import React, { useEffect, useRef } from 'react';

interface HeroTriggerProps {
  pageName?: string;
}

const HeroTrigger: React.FC<HeroTriggerProps> = ({ pageName = 'page' }) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dispatch custom event with visibility info
        window.dispatchEvent(
          new CustomEvent('hero-visibility', {
            detail: { isVisible: entry.isIntersecting, page: pageName },
          })
        );
      },
      {
        threshold: 0, // Trigger immediately when it enters/leaves viewport
      }
    );

    observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [pageName]);

  return <div ref={triggerRef} style={{ height: '1px', visibility: 'hidden' }} />;
};

export default HeroTrigger;