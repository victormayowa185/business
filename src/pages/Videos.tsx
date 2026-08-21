import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "../styles/videos.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Wordmark Configuration ───
// "VIDEOS" — using paths from existing letters (V,I,D,E,O,S)
//
// NOTE on sizing/centering fix:
// TOTAL_WIDTH is now 7600 (same as investments.tsx) instead of the old
// 4600. Because CAP_HEIGHT/viewBox-height (880) is identical on both
// pages, matching TOTAL_WIDTH makes each letter render at the SAME
// absolute pixel size on both pages — the old 4600 value made every
// glyph appear ~65% larger here than on the Investments page for no
// real reason.
//
// The six letters (V I D E O S) only span 3907 units of glyph width.
// To center them inside the new 7600-wide box, every letter's x has
// been shifted right by (7600 - 3907) / 2 = 1846.5, so there's equal
// empty space on both sides instead of all the slack sitting on the
// right.
//
// NOTE on the O glyph fix:
// The O path was pulled from the About page and was drawn at a
// different (shorter) cap height than the V/I/D/E/S glyphs — it only
// spanned y 80→648 (568 units tall) instead of the ~730 units the
// other letters use, so it rendered visibly smaller/misaligned.
// Rather than hand-editing every coordinate in the path (risk of
// typos), a local `transform` is applied just to the O path that:
//   1) scales it by 730/568 ≈ 1.2852 so its height matches the others
//   2) translates it so its baseline sits at y=0 (matching V/I/E)
//   3) re-centers it horizontally inside its own letter box (w: 790)
// so its left/right side-bearing looks the same as before, just at
// the corrected scale.
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 7600;

interface LetterGlyph {
  ch: string;
  d: string;
  x: number;
  w: number;
  /** Optional local transform to normalize glyphs pulled from a
   *  different source/scale than the rest of the set (used for O). */
  transform?: string;
}

const LETTERS: LetterGlyph[] = [
  // V (from Investments)
  {
    ch: "V",
    d: "M232 0 20 730H212L366 148H400L544 730H730L532 0Z",
    x: 1846.5,
    w: 750,
  },
  // I (from Investments)
  {
    ch: "I",
    d: "M76 0V730H262V0Z",
    x: 2596.5,
    w: 338,
  },
  // D (from About page)
  {
    ch: "D",
    d: "M74 -4V736H352Q451 736 525.5 708.0Q600 680 650.0 630.5Q700 581 725.0 516.0Q750 451 750 378V356Q750 289 725.0 224.5Q700 160 650.0 111.5Q600 63 525.5 31.5Q451 0 352 0H74ZM246 152H344Q409 152 458.0 178.5Q507 205 535.5 253.0Q564 301 564 366V370Q564 435 535.5 483.0Q507 531 458.0 557.5Q409 584 344 584H246Z",
    x: 2934.5,
    w: 778,
  },
  // E (from Investments)
  {
    ch: "E",
    d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z",
    x: 3712.5,
    w: 592,
  },
  // O (from About page) — rescaled/re-baselined to match cap height
  // of the other letters (see NOTE above).
  {
    ch: "O",
    // Native path: No transform/scale needed. Perfectly circular and smooth.
    d: "M395 0 C170 0 50 160 50 365 C50 570 170 730 395 730 C620 730 740 570 740 365 C740 160 620 0 395 0 Z M395 140 C510 140 570 230 570 365 C570 500 510 590 395 590 C280 590 220 500 220 365 C220 230 280 140 395 140 Z",
    x: 4304.5,
    w: 790,
    transform: "translate(-67.68, -102.82) scale(1.285211)",
  },
  // S (from Investments)
  {
    ch: "S",
    d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q392 134 424.5 156.0Q457 178 457 215Q457 247 430.0 264.5Q403 282 339 287L292 291Q179 301 112.0 362.0Q45 423 45 524Q45 631 119.0 691.5Q193 752 317 752Q407 752 469.5 722.0Q532 692 565.0 637.5Q598 583 598 511H418Q418 547 391.5 572.5Q365 598 317 598Q271 598 248.0 577.0Q225 556 225 524Q225 496 244.0 476.0Q263 456 310 452L357 448Q439 441 502.0 412.5Q565 384 601.0 335.0Q637 286 637 215Q637 144 600.5 91.0Q564 38 496.5 9.0Q429 -20 334 -20Z",
    x: 5094.5,
    w: 659,
  },
];

// ─── Video Data (17 entries) ───
interface VideoItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  link: string;
  height?: "sm" | "md" | "lg";
}

const VIDEOS: VideoItem[] = [
  {
    id: "video1",
    title: "African Business Stories Roundtable: Bridging the Financing Gap for Nigerian Businesses",
    date: "July 2026",
    excerpt: "A roundtable discussion on bridging the financing gap for Nigerian businesses.",
    thumbnail: "/video-images/image1.png",
    link: "https://vimeo.com/1212942032?share=copy&fl=sv&fe=ci",
    height: "lg",
  },
  {
    id: "video2",
    title: "Supporting Local Manufacturing at NOG Energy Week",
    date: "July 2026",
    excerpt: "Adesuwa discusses supporting local manufacturing at NOG Energy Week.",
    thumbnail: "/video-images/image2.png",
    link: "https://vimeo.com/1212943701?share=copy&fl=sv&fe=ci",
    height: "md",
  },
  {
    id: "video3",
    title: "Nidacity Podcast Series",
    date: "2026",
    excerpt: "Adesuwa features on the Nidacity Podcast Series.",
    thumbnail: "/video-images/image3.png",
    link: "#",
    height: "sm",
  },
  {
    id: "video4",
    title: "A Global Conversation on Africa's Investment Opportunity that went Viral",
    date: "June 2026",
    excerpt: "A viral global conversation on Africa's investment opportunity.",
    thumbnail: "/video-images/image4.png",
    link: "https://www.youtube.com/watch?v=TCDyB5C9EcQ",
    height: "lg",
  },
  {
    id: "video5",
    title: "University of Bristol Alumni Award Recognition",
    date: "May 2026",
    excerpt: "Adesuwa receives recognition at the University of Bristol Alumni Awards.",
    thumbnail: "/video-images/image5.png",
    link: "https://vimeo.com/1197186833",
    height: "md",
  },
  {
    id: "video6",
    title: "Lagos Leadership Summit 2026",
    date: "April 2026",
    excerpt: "Adesuwa speaks at the Lagos Leadership Summit 2026.",
    thumbnail: "/video-images/image6.png",
    link: "https://vimeo.com/1179801318?fl=tl&fe=ec",
    height: "sm",
  },
  {
    id: "video7",
    title: "Access Bank Private Banking Breakfast Series",
    date: "April 2026",
    excerpt: "Adesuwa features at the Access Bank Private Banking Breakfast Series.",
    thumbnail: "/video-images/image7.png",
    link: "https://vimeo.com/1189650897?fl=tl&fe=ec",
    height: "md",
  },
  {
    id: "video8",
    title: "Ci-Gaba VC First Close – West Africa's First Pension-Backed Fund of Funds",
    date: "March 2026",
    excerpt: "Adesuwa discusses Ci-Gaba VC First Close, West Africa's first pension-backed fund of funds.",
    thumbnail: "/video-images/image8.png",
    link: "https://vimeo.com/1179801318?fl=tl&fe=ec",
    height: "lg",
  },
  {
    id: "video9",
    title: "Arise News 100 Women of Impact in Africa Award",
    date: "March 2026",
    excerpt: "Adesuwa featured on Arise News for the 100 Women of Impact in Africa Award.",
    thumbnail: "/video-images/image9.png",
    link: "https://www.youtube.com/watch?v=iLN_-ykwumo",
    height: "sm",
  },
  {
    id: "video10",
    title: "Storytelling and Leadership Podcast",
    date: "March 2026",
    excerpt: "Adesuwa features on the Storytelling and Leadership Podcast.",
    thumbnail: "/video-images/image10.png",
    link: "https://www.youtube.com/watch?v=gE3ctA1si6I&t=1675s",
    height: "md",
  },
  {
    id: "video11",
    title: "Investopia Africa Conference",
    date: "February 2026",
    excerpt: "Adesuwa speaks at the Investopia Africa Conference.",
    thumbnail: "/video-images/image11.png",
    link: "https://vimeo.com/1172823825?share=copy&fl=sv&fe=ci",
    height: "lg",
  },
  {
    id: "video12",
    title: "Birthday Surprise by #TeamAruwa",
    date: "February 2026",
    excerpt: "A birthday surprise for Adesuwa from #TeamAruwa.",
    thumbnail: "/video-images/image12.png",
    link: "https://vimeo.com/1170594593?fl=tl&fe=ec",
    height: "sm",
  },
  {
    id: "video13",
    title: "SheWins Africa Startups Programme",
    date: "February 2026",
    excerpt: "Adesuwa participates in the SheWins Africa Startups Programme.",
    thumbnail: "/video-images/image13.png",
    link: "https://vimeo.com/1170589483?fl=tl&fe=ec",
    height: "md",
  },
  {
    id: "video14",
    title: "Sitting on Aruwa's First Globally Hosted Panel – Nigeria House Davos",
    date: "January 2026",
    excerpt: "Adesuwa sits on Aruwa's first globally hosted panel at Nigeria House Davos.",
    thumbnail: "/video-images/image14.png",
    link: "https://vimeo.com/1163206872?fl=tl&fe=ec",
    height: "lg",
  },
  {
    id: "video15",
    title: "Impact Alpha Agent of Impact Webinar Series",
    date: "November 2025",
    excerpt: "Adesuwa features on the Impact Alpha Agent of Impact Webinar Series.",
    thumbnail: "/video-images/image15.png",
    link: "https://impactalpha.com/agents-of-impact-call-more-of-the-right-kind-of-capital-for-growth-firms-in-africa-video/",
    height: "sm",
  },
  {
    id: "video16",
    title: "21st Annual AVCA Conference & VC Summit Panel Session",
    date: "May 2025",
    excerpt: "Adesuwa speaks on a panel at the 21st Annual AVCA Conference & VC Summit.",
    thumbnail: "/video-images/image16.png",
    link: "https://www.youtube.com/watch?v=00BWiHeyQ1w",
    height: "md",
  },
  {
    id: "video17",
    title: "Mentor Matchup Challenge 6.0",
    date: "December 2024",
    excerpt: "Adesuwa participates in the Mentor Matchup Challenge 6.0.",
    thumbnail: "/video-images/image17.png",
    link: "https://www.youtube.com/watch?v=hGfHMlnbkSg",
    height: "sm",
  },
];

// ─── Component ───
const Videos: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const videosRef = useRef<HTMLDivElement | null>(null);

  // Hero wordmark drawing effect
  useEffect(() => {
    if (!heroRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const letterPaths = gsap.utils.toArray<SVGPathElement>(
        svgRef.current!.querySelectorAll(".videos-svg__letter")
      );

      const order = letterPaths.map((_, i) => i);
      gsap.utils.shuffle(order);

      const buildTimeline = () => {
        const tl = gsap.timeline({ paused: true });
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

  // Masonry cards reveal
  useEffect(() => {
    if (!videosRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        videosRef.current!.querySelectorAll(".video-card")
      );

      gsap.set(cards, { autoAlpha: 0, y: 30, scale: 0.96 });

      ScrollTrigger.create({
        trigger: videosRef.current,
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
    }, videosRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — "VIDEOS" with drawing effect
      ═══════════════════════════════════════ */}
      <section className="videos-hero" ref={heroRef}>
        <div className="videos-hero__bg" />
        <div className="videos-hero__scrim" />

        <div className="videos-hero__wordmark">
          <svg
            ref={svgRef}
            className="videos-svg"
            viewBox={`0 -60 ${TOTAL_WIDTH} 880`}
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(0, 780) scale(1, -1)">
              {LETTERS.map((letter, i) => (
                <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                  <path
                    className="videos-svg__letter"
                    d={letter.d}
                    fillRule="evenodd"
                    transform={letter.transform}
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VIDEO CARDS — Masonry Grid
      ═══════════════════════════════════════ */}
      <section className="videos-grid-section" ref={videosRef}>
        <div className="videos-grid-container">
          <div className="video-masonry">
            {VIDEOS.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`video-card video-card--${video.height ?? "md"}`}
              >
                <div className="video-card__image">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                  />
                  {/* Date overlay — bottom right */}
                  <span className="video-card__date">{video.date}</span>
                </div>
                <div className="video-card__body">
                  <h3 className="video-card__title">{video.title}</h3>
                  <p className="video-card__excerpt">{video.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Videos;