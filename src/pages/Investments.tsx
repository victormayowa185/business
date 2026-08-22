import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import SkeletonCard from '../components/SkeletonCard';
import { PRELOADER_COMPLETE_EVENT } from "../utils/appEvents";
import HeroTrigger from '../components/HeroTrigger';
import "../styles/investments.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

declare global {
  interface Window {
    __preloaderComplete?: boolean;
  }
}
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 7600;

interface LetterGlyph {
  ch: string;
  d: string;
  x: number;
  w: number;
}

const LETTERS: LetterGlyph[] = [
  { ch: "I", d: "M76 0V730H262V0Z", x: 0, w: 338 },
  { ch: "N", d: "M74 0V730H379L622 148H637V730H811V0H504L261 582H246V0Z", x: 338, w: 885 },
  { ch: "V", d: "M232 0 20 730H212L366 148H400L544 730H730L532 0Z", x: 1223, w: 750 },
  { ch: "E", d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z", x: 1973, w: 592 },
  { ch: "S", d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q392 134 424.5 156.0Q457 178 457 215Q457 247 430.0 264.5Q403 282 339 287L292 291Q179 301 112.0 362.0Q45 423 45 524Q45 631 119.0 691.5Q193 752 317 752Q407 752 469.5 722.0Q532 692 565.0 637.5Q598 583 598 511H418Q418 547 391.5 572.5Q365 598 317 598Q271 598 248.0 577.0Q225 556 225 524Q225 496 244.0 476.0Q263 456 310 452L357 448Q439 441 502.0 412.5Q565 384 601.0 335.0Q637 286 637 215Q637 144 600.5 91.0Q564 38 496.5 9.0Q429 -20 334 -20Z", x: 2565, w: 659 },
  { ch: "T", d: "M220 0V568H20V730H606V568H406V0Z", x: 3224, w: 626 },
  { ch: "M", d: "M74 0V730H332L482 345H502L651 730H914V0H730V548L571 147H402L244 543V0Z", x: 3850, w: 988 },
  { ch: "E", d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z", x: 4838, w: 592 },
  { ch: "N", d: "M74 0V730H379L622 148H637V730H811V0H504L261 582H246V0Z", x: 5430, w: 885 },
  { ch: "T", d: "M220 0V568H20V730H606V568H406V0Z", x: 6315, w: 626 },
  { ch: "S", d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q392 134 424.5 156.0Q457 178 457 215Q457 247 430.0 264.5Q403 282 339 287L292 291Q179 301 112.0 362.0Q45 423 45 524Q45 631 119.0 691.5Q193 752 317 752Q407 752 469.5 722.0Q532 692 565.0 637.5Q598 583 598 511H418Q418 547 391.5 572.5Q365 598 317 598Q271 598 248.0 577.0Q225 556 225 524Q225 496 244.0 476.0Q263 456 310 452L357 448Q439 441 502.0 412.5Q565 384 601.0 335.0Q637 286 637 215Q637 144 600.5 91.0Q564 38 496.5 9.0Q429 -20 334 -20Z", x: 6941, w: 659 },
];

interface Company {
  id: string;
  name: string;
  sector: string;
  description: string;
  url: string;
  logo: string;
  height?: "sm" | "md" | "lg";
}

const FEATURED_COMPANIES: Company[] = [
  {
    id: "company1",
    name: "Polysmart Packaging",
    sector: "Consumer Goods",
    description:
      "Polysmart is a leading integrated plastic recycling and packaging solutions provider in Nigeria.",
    url: "https://www.polysmartgroup.com/",
    logo: "/company/logo1.png",
    height: "md",
  },
  {
    id: "company2",
    name: "Company Two",
    sector: "Healthcare",
    description:
      "Placeholder description — swap in real copy when ready.",
    url: "https://example.com",
    logo: "/company/logo2.png",
    height: "lg",
  },
  {
    id: "company3",
    name: "Company Three",
    sector: "Financial Services",
    description:
      "Placeholder description — swap in real copy when ready.",
    url: "https://example.com",
    logo: "/company/logo3.png",
    height: "sm",
  },
  {
    id: "company4",
    name: "Company Four",
    sector: "Renewable Energy",
    description:
      "Placeholder description — swap in real copy when ready.",
    url: "https://example.com",
    logo: "/company/logo4.png",
    height: "md",
  },
  {
    id: "company5",
    name: "Company Five",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo5.png",
    height: "sm",
  },
  {
    id: "company6",
    name: "Company Six",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo6.png",
    height: "sm",
  },
  {
    id: "company7",
    name: "Company Seven",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo7.png",
    height: "sm",
  },
  {
    id: "company8",
    name: "Company Eight",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo8.png",
    height: "sm",
  },
  {
    id: "company9",
    name: "Company Nine",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo9.png",
    height: "sm",
  },
  {
    id: "company10",
    name: "Company Ten",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo10.png",
    height: "sm",
  },
  {
    id: "company11",
    name: "Company Eleven",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo11.png",
    height: "sm",
  },
  {
    id: "company12",
    name: "Company Twelve",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo12.png",
    height: "sm",
  },
  {
    id: "company13",
    name: "Company Thirteen",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo13.png",
    height: "sm",
  },
  {
    id: "company14",
    name: "Company Fourteen",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo14.png",
    height: "sm",
  },
  {
    id: "company15",
    name: "Company fifteen",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo15.png",
    height: "sm",
  },
  {
    id: "company16",
    name: "Company Sixteen",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo16.png",
    height: "sm",
  },
  {
    id: "company17",
    name: "Company Seventeen",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo17.png",
    height: "sm",
  },
  {
    id: "company18",
    name: "Company Eighteen",
    sector: "Consumer",
    description: "…",
    url: "https://example.com",
    logo: "/company/logo18.png",
    height: "sm",
  },
];

const PRIMARY_SECTORS = [
  "Healthcare",
  "Consumer",
  "Financial Services",
  "Renewable Energy",
];

const Investments: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const companiesRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const letterPaths = gsap.utils.toArray<SVGPathElement>(
        svgRef.current!.querySelectorAll(".investments-svg__letter")
      );

      gsap.set(svgRef.current, { opacity: 0 });

      const order = letterPaths.map((_, i) => i);
      gsap.utils.shuffle(order);

      const buildTimeline = () => {
        const tl = gsap.timeline({ paused: true });

        tl.set(svgRef.current, { opacity: 1 }, 0);
        tl.set(letterPaths, { drawSVG: "0%", opacity: 1 });

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

      const playDraw = () => {
        timelineRef.current = buildTimeline();
        timelineRef.current.play();
      };

      if (window.__preloaderComplete) {
        playDraw();
      } else {
        window.addEventListener(PRELOADER_COMPLETE_EVENT, playDraw, { once: true });
      }

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!window.__preloaderComplete) return;
          timelineRef.current?.kill();
          timelineRef.current = buildTimeline();
          timelineRef.current.play();
        },
        onEnterBack: () => {
          if (!window.__preloaderComplete) return;
          timelineRef.current?.kill();
          timelineRef.current = buildTimeline();
          timelineRef.current.play();
        },
      });

      return () => {
        window.removeEventListener(PRELOADER_COMPLETE_EVENT, playDraw);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ─── Featured companies: staggered reveal ───
  useEffect(() => {
    if (!companiesRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        companiesRef.current!.querySelectorAll(".company-card")
      );

      gsap.set(cards, { autoAlpha: 0, y: 30, scale: 0.96 });

      ScrollTrigger.create({
        trigger: companiesRef.current,
        start: "top 80%",
        onEnter: () => {
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
          gsap.to(cards, { autoAlpha: 0, y: 20, duration: 0.3 });
        },
      });
    }, companiesRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <HeroTrigger pageName="investments" position="top" />

      <section className="investments-hero" ref={heroRef}>
        <div className="investments-hero__bg" />
        <div className="investments-hero__scrim" />

        <div className="investments-hero__wordmark">
          <svg
            ref={svgRef}
            className="investments-svg"
            viewBox={`0 -60 ${TOTAL_WIDTH} 880`}
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(0, 780) scale(1, -1)">
              {LETTERS.map((letter, i) => (
                <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                  <path
                    className="investments-svg__letter"
                    d={letter.d}
                    fillRule="evenodd"
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </section>

      <HeroTrigger pageName="investments" position="bottom" />

      {/* ═══════════════════════════════════════
          BIO / STRATEGY TEXT
      ═══════════════════════════════════════ */}
      <section className="investments-bio">
        <div className="investments-bio__container">
          <div className="investments-bio__content">
            <img
              src="/logo1.png"
              alt="Bullet"
              className="investments-bio__bullet"
            />
            <div className="investments-bio__text">
              <p>
                Adesuwa is the Founder &amp; Managing Partner of{" "}
                <a
                  href="https://aruwacapital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="investments-bio__link"
                >
                  Aruwa Capital Management
                </a>
                , an early stage private equity fund
                investing in rapidly growing businesses in West Africa.
                With Aruwa Capital and her own personal investments,
                Adesuwa is focused on uncovering untapped investment
                opportunities that are typically overlooked and
                underserved. Adesuwa is passionate about showcasing the
                natural competitive advantage women allocating capital
                have when investing in businesses for women and by women.
                Through a gender lens investment strategy, Adesuwa is
                focused on generating enhanced financial returns whilst
                delivering positive social impact with a multiplier effect
                across societies and economies.
              </p>
              <p>
                Adesuwa has worked on investments over $50 million through
                her professional and personal portfolios and has a
                realised exit of over 3x invested capital.
              </p>

              <h3 className="investments-bio__subheading">
                Primary sectors
              </h3>
              <ul className="investments-bio__sectors">
                {PRIMARY_SECTORS.map((sector) => (
                  <li key={sector}>{sector}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED COMPANIES — masonry, clickable cards
      ═══════════════════════════════════════ */}
      <section className="featured-companies" ref={companiesRef}>
        <h2 className="featured-companies__heading">FEATURED COMPANIES</h2>

        <div className="company-masonry">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => {
              const heights: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
              return (
                <SkeletonCard key={`skeleton-${i}`} height={heights[i % 3]} />
              );
            })
          ) : (
            FEATURED_COMPANIES.map((company) => (
              <a
                key={company.id}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`company-card company-card--${company.height ?? "md"}`}
              >
                <div className="company-card__logo-wrap">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="company-card__logo"
                    loading="lazy"
                  />
                </div>
                <div className="company-card__body">
                  <h3 className="company-card__name">{company.name}</h3>
                  <p className="company-card__sector">
                    Sector: {company.sector}
                  </p>
                  <p className="company-card__description">
                    {company.description}
                  </p>
                  <span className="company-card__link">{company.url}</span>
                </div>
              </a>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Investments;