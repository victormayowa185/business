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