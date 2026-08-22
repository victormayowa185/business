import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroTrigger from '../components/HeroTrigger';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { PRELOADER_COMPLETE_EVENT } from "../utils/appEvents";
import "../styles/contact.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

declare global {
    interface Window {
        __preloaderComplete?: boolean;
    }
}

interface LetterGlyph {
    ch: string;
    d: string;
    x: number;
    w: number;
    transform?: string;
}

const CAP_HEIGHT = 730;
const TOTAL_WIDTH = 5521;

const LETTERS: LetterGlyph[] = [
    // C — Smooth geometric arc
    {
        ch: "C",
        d: "M738.0 574.4 A365 365 0 1 1 738.0 155.6 L615.1 241.7 A215 215 0 1 0 615.1 488.3 Z",
        x: 0,
        w: 812,
    },
    // O — Transform REMOVED. Now perfectly matches the height of C.
    {
        ch: "O",
        d: "M395 0 C170 0 50 160 50 365 C50 570 170 730 395 730 C620 730 740 570 740 365 C740 160 620 0 395 0 Z M395 140 C510 140 570 230 570 365 C570 500 510 590 395 590 C280 590 220 500 220 365 C220 230 280 140 395 140 Z",
        x: 842,
        w: 790,
    },
    // N — Clean straight lines
    {
        ch: "N",
        d: "M74 0 V730 H379 L622 148 H637 V730 H811 V0 H504 L261 582 H246 V0 Z",
        x: 1662,
        w: 885,
    },
    // T — Clean straight lines
    {
        ch: "T",
        d: "M220 0 V568 H20 V730 H606 V568 H406 V0 Z",
        x: 2577,
        w: 626,
    },
    // A — Smoothed version to match the weight of the C and O
    {
        ch: "A",
        d: "M0 0 L285 730 H505 L790 0 H610 L545 180 H245 L180 0 H0 Z M295 330 H495 L395 600 Z",
        x: 3233,
        w: 790,
    },
    // C — Second C
    {
        ch: "C",
        d: "M738.0 574.4 A365 365 0 1 1 738.0 155.6 L615.1 241.7 A215 215 0 1 0 615.1 488.3 Z",
        x: 4053,
        w: 812,
    },
    // T — Second T
    {
        ch: "T",
        d: "M220 0 V568 H20 V730 H606 V568 H406 V0 Z",
        x: 4895,
        w: 626,
    },
];

const Contact: React.FC = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    // ─── Hero: drawn "CONTACT" wordmark ───
    useEffect(() => {
        if (!heroRef.current || !svgRef.current) return;

        const ctx = gsap.context(() => {
            const letterPaths = gsap.utils.toArray<SVGPathElement>(
                svgRef.current!.querySelectorAll(".contact-svg__letter")
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

    // ─── Intro + form: staggered fade/slide reveal on scroll ───
    useEffect(() => {
        if (!contentRef.current) return;

        const ctx = gsap.context(() => {
            const blocks = gsap.utils.toArray<HTMLElement>(
                contentRef.current!.querySelectorAll(".contact-fade")
            );

            gsap.set(blocks, { autoAlpha: 0, y: 30 });

            ScrollTrigger.create({
                trigger: contentRef.current,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(blocks, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        stagger: 0.15,
                    });
                },
                onLeaveBack: () => {
                    gsap.to(blocks, { autoAlpha: 0, y: 20, duration: 0.3 });
                },
            });
        }, contentRef);

        return () => ctx.revert();
    }, []);

    // ─── Form submit — UI only for now ───
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Intentionally a no-op — UI-only per current spec.
    };

    return (
        <>
            {/* ═══════════════════════════════════════
          HERO — "CONTACT" with drawing effect
      ═══════════════════════════════════════ */}
            <section className="contact-hero" ref={heroRef}>
                <div className="contact-hero__bg" />
                <div className="contact-hero__scrim" />

                <div className="contact-hero__wordmark">
                    <svg
                        ref={svgRef}
                        className="contact-svg"
                        viewBox={`0 -60 ${TOTAL_WIDTH} 880`}
                        preserveAspectRatio="xMidYMax meet"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform="translate(0, 780) scale(1, -1)">
                            {LETTERS.map((letter, i) => (
                                <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                                    <path
                                        className="contact-svg__letter"
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

            {/* ─── Hero trigger point for navbar scroll detection ─── */}
            <HeroTrigger pageName="contact" />

            <div ref={contentRef}>
                {/* ═══════════════════════════════════════
            INTRO — bio-style intro text + business link
        ═══════════════════════════════════════ */}
                <section className="contact-intro">
                    <div className="contact-intro__container">
                        <div className="contact-intro__content contact-fade">
                            <img
                                src="/logo1.png"
                                alt="Bullet"
                                className="contact-intro__bullet"
                            />
                            <div className="contact-intro__text">
                                <p>
                                    Please reach out if you would like to collaborate, if you
                                    are looking for support and/or funding for your business
                                    or simply want to share exciting ideas.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            CONTACT FORM — with Email field
        ═══════════════════════════════════════ */}
                <section className="contact-form-section">
                    <div className="contact-form-container">
                        <form
                            className="contact-form-card contact-fade"
                            onSubmit={handleSubmit}
                            noValidate={false}
                        >
                            <div className="contact-form__field">
                                <label htmlFor="contact-name" className="contact-form__label">
                                    NAME   <span className="contact-form__required">*</span>
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    required
                                    className="contact-form__input"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* ─── Email Field ─── */}
                            <div className="contact-form__field">
                                <label htmlFor="contact-email" className="contact-form__label">
                                    EMAIL   <span className="contact-form__required">*</span>
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    className="contact-form__input"
                                    placeholder="Your email address"
                                />
                            </div>

                            <div className="contact-form__field">
                                <label
                                    htmlFor="contact-message"
                                    className="contact-form__label"
                                >
                                    COMMENT OR MESSAGE{" "}
                                    <span className="contact-form__required">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={6}
                                    className="contact-form__textarea"
                                    placeholder="Tell us a bit about what you'd like to discuss..."
                                />
                            </div>

                            <button type="submit" className="contact-form__submit">
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Contact;