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

    // ─── Mission quotes + Memberships masonry ───
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
          MISSION QUOTES
      ═══════════════════════════════════════ */}
            <section className="mission-section" ref={missionRef}>
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