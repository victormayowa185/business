import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroTrigger from '../components/HeroTrigger';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import HeroBackground from '../components/HeroBackground';
import "../styles/home.css";
import { PRELOADER_COMPLETE_EVENT } from "../utils/appEvents";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

declare global {
    interface Window {
        __preloaderComplete?: boolean;
    }
}

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
        ch: "S", d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q392 134 424.5 156.0Q457 178 457 215Q457 247 430.0 264.5Q403 282 339 287L292 291Q179 301 112.0 362.0Q45 423 45 524Q45 631 119.0 691.5Q193 752 317 752Q407 752 469.5 722.0Q532 692 565.0 637.5Q598 583 598 511H418Q418 547 391.5 572.5Q365 598 317 598Q271 598 248.0 577.0Q225 556 225 524Q225 496 244.0 476.0Q263 456 310 452L357 448Q439 441 502.0 412.5Q565 384 601.0 335.0Q637 286 637 215Q637 144 600.5 91.0Q564 38 496.5 9.0Q429 -20 334 -20Z",
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

interface MembershipLogo {
    id: string;
    src: string;
    alt: string;
}

const MEMBERSHIP_LOGOS: MembershipLogo[] = [
    { id: "logo1", src: "/logos/logo1.webp", alt: "Membership logo 1" },
    { id: "logo2", src: "/logos/logo2.webp", alt: "Membership logo 2" },
    { id: "logo3", src: "/logos/logo3.webp", alt: "Membership logo 3" },
    { id: "logo4", src: "/logos/logo4.webp", alt: "Membership logo 4" },
    { id: "logo5", src: "/logos/logo5.webp", alt: "Membership logo 5" },
    { id: "logo6", src: "/logos/logo6.webp", alt: "Membership logo 6" },
    { id: "logo7", src: "/logos/logo7.webp", alt: "Membership logo 7" },
];

const Home: React.FC = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const markRef = useRef<SVGSVGElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const missionRef = useRef<HTMLDivElement | null>(null);
    const missionPhotoRef = useRef<HTMLDivElement | null>(null);
    const missionGapRef = useRef<HTMLDivElement | null>(null);
    const membershipsRef = useRef<HTMLDivElement | null>(null);
    const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

    // ─── Loading state for membership logos ───
    const [logosLoading, setLogosLoading] = useState(true);

    // ─── Hero Text: Show immediately on page load ───
    useEffect(() => {
        if (!heroRef.current) return;

        const eyebrow = heroRef.current.querySelector(".hero-eyebrow");
        const recentSection = heroRef.current.querySelector(".hero-recent");

        if (eyebrow) {
            gsap.set(eyebrow, { opacity: 1, y: 0 });
        }
        if (recentSection) {
            gsap.set(recentSection, { opacity: 1, y: 0 });
        }
    }, []);

    // ─── Simulate loading for membership logos ───
    useEffect(() => {
        const timer = setTimeout(() => setLogosLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

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

            gsap.set([svgRef.current, markRef.current], { opacity: 0 });

            const order = letterPaths.map((_, i) => i);
            gsap.utils.shuffle(order);

            const buildTimeline = () => {
                const tl = gsap.timeline({ paused: true });

                tl.set([svgRef.current, markRef.current], { opacity: 1 }, 0);
                tl.set(letterPaths, { drawSVG: "0%", opacity: 1 });
                if (markPath) tl.set(markPath, { drawSVG: "0%" });
                tl.set(markLetters, { drawSVG: "0%" });

                order.forEach((idx, i) => {
                    const dur = gsap.utils.random(0.55, 0.95);
                    tl.to(
                        letterPaths[idx],
                        { drawSVG: "100%", duration: dur, ease: "power2.inOut" },
                        0.1 + i * 0.16
                    );
                });

                const lettersEnd = 0.1 + order.length * 0.16 + 0.4;

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

    // ─── Mission: fade‑in for bio/investments blocks, pin & bottom quotes ───
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (missionRef.current) {
                const topBlocks = gsap.utils.toArray<HTMLElement>(
                    missionRef.current.querySelectorAll(".mission-block")
                );
                const pin = missionRef.current.querySelector(".mission-pin");
                const quoteBlocks = gsap.utils.toArray<HTMLElement>(
                    missionRef.current.querySelectorAll(".mission-quote")
                );

                gsap.set(topBlocks, { autoAlpha: 0, y: 28 });
                gsap.set(pin, { autoAlpha: 0, y: 24, scale: 0.9 });
                gsap.set(quoteBlocks, { autoAlpha: 0, y: 28 });

                ScrollTrigger.create({
                    trigger: missionRef.current.querySelector(".mission-panel--top"),
                    start: "top 78%",
                    onEnter: () => {
                        gsap.to(topBlocks, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "expo.out",
                            stagger: 0.18,
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(topBlocks, { autoAlpha: 0, y: 20, duration: 0.3 });
                    },
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: missionRef.current.querySelector(".mission-panel--bottom"),
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.to(pin, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "expo.out",
                }).to(
                    quoteBlocks,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "expo.out",
                        stagger: 0.2,
                    },
                    "-=0.35"
                );

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
                gsap.set(heading, { autoAlpha: 0, y: 20 });

                ScrollTrigger.create({
                    trigger: membershipsRef.current,
                    start: "top 75%",
                    onEnter: () => {
                        gsap.to(heading, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "expo.out",
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(heading, { autoAlpha: 0, y: 20, duration: 0.3 });
                    },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // ─── Marquee animation — only starts after logos are loaded ───
    useEffect(() => {
        if (logosLoading || !marqueeTrackRef.current) return;

        const track = marqueeTrackRef.current;
        const tween = gsap.to(track, {
            xPercent: -50,
            duration: MEMBERSHIP_LOGOS.length * 3,
            ease: "none",
            repeat: -1,
        });

        return () => { tween.kill(); };
    }, [logosLoading]);

    // ─── Force navbar to white on Home page mount ───
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent('hero-visibility', {
                detail: { isVisible: true, page: 'home', position: 'top' },
            })
        );
    }, []);

    return (
        <>
            <HeroTrigger pageName="home" position="top" />

            <section className="hero-section" ref={heroRef}>
                <HeroBackground src="/images/hero.webp" focalPosition="center 22%" />
                <div className="hero-section__scrim" />

                <div className="hero-section__top">
                    <div className="hero-eyebrow">
                        <strong className="hero-eyebrow__text">
                            Adesuwa Rhodes is changing the face of investing and
                            entrepreneurship in Africa, one investment at a time.
                        </strong>
                        <p className="hero-quote-extra">
                            "Capital alone is not enough. We don't just invest with money;
                            we go beyond the capital to help companies build stronger finance
                            functions, governance, and strategy." — Detailing her approach
                            at Aruwa Capital Management.
                        </p>
                        <Link
                            to="https://aruwacapital.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-aruwacapital-link"
                        >
                            ADESUWA CAPITAL →
                        </Link>
                    </div>
                </div>

                <div className="hero-recent">
                    <span className="hero-recent__label">RECENT ON THE NEWS</span>
                    <p className="hero-recent__text">
                        Adesuwa Rhodes featured in Forbes as one of Africa's most influential
                        investors shaping the future of sustainable finance.
                    </p>
                    <Link to="/news" className="hero-recent__link">READ MORE →</Link>
                </div>

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

            <HeroTrigger pageName="home" position="bottom" />

            {/* ═══════════════════════════════════════
                MISSION
            ═══════════════════════════════════════ */}
            <section className="mission-section" ref={missionRef}>
                <div className="mission-photo-band" ref={missionPhotoRef}>
                    <div className="mission-photo-band__img" />
                </div>

                <div className="mission-panel mission-panel--top">
                    <div className="mission-inner">
                        <div className="mission-grid-2col">
                            <div className="mission-block">
                                <img src="/logo1.webp" alt="Adesuwa Rhodes" className="mission-block__logo" />
                                <p className="mission-block__text">
                                    Adesuwa is a leading investment professional and CEO with over 14
                                    years of experience in investment banking and private equity in
                                    developed and emerging markets across a number of sectors including
                                    healthcare, financial services, technology and consumer goods.
                                    Adesuwa is an entrepreneur, CEO, mother, investor and women's
                                    empowerment advocate. She is one of the youngest female private
                                    equity fund managers running her own fund,{" "}
                                    <a
                                        href="https://aruwacapital.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mission-block__inline-link"
                                    >
                                        Aruwa Capital Management
                                    </a>
                                    , in Africa, having launched her fund at 29 years old.....
                                </p>
                                <Link to="/about" className="mission-block__link">Read More →</Link>
                            </div>

                            <div className="mission-block">
                                <h3 className="mission-block__heading">INVESTMENTS</h3>
                                <p className="mission-block__text">
                                    Adesuwa is the Founder &amp; Managing Partner of    <a
                                        href="https://aruwacapital.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mission-block__inline-link"
                                    >
                                        Aruwa Capital Management
                                    </a> an early stage private equity fund investing in rapidly
                                    growing businesses in West Africa. With Aruwa Capital and her own
                                    personal investments, Adesuwa is focused on uncovering untapped
                                    investment opportunities that are typically overlooked and
                                    underserved. Adesuwa is passionate about showcasing the natural
                                    competitive advantage women allocating capital have when investing
                                    in businesses for women and by women. Through a gender lens
                                    investment strategy, Adesuwa is focused on generating enhanced
                                    financial returns whilst delivering positive social impact with a
                                    multiplier effect across societies and economies.
                                </p>
                                <Link to="/about" className="mission-block__link">Learn More →</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mission-gap" ref={missionGapRef} />

                <div className="mission-panel mission-panel--bottom">
                    <div className="mission-inner">
                        <img src="/logo1.webp" alt="Adesuwa Rhodes" className="mission-pin" />

                        <div className="mission-quotes-grid">
                            <div className="mission-quote">
                                <p className="mission-quote__text">
                                    I am on a mission to unlock the untapped potential of women as
                                    capital allocators, consumers, founders, board members, suppliers
                                    and across all levels of society, to unlock enhanced financial
                                    returns and positive social impact.
                                </p>
                            </div>
                            <div className="mission-quote">
                                <p className="mission-quote__text">
                                    I believe the way to effectively provide women with more seats at
                                    the table is for us to create our own tables. More women succeeding
                                    as capital allocators means more women getting funded, more mentors,
                                    more torch-bearers, and more examples to follow. Investing in or
                                    with funds like Aruwa Capital Management is a practical way to
                                    narrow the gender funding gap and making money while you do so.
                                </p>
                            </div>
                        </div>

                        <div className="mission-attribution">~ Adesuwa Rhodes</div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                MEMBERSHIPS & PUBLICATIONS — with skeleton loading
            ═══════════════════════════════════════ */}
            <section className="memberships-section" ref={membershipsRef}>
                <h2 className="memberships-heading">Memberships and Publications</h2>

                <div className="marquee">
                    <div className="marquee__track" ref={marqueeTrackRef}>
                        {logosLoading ? (
                            // ─── Show skeleton placeholders while loading ───
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={`logo-skeleton-${i}`} className="marquee__item">
                                    <div className="skeleton-logo" />
                                </div>
                            ))
                        ) : (
                            // ─── Show actual logos once loaded ───
                            <>
                                {MEMBERSHIP_LOGOS.map((logo) => (
                                    <div key={logo.id} className="marquee__item">
                                        <img src={logo.src} alt={logo.alt} loading="lazy" />
                                    </div>
                                ))}
                                {MEMBERSHIP_LOGOS.map((logo) => (
                                    <div key={`${logo.id}-dup`} className="marquee__item" aria-hidden="true">
                                        <img src={logo.src} alt="" loading="lazy" />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;