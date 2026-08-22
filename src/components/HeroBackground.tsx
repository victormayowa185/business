// src/components/HeroBackground.tsx
import React, { useEffect, useState } from 'react';
import '../styles/hero-background.css';

interface HeroBackgroundProps {
  src: string;
  breathe?: boolean; // enable the subtle continuous zoom animation
  focalPosition?: string; // e.g. "center 22%" — matches your per-page background-position tweaks
}

/**
 * Reusable hero background used across every page (Home, About,
 * Investments, Videos, News, Contact).
 *
 * On slow connections, the real photo can take a while to download —
 * until now that left a blank/white gap behind the white hero text.
 * This shows a dark, frosted "glass" placeholder immediately (zero
 * network dependency), then blur-fades the real photo in on top once
 * it's actually loaded. Text stays readable the entire time either way.
 */
const HeroBackground: React.FC<HeroBackgroundProps> = ({
  src,
  breathe = true,
  focalPosition = 'center',
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;

    // Handle the case where the browser has already cached the image
    // (e.g. navigating back to a page) — .complete is true instantly,
    // so the 'load' event would never fire again.
    if (img.complete) {
      setLoaded(true);
      return;
    }

    img.onload = () => setLoaded(true);

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className="hero-bg">
      {/* Always-present dark glass placeholder — instant, no network */}
      <div className="hero-bg__placeholder" />

      {/* Real photo — blur-fades in once fully loaded */}
      <div
        className={`hero-bg__photo ${loaded ? 'hero-bg__photo--loaded' : ''} ${
          breathe ? 'hero-bg__photo--breathe' : ''
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: focalPosition,
        }}
      />
    </div>
  );
};

export default HeroBackground;