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
  styles/
    home.css
    navbar.css
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

<file path="src/components/Navbar.tsx">
// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
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

    // ✅ FIX: Entrance animation – plays automatically on mount
    useEffect(() => {
        // Only run once
        if (hasPlayedEntrance.current || !navInnerRef.current) return;
        hasPlayedEntrance.current = true;

        // Set initial state off-screen (just in case)
        gsap.set(navInnerRef.current, { y: '-120%', opacity: 0 });

        // Animate in after a tiny delay (ensures everything is ready)
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
            <nav className="navbar" ref={navRef}>
                <div className="navbar-inner" ref={navInnerRef}>
                    {/* ─── LEFT: Logo ─── */}
                    <div className="navbar-brand">
                        <div className="brand-logo-wrapper">
                            {/* 👇 REPLACE "logo.png" WITH YOUR ACTUAL FILENAME */}
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

const UNITS_PER_EM = 1000;
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 5460;

interface LetterGlyph {
    ch: string;
    d: string;
    x: number;
    w: number;
}

const LETTERS: LetterGlyph[] = [
    { ch: "A", d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z", x: 0, w: 790 },
    { ch: "D", d: "M74 -4V736H352Q451 736 525.5 708.0Q600 680 650.0 630.5Q700 581 725.0 516.0Q750 451 750 378V356Q750 289 725.0 224.5Q700 160 650.0 111.5Q600 63 525.5 31.5Q451 0 352 0H74ZM246 152H344Q409 152 458.0 178.5Q507 205 535.5 253.0Q564 301 564 366V370Q564 435 535.5 483.0Q507 531 458.0 557.5Q409 584 344 584H246Z", x: 790, w: 778 },
    { ch: "E", d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z", x: 1568, w: 592 },
    { ch: "S", d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q393 134 424.5 155.5Q456 177 456 212Q456 240 436.5 257.5Q417 275 380 285L262 316Q170 340 116.0 393.0Q62 446 62 522Q62 585 94.5 630.0Q127 675 186.5 698.5Q246 722 322 722Q404 722 464.0 696.5Q524 671 557.0 623.5Q590 576 592 511H412Q412 545 384.5 566.5Q357 588 304 588Q253 588 224.5 568.5Q196 549 196 517Q196 491 214.5 475.0Q233 459 268 449L385 418Q483 392 536.5 337.0Q590 282 590 205Q590 141 555.5 96.0Q521 51 460.5 26.5Q400 2 322 -20Q328 -20 334 -20Z", x: 2160, w: 659 },
    { ch: "U", d: "M386 -20Q281 -20 208.5 19.0Q136 58 98.0 129.5Q60 201 60 299V730H246V295Q246 230 269.0 190.5Q292 151 331.5 133.5Q371 116 421 116Q471 116 510.5 133.5Q550 151 573.0 190.5Q596 230 596 295V730H782V299Q782 201 743.5 129.5Q705 58 632.5 19.0Q560 -20 455 -20Q420 -20 386 -20Z", x: 2819, w: 771 },
    { ch: "W", d: "M192 0 18 730H210L336 148H360L455 704H638L749 148H773L882 730H1062L909 0H626L545 458H507L426 0Z", x: 3590, w: 1080 },
    { ch: "A", d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z", x: 4670, w: 790 },
];

const AdesuwaHero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const markRef = useRef<SVGSVGElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!heroRef.current || !svgRef.current || !markRef.current) return;

        const ctx = gsap.context(() => {
            const letterPaths = gsap.utils.toArray<SVGPathElement>(
                svgRef.current!.querySelectorAll(".adesuwa-letter")
            );
            const markPath = markRef.current!.querySelector<SVGCircleElement>(
                ".adesuwa-mark-circle"
            );
            const markLetters = gsap.utils.toArray<SVGPathElement>(
                markRef.current!.querySelectorAll(".adesuwa-mark-letter")
            );

            const order = letterPaths.map((_, i) => i);
            gsap.utils.shuffle(order);

            const buildTimeline = () => {
                const tl = gsap.timeline({ paused: true });

                tl.set(letterPaths, { drawSVG: "0%", opacity: 1 });
                tl.set(heroRef.current!.querySelector(".adesuwa-eyebrow"), {
                    autoAlpha: 0,
                    y: 14,
                });
                tl.set(heroRef.current!.querySelector(".adesuwa-card"), {
                    autoAlpha: 0,
                    y: 14,
                    scale: 0.94,
                });
                if (markPath) tl.set(markPath, { drawSVG: "0%" });
                tl.set(markLetters, { drawSVG: "0%" });

                tl.to(
                    heroRef.current!.querySelector(".adesuwa-eyebrow"),
                    { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
                    0.1
                );
                tl.to(
                    heroRef.current!.querySelector(".adesuwa-card"),
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

    return (
        <section className="adesuwa-hero" ref={heroRef}>
            <div className="adesuwa-hero__bg" />
            <div className="adesuwa-hero__scrim" />

            <div className="adesuwa-hero__top">
                <div className="adesuwa-eyebrow">
                    <span className="eyebrow-number">01</span>
                    <strong className="eyebrow-text">
                        Adesuwa Rhodes is changing the face of investing and
                        entrepreneurship in Africa, one investment at a time.
                    </strong>
                </div>
            </div>

            <Link to="/about" className="adesuwa-card">
                <div className="adesuwa-card__head">
                    <img src="/logo1.png" alt="Adesuwa Rhodes" className="adesuwa-card__logo" />
                    <WiStars className="adesuwa-card__star" />
                </div>
                <div className="adesuwa-card__image">
                    <img src="/images/hero1.png" alt="Adesuwa Rhodes at work" />
                </div>
                <div className="adesuwa-card__label">About</div>
            </Link>

            <div className="adesuwa-hero__wordmark">
                <svg
                    ref={svgRef}
                    className="adesuwa-svg"
                    viewBox={`0 -40 ${TOTAL_WIDTH} ${CAP_HEIGHT}`}
                    preserveAspectRatio="xMidYMax meet"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g transform={`translate(0, ${CAP_HEIGHT - 40}) scale(1, -1)`}>
                        {LETTERS.map((letter, i) => (
                            <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                                <path
                                    className="adesuwa-letter"
                                    d={letter.d}
                                    fillRule="evenodd"
                                />
                            </g>
                        ))}
                    </g>
                </svg>

                <svg
                    ref={markRef}
                    className="adesuwa-mark"
                    viewBox="0 0 120 120"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle
                        className="adesuwa-mark-circle"
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                    />
                    <path
                        className="adesuwa-mark-letter"
                        d="M42 34V86M42 34H62Q74 34 74 47Q74 60 62 60H42M62 60L78 86"
                        fill="none"
                    />
                </svg>
            </div>
        </section>
    );
};

export default AdesuwaHero;
</file>

<file path="src/styles/home.css">
/* ===========================================================
   ADESUWA HERO — plain CSS
   Font: Sora (self-hosted, closest open-source match to
   Google Sans). Drop the Sora .woff2 files in /public/fonts/.
   =========================================================== */

.adesuwa-hero {
  position: relative;
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

.adesuwa-hero__bg {
  position: absolute;
  inset: 0;
  background-image: url("/images/hero-pic.png");
  background-size: cover;
  background-position: center 22%;
  z-index: 0;
}

.adesuwa-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 12, 0.55) 0%,
    rgba(10, 10, 12, 0.35) 35%,
    rgba(10, 10, 12, 0.75) 100%
  );
  z-index: 1;
}

/* ---------- Top-left copy block ---------- */
.adesuwa-hero__top {
  position: absolute;
  top: 20%;
  left: 3%;
  max-width: 340px;
  z-index: 2;
}

.adesuwa-eyebrow {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0;
}

.eyebrow-number {
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

.eyebrow-text {
  font-weight: 400;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
}

/* ---------- Glass card, top right (replaces the old pill) ----------
   Same glass recipe as .nav-center-glass in navbar.css, reused here
   for visual consistency across the page. */
.adesuwa-card {
  position: absolute;
  top: 20%;
  right: 48px;
  z-index: 3;
  width: 200px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #ffffff;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 9px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  padding: 10px;
  gap: 8px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.adesuwa-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 8px 26px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.adesuwa-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
}

.adesuwa-card__logo {
  height: 38px;
  width: auto;
  display: block;
}

.adesuwa-card__star {
  font-size: 36px;
  color: rgba(255, 255, 255, 0.85);
}

.adesuwa-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
}

.adesuwa-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.adesuwa-card__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  text-align: left;
  padding: 2px 0 2px;
  color: rgba(255, 255, 255, 0.92);
}

/* ---------- Wordmark ---------- */
.adesuwa-hero__wordmark {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0 32px 40px 32px;
  box-sizing: border-box;
}

.adesuwa-svg {
  width: 100%;
  height: auto;
  max-height: 42vh;
  display: block;
}

.adesuwa-letter {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.5;
  vector-effect: non-scaling-stroke;
}

.adesuwa-mark {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  margin-left: 12px;
  margin-bottom: 6px;
}

.adesuwa-mark-circle,
.adesuwa-mark-letter {
  stroke: #ffffff;
  stroke-width: 3;
  vector-effect: non-scaling-stroke;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .adesuwa-hero__top {
    top: 88px;
    left: 24px;
    max-width: 260px;
  }

  .eyebrow-text {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .adesuwa-card {
    top: auto;
    bottom: 320px;
    right: 24px;
    width: 104px;
    padding: 8px;
  }

  .adesuwa-card__logo {
    height: 14px;
  }

  .adesuwa-card__star {
    font-size: 13px;
  }

  .adesuwa-card__label {
    font-size: 10px;
  }

  .adesuwa-hero__wordmark {
    padding: 0 16px 28px 16px;
  }

  .adesuwa-svg {
    max-height: 30vh;
  }

  .adesuwa-mark {
    width: 40px;
    height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .adesuwa-card {
    transition: none;
  }
}
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
  color: rgba(0, 0, 0, 0.70);                /* ← dark but slightly muted */
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
  color: rgba(0, 0, 0, 0.75);
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
  color: #000;
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

<file path="src/App.tsx">
// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';   // ← make sure you have this file (or change to index.css)

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Home />
    </BrowserRouter>
  );
}

export default App;
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

</files>
