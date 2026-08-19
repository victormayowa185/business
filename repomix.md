This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: repomix.md, node_modules, dist, .git
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
public/
  images/
    hero-pic.png
    hero1.png
  logo.png
  logo1.png
src/
  components/
    Navbar.tsx
  pages/
    Home.tsx
    News.tsx
  styles/
    home.css
    navbar.css
    news.css
  App.css
  App.tsx
  index.css
  main.tsx
.gitignore
eslint.config.js
index.html
package.json
README.md
vite.config.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/pages/News.tsx">
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "../styles/news.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Wordmark Configuration ───
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 6500; // approximate for "IN THE NEWS"

interface LetterGlyph {
  ch: string;
  d: string;
  x: number;
  w: number;
}

// Simple path approximations for each letter (uppercase, sans-serif style)
// These are not perfect but give the drawing effect.
const LETTERS: LetterGlyph[] = [
  // I
  {
    ch: "I",
    d: "M50 0 L50 730",
    x: 0,
    w: 100,
  },
  // N
  {
    ch: "N",
    d: "M50 0 L50 730 L350 0 L350 730",
    x: 100,
    w: 400,
  },
  // space (we'll handle spaces by offset)
  // T
  {
    ch: "T",
    d: "M0 0 L300 0 M150 0 L150 730",
    x: 500,
    w: 300,
  },
  // H
  {
    ch: "H",
    d: "M50 0 L50 730 M350 0 L350 730 M50 365 L350 365",
    x: 800,
    w: 400,
  },
  // E
  {
    ch: "E",
    d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z",
    x: 1200,
    w: 592,
  },
  // space
  // N
  {
    ch: "N",
    d: "M50 0 L50 730 L350 0 L350 730",
    x: 1800,
    w: 400,
  },
  // E
  {
    ch: "E",
    d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z",
    x: 2200,
    w: 592,
  },
  // W
  {
    ch: "W",
    d: "M192 0 18 730H210L336 148H360L455 704H638L749 148H773L882 730H1062L909 0H626L545 458H507L426 0Z",
    x: 2800,
    w: 1080,
  },
  // S
  {
    ch: "S",
    d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q393 134 424.5 155.5Q456 177 456 212Q456 240 436.5 257.5Q417 275 380 285L262 316Q170 340 116.0 393.0Q62 446 62 522Q62 585 94.5 630.0Q127 675 186.5 698.5Q246 722 322 722Q404 722 464.0 696.5Q524 671 557.0 623.5Q590 576 592 511H412Q412 545 384.5 566.5Q357 588 304 588Q253 588 224.5 568.5Q196 549 196 517Q196 491 214.5 475.0Q233 459 268 449L385 418Q483 392 536.5 337.0Q590 282 590 205Q590 141 555.5 96.0Q521 51 460.5 26.5Q400 2 322 -20Q328 -20 334 -20Z",
    x: 3900,
    w: 659,
  },
];

// ─── Sample News Data ───
interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    title: "Adesuwa Rhodes Featured in Forbes",
    date: "March 15, 2025",
    excerpt: "Adesuwa Rhodes shares her journey as a female investor in Africa and the impact of Aruwa Capital Management.",
    image: "/images/hero1.png",
  },
  {
    id: 2,
    title: "Aruwa Capital Management Closes $50M Fund",
    date: "February 28, 2025",
    excerpt: "The fund will focus on investing in women-led businesses across Nigeria and other African markets.",
    image: "/images/hero1.png",
  },
  {
    id: 3,
    title: "Adesuwa Rhodes Wins 'Investor of the Year'",
    date: "January 10, 2025",
    excerpt: "Recognized for her outstanding contribution to the African investment landscape and commitment to gender equality.",
    image: "/images/hero1.png",
  },
  {
    id: 4,
    title: "Panel Discussion: Women in Investing",
    date: "December 5, 2024",
    excerpt: "Adesuwa participated in a panel discussing the challenges and opportunities for women in venture capital.",
    image: "/images/hero1.png",
  },
  {
    id: 5,
    title: "Adesuwa Rhodes Interview with CNN",
    date: "November 20, 2024",
    excerpt: "Adesuwa spoke about the importance of diversity in investment and how she is breaking barriers.",
    image: "/images/hero1.png",
  },
  {
    id: 6,
    title: "Aruwa Capital Management Expands to Kenya",
    date: "October 15, 2024",
    excerpt: "The firm is opening a new office in Nairobi to tap into the East African market.",
    image: "/images/hero1.png",
  },
  {
    id: 7,
    title: "Adesuwa Rhodes Keynote at Africa Tech Summit",
    date: "September 8, 2024",
    excerpt: "She delivered a keynote on the future of fintech and the role of women in driving innovation.",
    image: "/images/hero1.png",
  },
  {
    id: 8,
    title: "Adesuwa Rhodes Named in 100 Most Influential Women",
    date: "August 22, 2024",
    excerpt: "The list recognizes her impact on the African business ecosystem and her advocacy for women.",
    image: "/images/hero1.png",
  },
];

const News: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!heroRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const letterPaths = gsap.utils.toArray<SVGPathElement>(
        svgRef.current!.querySelectorAll(".news-svg__letter")
      );

      const order = letterPaths.map((_, i) => i);
      gsap.utils.shuffle(order);

      const buildTimeline = () => {
        const tl = gsap.timeline({ paused: true });

        tl.set(letterPaths, { drawSVG: "0%", opacity: 1 });

        // Animate letters in shuffled order
        order.forEach((idx, i) => {
          const dur = gsap.utils.random(0.6, 1.0);
          tl.to(
            letterPaths[idx],
            { drawSVG: "100%", duration: dur, ease: "power2.inOut" },
            0.3 + i * 0.2
          );
        });

        return tl;
      };

      timelineRef.current = buildTimeline();
      timelineRef.current.play();

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top 75%",
        onEnter: () => {
          timelineRef.current?.kill();
          timelineRef.current = buildTimeline();
          timelineRef.current.play();
        },
        onEnterBack: () => {
          timelineRef.current?.kill();
          timelineRef.current = buildTimeline();
          timelineRef.current.play();
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — "IN THE NEWS" with drawing effect
      ═══════════════════════════════════════ */}
      <section className="news-hero" ref={heroRef}>
        <div className="news-hero__bg" />
        <div className="news-hero__scrim" />

        <div className="news-hero__wordmark">
          <svg
            ref={svgRef}
            className="news-svg"
            viewBox={`0 -40 ${TOTAL_WIDTH} ${CAP_HEIGHT}`}
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform={`translate(0, ${CAP_HEIGHT - 40}) scale(1, -1)`}>
              {LETTERS.map((letter, i) => (
                <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                  <path
                    className="news-svg__letter"
                    d={letter.d}
                    fillRule="evenodd"
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWS CARDS — Masonry Grid
      ═══════════════════════════════════════ */}
      <section className="news-cards-section">
        <div className="news-cards-container">
          <div className="news-masonry">
            {NEWS_DATA.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="news-card">
                <div className="news-card__image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="news-card__content">
                  <span className="news-card__date">{item.date}</span>
                  <h3 className="news-card__title">{item.title}</h3>
                  <p className="news-card__excerpt">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
</file>

<file path="src/styles/news.css">
/* ===========================================================
   NEWS PAGE — Hero + Masonry Cards
   =========================================================== */

/* ─── Hero ─── */
.news-hero {
  position: relative;
  width: 100%;
  height: 60vh; /* shorter than homepage hero */
  min-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Sora", "Segoe UI", sans-serif;
  color: #ffffff;
  isolation: isolate;
}

.news-hero__bg {
  position: absolute;
  inset: 0;
  background-image: url("/images/hero-pic.png");
  background-size: cover;
  background-position: center 30%;
  z-index: 0;
}

.news-hero__scrim {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 12, 0.55);
  z-index: 1;
}

.news-hero__wordmark {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 1200px;
  padding: 0 20px;
}

.news-svg {
  width: 100%;
  height: auto;
  max-height: 40vh;
  display: block;
}

.news-svg__letter {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.5;
  vector-effect: non-scaling-stroke;
}

/* ─── News Cards Section ─── */
.news-cards-section {
  background: #ffffff;
  padding: 60px 5% 100px;
}

.news-cards-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Masonry layout using CSS columns */
.news-masonry {
  column-count: 3;
  column-gap: 24px;
  padding: 0;
}

.news-card {
  break-inside: avoid;
  margin-bottom: 24px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.10);
}

.news-card__image {
  width: 100%;
  overflow: hidden;
  background: #f5f5f7;
}

.news-card__image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover .news-card__image img {
  transform: scale(1.03);
}

.news-card__content {
  padding: 16px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-card__date {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(0, 0, 50, 0.5);
  margin-bottom: 8px;
}

.news-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000032;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.news-card__excerpt {
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(0, 0, 50, 0.7);
  margin: 0;
}

/* ─── Responsive ─── */
@media (max-width: 1100px) {
  .news-masonry {
    column-count: 2;
    column-gap: 20px;
  }
}

@media (max-width: 720px) {
  .news-hero {
    height: 40vh;
    min-height: 280px;
  }

  .news-svg {
    max-height: 25vh;
  }

  .news-masonry {
    column-count: 1;
    column-gap: 0;
  }

  .news-card {
    margin-bottom: 20px;
  }

  .news-cards-section {
    padding: 40px 4% 60px;
  }
}

@media (max-width: 480px) {
  .news-hero {
    height: 30vh;
    min-height: 200px;
  }

  .news-svg {
    max-height: 18vh;
  }

  .news-card__title {
    font-size: 1rem;
  }
}

/* ─── Reduce Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .news-card {
    transition: none;
  }
  .news-card:hover {
    transform: none;
  }
  .news-card:hover .news-card__image img {
    transform: none;
  }
}
</file>

<file path="src/App.css">
/* Reset & body – white background for a clean design */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Google Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Optional subtle background effect – now light and barely visible */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(200, 200, 255, 0.1), transparent 60%),
              radial-gradient(circle at 80% 50%, rgba(255, 200, 240, 0.1), transparent 60%);
  pointer-events: none;
  z-index: 0;
}

#root {
  width: 100%;
  position: relative;
  z-index: 1;
}
</file>

<file path="src/index.css">

</file>

<file path="src/main.tsx">
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // or './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
</file>

<file path="eslint.config.js">
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
</file>

<file path="index.html">
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- ⬇️ ADD THIS FONT LINK ⬇️ -->
    <link
      href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
      rel="stylesheet"
    />
    
    <title>adesuwa</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</file>

<file path="package.json">
{
  "name": "adesuwa",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.15.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-icons": "^5.7.0",
    "react-router-dom": "^7.18.2"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "eslint": "^10.8.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "vite": "^8.2.0"
  }
}
</file>

<file path="vite.config.js">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
</file>

<file path="src/components/Navbar.tsx">
// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false); // 👈 NEW STATE
    const navRef = useRef<HTMLDivElement>(null);
    const navInnerRef = useRef<HTMLDivElement>(null);
    const isHiddenRef = useRef(false);
    const hasPlayedEntrance = useRef(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    // Click outside to close
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // Hide/show navbar on scroll (via custom event)
    useEffect(() => {
        const handleVisibility = (e: Event) => {
            const { hidden } = (e as CustomEvent).detail;
            if (hidden === isHiddenRef.current) return;
            isHiddenRef.current = hidden;
            gsap.to(navRef.current, {
                y: hidden ? '-130%' : '0%',
                opacity: hidden ? 0 : 1,
                duration: 0.35,
                ease: 'power2.out',
            });
        };
        window.addEventListener('navbar-visibility', handleVisibility);
        return () => window.removeEventListener('navbar-visibility', handleVisibility);
    }, []);

    // ─── ✨ NEW: Scroll listener for text color change ───
    useEffect(() => {
        const handleScroll = () => {
            // Hero is 100vh, so when we scroll past ~80% of viewport height,
            // we switch to dark text. Adjust threshold as needed.
            const scrollY = window.scrollY;
            const threshold = window.innerHeight * 0.8; // 80% of viewport height
            setScrolled(scrollY > threshold);
        };

        // Initial check on mount
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        // Also re-check on resize (viewport height may change)
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Entrance animation – plays automatically on mount
    useEffect(() => {
        if (hasPlayedEntrance.current || !navInnerRef.current) return;
        hasPlayedEntrance.current = true;

        gsap.set(navInnerRef.current, { y: '-120%', opacity: 0 });

        gsap.to(navInnerRef.current, {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
        });
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} ref={navRef}>
                <div className="navbar-inner" ref={navInnerRef}>
                    {/* ─── LEFT: Logo ─── */}
                    <div className="navbar-brand">
                        <div className="brand-logo-wrapper">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="brand-logo-img"
                            />
                        </div>
                    </div>

                    {/* ─── CENTER: Glassy pill with 4 links ─── */}
                    <div className="nav-center-glass">
                        <NavLink to="/about" className="glass-link">About</NavLink>
                        <NavLink to="/investments" className="glass-link">Investments</NavLink>
                        <NavLink to="/videos" className="glass-link">Videos</NavLink>
                        <NavLink to="/contact" className="glass-link">Contact</NavLink>
                        <NavLink to="/news" className="glass-link">News & Articles</NavLink>
                    </div>

                    {/* ─── RIGHT: News & Articles (outside glass) ─── */}
                    <div className="nav-right-news">
                        {/* If you want a separate link outside the glass, put it here */}
                    </div>

                    {/* ─── Hamburger (mobile) ─── */}
                    <button className="hamburger" onClick={toggleMenu}>
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* ─── Mobile Drawer ─── */}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                    <li><NavLink to="/videos" onClick={closeMenu}>Videos</NavLink></li>
                    <li><NavLink to="/investments" onClick={closeMenu}>Investments</NavLink></li>
                    <li><NavLink to="/news" onClick={closeMenu}>News & Articles</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
                </ul>
            </nav>

            {/* Overlay for mobile menu */}
            {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
        </>
    );
};

export default Navbar;
</file>

<file path="src/pages/Home.tsx">
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Wordmark Configuration ───
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 5460;

interface LetterGlyph {
    ch: string;
    d: string;
    x: number;
    w: number;
}

const LETTERS: LetterGlyph[] = [
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 0,
        w: 790,
    },
    {
        ch: "D",
        d: "M74 -4V736H352Q451 736 525.5 708.0Q600 680 650.0 630.5Q700 581 725.0 516.0Q750 451 750 378V356Q750 289 725.0 224.5Q700 160 650.0 111.5Q600 63 525.5 31.5Q451 0 352 0H74ZM246 152H344Q409 152 458.0 178.5Q507 205 535.5 253.0Q564 301 564 366V370Q564 435 535.5 483.0Q507 531 458.0 557.5Q409 584 344 584H246Z",
        x: 790,
        w: 778,
    },
    {
        ch: "E",
        d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z",
        x: 1568,
        w: 592,
    },
    {
        ch: "S",
        d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q393 134 424.5 155.5Q456 177 456 212Q456 240 436.5 257.5Q417 275 380 285L262 316Q170 340 116.0 393.0Q62 446 62 522Q62 585 94.5 630.0Q127 675 186.5 698.5Q246 722 322 722Q404 722 464.0 696.5Q524 671 557.0 623.5Q590 576 592 511H412Q412 545 384.5 566.5Q357 588 304 588Q253 588 224.5 568.5Q196 549 196 517Q196 491 214.5 475.0Q233 459 268 449L385 418Q483 392 536.5 337.0Q590 282 590 205Q590 141 555.5 96.0Q521 51 460.5 26.5Q400 2 322 -20Q328 -20 334 -20Z",
        x: 2160,
        w: 659,
    },
    {
        ch: "U",
        d: "M386 -20Q281 -20 208.5 19.0Q136 58 98.0 129.5Q60 201 60 299V730H246V295Q246 230 269.0 190.5Q292 151 331.5 133.5Q371 116 421 116Q471 116 510.5 133.5Q550 151 573.0 190.5Q596 230 596 295V730H782V299Q782 201 743.5 129.5Q705 58 632.5 19.0Q560 -20 455 -20Q420 -20 386 -20Z",
        x: 2819,
        w: 771,
    },
    {
        ch: "W",
        d: "M192 0 18 730H210L336 148H360L455 704H638L749 148H773L882 730H1062L909 0H626L545 458H507L426 0Z",
        x: 3590,
        w: 1080,
    },
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 4670,
        w: 790,
    },
];

/**
 * ─── Badge / membership images ───
 * Add new items here as you get more badges — nothing else needs to
 * change. Each item just needs a unique id and its filename inside
 * /public/images/. `size` lets you control the masonry span so logos
 * with different aspect ratios sit naturally in the grid.
 */
interface Badge {
    id: string;
    src: string;
    alt: string;
    size?: "sm" | "md" | "lg";
}

const BADGES: Badge[] = [
    { id: "badge1", src: "/images/badge1.png", alt: "Membership badge 1", size: "md" },
    { id: "badge2", src: "/images/badge2.png", alt: "Membership badge 2", size: "sm" },
    { id: "badge3", src: "/images/badge3.png", alt: "Membership badge 3", size: "lg" },
    // 👉 add more badges here, e.g.:
    // { id: "badge4", src: "/images/badge4.png", alt: "Membership badge 4", size: "sm" },
];

// ─── Home Page ───
const Home: React.FC = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const markRef = useRef<SVGSVGElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const missionRef = useRef<HTMLDivElement | null>(null);
    const missionPhotoRef = useRef<HTMLDivElement | null>(null);
    const missionGapRef = useRef<HTMLDivElement | null>(null);
    const membershipsRef = useRef<HTMLDivElement | null>(null);

    // ─── Hero: drawn wordmark + eyebrow + glass card ───
    useEffect(() => {
        if (!heroRef.current || !svgRef.current || !markRef.current) return;

        const ctx = gsap.context(() => {
            const letterPaths = gsap.utils.toArray<SVGPathElement>(
                svgRef.current!.querySelectorAll(".hero-svg__letter")
            );
            const markPath = markRef.current!.querySelector<SVGCircleElement>(
                ".hero-mark__circle"
            );
            const markLetters = gsap.utils.toArray<SVGPathElement>(
                markRef.current!.querySelectorAll(".hero-mark__letter")
            );

            const order = letterPaths.map((_, i) => i);
            gsap.utils.shuffle(order);

            const buildTimeline = () => {
                const tl = gsap.timeline({ paused: true });

                tl.set(letterPaths, { drawSVG: "0%", opacity: 1 });
                tl.set(heroRef.current!.querySelector(".hero-eyebrow"), {
                    autoAlpha: 0,
                    y: 14,
                });
                tl.set(heroRef.current!.querySelector(".hero-card"), {
                    autoAlpha: 0,
                    y: 14,
                    scale: 0.94,
                });
                if (markPath) tl.set(markPath, { drawSVG: "0%" });
                tl.set(markLetters, { drawSVG: "0%" });

                tl.to(
                    heroRef.current!.querySelector(".hero-eyebrow"),
                    { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
                    0.1
                );
                tl.to(
                    heroRef.current!.querySelector(".hero-card"),
                    { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
                    0.1
                );

                order.forEach((idx, i) => {
                    const dur = gsap.utils.random(0.55, 0.95);
                    tl.to(
                        letterPaths[idx],
                        { drawSVG: "100%", duration: dur, ease: "power2.inOut" },
                        0.5 + i * 0.16
                    );
                });

                const lettersEnd = 0.5 + order.length * 0.16 + 0.4;

                if (markPath) {
                    tl.to(
                        markPath,
                        { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" },
                        lettersEnd
                    );
                }
                markLetters.forEach((el, i) => {
                    tl.to(
                        el,
                        { drawSVG: "100%", duration: 0.45, ease: "power2.inOut" },
                        lettersEnd + 0.15 + i * 0.12
                    );
                });

                return tl;
            };

            timelineRef.current = buildTimeline();
            timelineRef.current.play();

            ScrollTrigger.create({
                trigger: heroRef.current,
                start: "top 75%",
                onEnter: () => {
                    timelineRef.current?.kill();
                    timelineRef.current = buildTimeline();
                    timelineRef.current.play();
                },
                onEnterBack: () => {
                    timelineRef.current?.kill();
                    timelineRef.current = buildTimeline();
                    timelineRef.current.play();
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // ─── Mission: quote fade-in + scroll-triggered instant show/hide of
    //     the background image (strictly scoped to this section, never
    //     touches the hero container) + Memberships masonry ───
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (missionRef.current) {
                const pin = missionRef.current.querySelector(".mission-pin");
                const quoteBlocks = gsap.utils.toArray<HTMLElement>(
                    missionRef.current.querySelectorAll(".mission-quote")
                );

                gsap.set(pin, { autoAlpha: 0, y: 24, scale: 0.9 });
                gsap.set(quoteBlocks, { autoAlpha: 0, y: 28 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: missionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.to(pin, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }).to(
                    quoteBlocks,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.25,
                    },
                    "-=0.35"
                );

                // Instant snap on/off for the background image, tracked to
                // the gap element specifically — not the whole section —
                // so it only appears once the gap is actually on screen,
                // and disappears as soon as the gap scrolls out.
                if (missionPhotoRef.current && missionGapRef.current) {
                    ScrollTrigger.create({
                        trigger: missionGapRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        onEnter: () => missionPhotoRef.current?.classList.add("is-visible"),
                        onLeave: () => missionPhotoRef.current?.classList.remove("is-visible"),
                        onEnterBack: () => missionPhotoRef.current?.classList.add("is-visible"),
                        onLeaveBack: () => missionPhotoRef.current?.classList.remove("is-visible"),
                    });
                }
            }

            if (membershipsRef.current) {
                const heading = membershipsRef.current.querySelector(".memberships-heading");
                const cards = gsap.utils.toArray<HTMLElement>(
                    membershipsRef.current.querySelectorAll(".badge-card")
                );

                gsap.set(heading, { autoAlpha: 0, y: 20 });
                gsap.set(cards, { autoAlpha: 0, y: 30, scale: 0.96 });

                ScrollTrigger.create({
                    trigger: membershipsRef.current,
                    start: "top 75%",
                    onEnter: () => {
                        gsap.to(heading, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power3.out",
                        });
                        gsap.to(cards, {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            stagger: { each: 0.08, from: "start" },
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to([heading, ...cards], { autoAlpha: 0, y: 20, duration: 0.3 });
                    },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-section__bg" />
                <div className="hero-section__scrim" />

                <div className="hero-section__top">
                    <div className="hero-eyebrow">
                        <span className="hero-eyebrow__number">01</span>
                        <strong className="hero-eyebrow__text">
                            Adesuwa Rhodes is changing the face of investing and
                            entrepreneurship in Africa, one investment at a time.
                        </strong>
                    </div>
                </div>

                <Link to="/about" className="hero-card">
                    <div className="hero-card__header">
                        <img src="/logo1.png" alt="Logo" className="hero-card__logo" />
                        <WiStars className="hero-card__icon" />
                    </div>
                    <div className="hero-card__image">
                        <img src="/images/hero1.png" alt="Featured" />
                    </div>
                    <div className="hero-card__label">About</div>
                </Link>

                <div className="hero-section__wordmark">
                    <svg
                        ref={svgRef}
                        className="hero-svg"
                        viewBox={`0 -40 ${TOTAL_WIDTH} ${CAP_HEIGHT}`}
                        preserveAspectRatio="xMidYMax meet"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform={`translate(0, ${CAP_HEIGHT - 40}) scale(1, -1)`}>
                            {LETTERS.map((letter, i) => (
                                <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                                    <path
                                        className="hero-svg__letter"
                                        d={letter.d}
                                        fillRule="evenodd"
                                    />
                                </g>
                            ))}
                        </g>
                    </svg>

                    <svg
                        ref={markRef}
                        className="hero-mark"
                        viewBox="0 0 120 120"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <circle
                            className="hero-mark__circle"
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                        />
                        <path
                            className="hero-mark__letter"
                            d="M42 34V86M42 34H62Q74 34 74 47Q74 60 62 60H42M62 60L78 86"
                            fill="none"
                        />
                    </svg>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          MISSION — image is hidden until this section is
          scrolled into view, then it snaps on instantly as
          the background behind the text. It snaps off again
          once you scroll past the section. It is strictly
          contained inside this section and can never touch
          the hero container above it.
      ═══════════════════════════════════════ */}
            <section className="mission-section" ref={missionRef}>
                <div className="mission-photo-band" ref={missionPhotoRef}>
                    <div className="mission-photo-band__img" />
                </div>

                <div className="mission-panel mission-panel--top">
                    <div className="mission-inner">
                        <div className="mission-row">
                            <img src="/logo1.png" alt="Adesuwa Rhodes" className="mission-pin" />

                            <div className="mission-quote">
                                <p className="mission-quote__text">
                                    I am on a mission to unlock the untapped potential of women as
                                    capital allocators, consumers, founders, board members,
                                    suppliers and across all levels of society, to unlock enhanced
                                    financial returns and positive social impact.
                                </p>
                                <span className="mission-quote__attribution">~ Adesuwa Rhodes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mission-gap" ref={missionGapRef} />776

                <div className="mission-panel mission-panel--bottom">
                    <div className="mission-inner">
                        <div className="mission-quote">
                            <p className="mission-quote__text">
                                I believe the way to effectively provide women with more seats
                                at the table is for us to create our own tables. More women
                                succeeding as capital allocators means more women getting
                                funded, more mentors, more torch-bearers, and more examples to
                                follow. Investing in or with funds like Aruwa Capital
                                Management is a practical way to narrow the gender funding gap
                                and making money while you do so.
                            </p>
                            <span className="mission-quote__attribution">- Adesuwa Rhodes</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          MEMBERSHIPS & PUBLICATIONS
      ═══════════════════════════════════════ */}
            <section className="memberships-section" ref={membershipsRef}>
                <h2 className="memberships-heading">Memberships and Publications</h2>

                <div className="badge-masonry">
                    {BADGES.map((badge) => (
                        <div key={badge.id} className={`badge-card badge-card--${badge.size ?? "md"}`}>
                            <img src={badge.src} alt={badge.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
</file>

<file path="src/styles/navbar.css">
/* ─── Outer Navbar ─── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0.9rem 1rem;
  z-index: 1050;
  pointer-events: none;
}

/* ─── The Pill (main container) – using GRID ─── */
.navbar-inner {
  pointer-events: auto;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  border-radius: 0;
  padding: 0.6rem 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  width: 100%;
  max-width: 1400px;
  transition: all 0.3s ease;
  box-shadow: none;
}

/* ─── LEFT: Logo – aligned to the left edge ─── */
.navbar-brand {
  display: flex;
  align-items: flex-start;
  justify-self: start;
  flex-shrink: 0;
  margin-top: -1.6rem;
}

.brand-logo-img {
  height: 120px;
  width: auto;
  display: block;
}

/* ─── CENTER: TRUE GLASSMORPHISM – perfectly centered ─── */
.nav-center-glass {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.20);     /* ← very transparent */
  backdrop-filter: blur(20px);               /* ← strong blur for glass */
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.40); /* ← bright white border for glass edge */
  border-radius: 9999px;
  padding: 0.3rem 1.8rem;
  justify-self: center;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.06),          /* ← soft outer shadow */
    inset 0 1px 0 rgba(255, 255, 255, 0.6);   /* ← inner highlight for glass shine */
}

.glass-link {
  color: white;                /* ← dark but slightly muted */
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.4rem 0;
  transition: all 0.2s;
  white-space: nowrap;
}
.glass-link:hover {
  color: #000000;
  transform: translateY(-1px);
}
.glass-link.active {
  color: #000;
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
}

/* ─── RIGHT: News & Articles – aligned to the right edge ─── */
.nav-right-news {
  flex-shrink: 0;
  justify-self: end;
}
.news-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  transition: all 0.3s;
  white-space: nowrap;
}
.news-link:hover {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.2);
  color: white;
}

/* ─── Hamburger (hidden on desktop) ─── */
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #000000;
  padding: 0.2rem;
  line-height: 1;
  transition: transform 0.2s;
  touch-action: manipulation;
}
.hamburger:hover {
  transform: scale(1.1);
}

/* ─── Mobile Drawer (hidden on desktop) ─── */
.nav-links {
  display: none;
}

/* ─── 📱 Mobile (≤ 900px) ─── */
@media (max-width: 900px) {
  .navbar {
    padding: 1rem 1rem;
  }
  .navbar-inner {
    display: flex;
    width: 95%;
    padding: 0.5rem 1.2rem;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .nav-center-glass {
    display: none;
  }
  .nav-right-news {
    display: none;
  }

  .hamburger {
    display: block;
    margin-left: auto;
  }

  .nav-links {
    display: flex;
    position: fixed;
    top: 0;
    right: -100%;
    width: min(75%, 280px);
    height: 100vh;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s ease-in-out;
    z-index: 1060;
    padding: 2rem 1.5rem;
    list-style: none;
    margin: 0;
  }
  .nav-links.open {
    right: 0;
  }
  .nav-links li a {
    color: rgba(0, 0, 0, 0.75);
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.6rem 1.5rem;
    border-radius: 40px;
    transition: background 0.2s;
  }
  .nav-links li a:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000;
  }
  .nav-links li a.active {
    background: rgba(0, 0, 0, 0.08);
    color: #000;
  }
}

/* ─── Overlay ─── */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  z-index: 1040;
}

/* ─── Scroll state: text turns dark when past hero ─── */
.navbar-scrolled .glass-link {
  color: #000000; /* black text */
}

.navbar-scrolled .glass-link:hover {
  color: #000000; /* keep black on hover (or a shade) */
}

.navbar-scrolled .glass-link.active {
  color: #000;
  border-bottom-color: rgba(0, 0, 0, 0.5);
}

.navbar-scrolled .news-link {
  color: #000000;
}

.navbar-scrolled .news-link:hover {
  color: #000000;
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.2);
}
</file>

<file path="src/App.tsx">
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import News from './pages/News';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
</file>

<file path="src/styles/home.css">
/* ===========================================================
   HERO SECTION — Professional Template
   Clean, reusable, no branding in class names.
   =========================================================== */

/* ─── Hero Container ─── */
.hero-section {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: "Sora", "Segoe UI", sans-serif;
  color: #ffffff;
  isolation: isolate;
}

/* ─── Background Image ─── */
.hero-section__bg {
  position: absolute;
  inset: 0;
  background-image: url("/images/hero-pic.png");
  background-size: cover;
  background-position: center 22%;
  z-index: 0;
}

.hero-section__scrim {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 12, 0.381);
  /* ← solid dark overlay */
  z-index: 1;
}

/* ─── Top Content Block ─── */
.hero-section__top {
  position: absolute;
  top: 25%;
  left: 3%;
  max-width: 340px;
  z-index: 2;
}

/* ─── Eyebrow / Badge ─── */
.hero-eyebrow {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0;
}

.hero-eyebrow__number {
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.08);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.05em;
  margin-top: 0.1em;
  line-height: 1.4;
}

.hero-eyebrow__text {
  font-weight: 400;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
}

/* ─── Glass Card (Top Right) ─── */
.hero-card {
  position: absolute;
  top: 25%;
  right: 48px;
  z-index: 3;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;
  overflow: hidden;
  background: white;
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid white;
  border-radius: 9px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  padding: 12px;
  gap: 8px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.hero-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 8px 26px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.hero-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
}

.hero-card__logo {
  height: 38px;
  width: auto;
  display: block;
}

.hero-card__icon {
  font-size: 36px;
  color: black;
}

.hero-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 7px;
  overflow: hidden;
}

.hero-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-card__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  text-align: left;
  padding: 2px 0;
  color: black;
}

/* ─── Wordmark / SVG Logo ─── */
.hero-section__wordmark {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0 32px 40px 32px;
  box-sizing: border-box;
}

.hero-svg {
  width: 100%;
  height: auto;
  max-height: 42vh;
  display: block;
}

.hero-svg__letter {
  fill: none;
  stroke: #ffffff;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

/* ─── Registered Mark Badge ─── */
.hero-mark {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  margin-left: 12px;
  margin-bottom: 6px;
}

.hero-mark__circle,
.hero-mark__letter {
  stroke: #ffffff;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

/* ─── Responsive (≤ 900px) ─── */
@media (max-width: 900px) {
  .hero-section__top {
    top: 88px;
    left: 24px;
    max-width: 260px;
  }

  .hero-eyebrow__text {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .hero-card {
    top: auto;
    bottom: 320px;
    right: 24px;
    width: 140px;
    padding: 10px;
  }

  .hero-card__logo {
    height: 28px;
  }

  .hero-card__icon {
    font-size: 24px;
  }

  .hero-card__label {
    font-size: 10px;
  }

  .hero-section__wordmark {
    padding: 0 16px 28px 16px;
  }

  .hero-svg {
    max-height: 30vh;
  }

  .hero-mark {
    width: 40px;
    height: 40px;
  }
}

/* ─── Reduce Motion ─── */
@media (prefers-reduced-motion: reduce) {
  .hero-card {
    transition: none;
  }
}

















.mission-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* keeps the image from ever bleeding outside */
  z-index: 0;
}

.mission-photo-band {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  /* ← only centers vertically now, no horizontal centering needed */
  z-index: -100;
  width: 100%;
  /* ← changed: full screen width */
  height: 70vh;
  /* ← unchanged, matches .mission-gap's height */
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.mission-photo-band.is-visible {
  opacity: 1;
}

.mission-photo-band__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/hero1.png");
  background-size: cover;
  background-position: center 20%;
  /* ← adjust this percentage to move the image up/down */
}

/* ── Panels: normal in-flow black blocks ── */
.mission-panel {
  position: relative;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  background: white;
  color: #fff;
  padding: 80px 8%;
}

/* Gap between panels — where the image shows through once visible */
.mission-gap {
  height: 70vh;
  background: transparent;
}

/* =========================
   CONTENT
   ========================= */

.mission-inner {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mission-row {
  position: relative;
  width: 100%;
}

.mission-quote {
  max-width: 760px;
}

.mission-quote__text {
  margin: 0 0 14px;
  font-family: "Sora", "Segoe UI", sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.55rem);
  line-height: 1.55;
  font-weight: 400;
  color: black;
  text-align: left;
}

.mission-quote__attribution {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.6);
}

/* =========================
   PIN / LOGO
   ========================= */

.mission-pin {
  position: absolute;
  top: 2px;
  left: -16%;
  width: 48px;
  height: 48px;
  object-fit: contain;
}

/* =========================
   MOBILE
   ========================= */

@media (max-width: 720px) {
  .mission-panel {
    padding: 50px 6%;
  }

  .mission-gap {
    height: 45vh;
  }

  .mission-pin {
    position: static;
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
  }

  .mission-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</file>

</files>
