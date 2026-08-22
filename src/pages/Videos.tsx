import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkeletonCard from '../components/SkeletonCard';
import HeroBackground from '../components/HeroBackground';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { PRELOADER_COMPLETE_EVENT } from "../utils/appEvents";
import HeroTrigger from '../components/HeroTrigger';
import "../styles/videos.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
declare global {
  interface Window {
    __preloaderComplete?: boolean;
  }
}
const CAP_HEIGHT = 730; // Standardized height
const TOTAL_WIDTH = 7600;

interface LetterGlyph {
  ch: string;
  d: string;
  x: number;
  w: number;
  transform?: string;
}

const LETTERS: LetterGlyph[] = [
  // V — Smoothed and aligned to 0-730
  {
    ch: "V",
    d: "M232 0 L20 730 H212 L366 148 H400 L544 730 H730 L532 0 Z",
    x: 1846.5,
    w: 750,
  },
  // I — Simple and clean
  {
    ch: "I",
    d: "M76 0 V730 H262 V0 Z",
    x: 2596.5,
    w: 338,
  },
  // D — Rewritten with smooth Cubic Beziers (No more "broken" edges)
  {
    ch: "D",
    d: "M80 0 V730 H380 C580 730 720 580 720 365 C720 150 580 0 380 0 H80 Z M250 140 H380 C480 140 540 210 540 365 C540 520 480 590 380 590 H250 V140 Z",
    x: 2934.5,
    w: 778,
  },
  // E — Clean straight lines
  {
    ch: "E",
    d: "M74 0 V730 H536 V578 H254 V447 H521 V295 H254 V152 H542 V0 Z",
    x: 3712.5,
    w: 592,
  },
  // O — Transform REMOVED. Now perfectly matches the height of others.
  {
    ch: "O",
    d: "M395 0 C170 0 50 160 50 365 C50 570 170 730 395 730 C620 730 740 570 740 365 C740 160 620 0 395 0 Z M395 140 C510 140 570 230 570 365 C570 500 510 590 395 590 C280 590 220 500 220 365 C220 230 280 140 395 140 Z",
    x: 4304.5,
    w: 790,
    // transform is removed here
  },
  // S — Redrawn for smoothness (Fixed the -20 baseline issue)
  {
    ch: "S",
    d: "M60 180 H220 C220 120 280 70 360 70 C440 70 480 110 480 160 C480 210 440 230 340 260 L240 290 C120 325 60 395 60 500 C60 640 170 730 360 730 C550 730 650 640 650 500 H490 C490 580 440 610 360 610 C290 610 240 580 240 520 C240 470 280 450 380 420 L480 390 C600 355 660 285 660 175 C660 60 550 0 360 0 C170 0 60 80 60 180 Z",
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

  // ─── Loading state for skeleton cards ───
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Hero wordmark drawing effect
  useEffect(() => {
    if (!heroRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const letterPaths = gsap.utils.toArray<SVGPathElement>(
        svgRef.current!.querySelectorAll(".videos-svg__letter")
      );

      // Hide SVG initially
      gsap.set(svgRef.current, { opacity: 0 });

      const order = letterPaths.map((_, i) => i);
      gsap.utils.shuffle(order);

      const buildTimeline = () => {
        const tl = gsap.timeline({ paused: true });

        // Show the SVG when animation starts
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

      // Check if preloader is already done
      if (window.__preloaderComplete) {
        playDraw();
      } else {
        // Wait for preloader to complete before playing
        window.addEventListener(PRELOADER_COMPLETE_EVENT, playDraw, { once: true });
      }

      // ScrollTrigger re-trigger — but only play if preloader is done
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
      <HeroTrigger pageName="videos" position="top" />

      <section className="videos-hero" ref={heroRef}>
      <HeroBackground src="/vidoes.png" focalPosition="center 25%" />
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

      <HeroTrigger pageName="videos" position="bottom" />

      {/* ═══════════════════════════════════════
          VIDEO CARDS — Masonry Grid
      ═══════════════════════════════════════ */}
      <section className="videos-grid-section" ref={videosRef}>
        <div className="videos-grid-container">
          <div className="video-masonry">
            {loading ? (
              // ─── Show skeleton cards while loading ───
              Array.from({ length: 12 }).map((_, i) => {
                const heights: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
                return (
                  <SkeletonCard key={`skeleton-${i}`} height={heights[i % 3]} />
                );
              })
            ) : (
              // ─── Show actual cards once loaded ───
              VIDEOS.map((video) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Videos;