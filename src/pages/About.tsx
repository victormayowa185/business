import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Wordmark Configuration ───
// "ABOUT ADESUWA"
//
// Fixes applied here vs. the previous version:
//
// 1) B — the upper counter (inner "hole") subpath peaked at y=776,
//    46 units above the outer outline's own top (y=730). That's the
//    stray loop poking out above the B. The whole upper-counter
//    subpath has been shifted down by 46 units so it tops out at
//    exactly y=730, flush with the rest of the letter, leaving a
//    clean ~110-unit crossbar between the two counters.
//
// 2) O — pulled from a different source at a shorter cap height
//    (568 units tall, y 80→648) than the rest of the glyphs (~730+).
//    A local `transform` rescales it by 730/568 ≈ 1.2852 and
//    re-baselines/re-centers it so it matches the others, same fix
//    used on the Videos page wordmark.
//
// 3) U/T spacing — U's real ink extends to x=782, past its declared
//    box width of 771, so it was overlapping T with no visible gap.
//    T (and every letter after it) is shifted +71 units right to
//    open a real ~60-unit gap, and TOTAL_WIDTH is extended to match
//    so the word still ends flush on the right.
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 9652;

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
    // ── A B O U T ──
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 0,
        w: 790,
    },
    // B — upper counter subpath corrected (see NOTE above): shifted
    // down 46 units so it no longer overshoots the outer outline's
    // y=730 top.
    {
        ch: "B",
        // This path uses perfect horizontal tangents for the curves.
        // The bottom loop is slightly larger (visual balance).
        // All coordinates are snapped to a clean 0-730 grid.
        d: `
        M80 0 
        V730 
        H400 
        C570 730, 680 640, 680 545 
        C680 450, 580 365, 400 365 
        C620 365, 730 280, 730 185 
        C730 90, 620 0, 400 0 
        H80 Z 
        
        M240 465 
        V630 
        H400 
        C470 630, 530 590, 530 547.5 
        C530 505, 470 465, 400 465 
        H240 Z 
        
        M240 100 
        V265 
        H410 
        C490 265, 570 220, 570 182.5 
        C570 145, 490 100, 410 100 
        H240 Z
    `,
        x: 790,
        w: 790,
    },
    // O — rescaled/re-baselined to match cap height of the other
    // letters (see NOTE above).
    {
        ch: "O",
        // Native path: No transform/scale needed. Perfectly circular and smooth.
        d: "M395 0 C170 0 50 160 50 365 C50 570 170 730 395 730 C620 730 740 570 740 365 C740 160 620 0 395 0 Z M395 140 C510 140 570 230 570 365 C570 500 510 590 395 590 C280 590 220 500 220 365 C220 230 280 140 395 140 Z",
        x: 1580,
        w: 790,
    },

    {
        ch: "U",
        d: "M386 -20Q281 -20 208.5 19.0Q136 58 98.0 129.5Q60 201 60 299V730H246V295Q246 230 269.0 190.5Q292 151 331.5 133.5Q371 116 421 116Q471 116 510.5 133.5Q550 151 573.0 190.5Q596 230 596 295V730H782V299Q782 201 743.5 129.5Q705 58 632.5 19.0Q560 -20 455 -20Q420 -20 386 -20Z",
        x: 2370,
        w: 771,
    },
    {
        ch: "T",
        d: "M0 620H281V0H399V620H680V730H0Z",
        x: 3212,
        w: 680,
    },

    // ── ADESUWA (word gap preserved after the U/T spacing fix) ──
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 4192,
        w: 790,
    },
    {
        ch: "D",
        d: "M74 -4V736H352Q451 736 525.5 708.0Q600 680 650.0 630.5Q700 581 725.0 516.0Q750 451 750 378V356Q750 289 725.0 224.5Q700 160 650.0 111.5Q600 63 525.5 31.5Q451 0 352 0H74ZM246 152H344Q409 152 458.0 178.5Q507 205 535.5 253.0Q564 301 564 366V370Q564 435 535.5 483.0Q507 531 458.0 557.5Q409 584 344 584H246Z",
        x: 4982,
        w: 778,
    },
    {
        ch: "E",
        d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z",
        x: 5760,
        w: 592,
    },

    {
        ch: "S",
        d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q392 134 424.5 156.0Q457 178 457 215Q457 247 430.0 264.5Q403 282 339 287L292 291Q179 301 112.0 362.0Q45 423 45 524Q45 631 119.0 691.5Q193 752 317 752Q407 752 469.5 722.0Q532 692 565.0 637.5Q598 583 598 511H418Q418 547 391.5 572.5Q365 598 317 598Q271 598 248.0 577.0Q225 556 225 524Q225 496 244.0 476.0Q263 456 310 452L357 448Q439 441 502.0 412.5Q565 384 601.0 335.0Q637 286 637 215Q637 144 600.5 91.0Q564 38 496.5 9.0Q429 -20 334 -20Z",
        x: 6352,
        w: 659,
    },
    {
        ch: "U",
        d: "M386 -20Q281 -20 208.5 19.0Q136 58 98.0 129.5Q60 201 60 299V730H246V295Q246 230 269.0 190.5Q292 151 331.5 133.5Q371 116 421 116Q471 116 510.5 133.5Q550 151 573.0 190.5Q596 230 596 295V730H782V299Q782 201 743.5 129.5Q705 58 632.5 19.0Q560 -20 455 -20Q420 -20 386 -20Z",
        x: 7011,
        w: 771,
    },
    {
        ch: "W",
        d: "M192 0 18 730H210L336 148H360L455 704H638L749 148H773L882 730H1062L909 0H626L545 458H507L426 0Z",
        x: 7782,
        w: 1080,
    },
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 8862,
        w: 790,
    },
];

const About: React.FC = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!heroRef.current || !svgRef.current) return;

        const ctx = gsap.context(() => {
            const letterPaths = gsap.utils.toArray<SVGPathElement>(
                svgRef.current!.querySelectorAll(".about-svg__letter")
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

    return (
        <>
            {/* ═══════════════════════════════════════
          HERO — "ABOUT ADESUWA" with drawing effect
      ═══════════════════════════════════════ */}
            <section className="about-hero" ref={heroRef}>
                <div className="about-hero__bg" />
                <div className="about-hero__scrim" />

                <div className="about-hero__wordmark">
                    <svg
                        ref={svgRef}
                        className="about-svg"
                        viewBox={`0 -60 ${TOTAL_WIDTH} 880`}
                        preserveAspectRatio="xMidYMax meet"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform="translate(0, 780) scale(1, -1)">
                            {LETTERS.map((letter, i) => (
                                <g key={`${letter.ch}-${i}`} transform={`translate(${letter.x}, 0)`}>
                                    <path
                                        className="about-svg__letter"
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
          BIOGRAPHY — with logo1.png as a bullet
      ═══════════════════════════════════════ */}
            <section className="about-biography">
                <div className="about-biography__container">
                    <div className="about-biography__content">
                        <img src="/logo1.png" alt="Bullet" className="about-biography__bullet" />
                        <div className="about-biography__text">
                            <p>
                                Adesuwa Okunbo Rhodes is the Founder and Managing Partner of{" "}
                                <a
                                    href="https://aruwacapital.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="about-biography__link"
                                >
                                    Aruwa Capital Management
                                </a>
                                , one of the few women-owned and women-led private equity funds in Africa, investing in untapped opportunities in the small to lower-mid market across West Africa. Adesuwa launched Aruwa Capital Management from her savings in July 2019 at just 29 years old, leaving behind the comfort of a six-figure salary to make an impact on society with her skills and track record, and to change the narrative for women and small businesses across Africa.
                            </p>
                            <p>
                                Adesuwa has over 15 years of investment banking and private equity experience from top global institutions. Prior to founding Aruwa Capital Management, she spent five years as Managing Partner of Syntaxis Capital Africa, a provider of growth capital to SMEs in Nigeria and across Sub Saharan Africa. Syntaxis Africa was part of Syntaxis Capital, a private equity fund active in other emerging markets with $300 million in AUM from global institutional investors. At Syntaxis Africa, she led transactions totalling more than $200 million across SSA. Prior to co-founding Syntaxis Africa in 2014, Adesuwa was in the Leveraged Finance and M&A teams at J.P. Morgan in London, where she was involved in $5.6 billion worth of transactions across emerging markets including Nigeria. Prior to J.P. Morgan, Adesuwa worked in Africa-focused PE fund, TLG Capital as an Investment Professional, involved in transactions across Anglophone Africa including a very successful investment in Uganda, where she personally invested and generated a very attractive return which enabled her to launch her own investment fund.
                            </p>
                            <p>
                                An entrepreneur, CEO, mother, investor, and women's empowerment advocate, Adesuwa is one of the youngest female private equity fund managers in Africa and runs the largest private equity fund in Africa run by a solo female GP. She firmly believes that investing in women is not only the right thing to do, given the role women play in society and the multiplier effect it can have on poverty alleviation for families, but also a sound financial decision, as investing in women and for women has been proven to deliver outsized, superior returns. Through Aruwa Capital Management, she is focused on using the firm's investments as a case study to make the business case for investing in women as fund managers, entrepreneurs, consumers, and stakeholders in society.
                            </p>
                            <p>
                                Aruwa Capital Management has $80 million in AUM across two funds and invests between $1 million and $3 million in equity and equity-linked instruments. It backs established, rapidly growing businesses in Nigeria and Ghana that are currently overlooked by other venture capital &amp; private equity funds. Aruwa invests in companies that either provide goods and services catering to the largely untapped female economy, or that are founded or led by women, or that employ women across their workforce and value chain, reflecting the increased profitability of gender-diverse teams. By focusing on the underserved early-stage growth segment and on demonstrating the stronger returns generated by investing in women as consumers and entrepreneurs, Aruwa is able to combine outsized financial returns with lasting, positive socio-economic development and women's empowerment outcomes in the countries where it invests. The firm invests across rapidly growing, essential sectors including healthcare, financial services, renewable energy, consumer goods, agri-processing, and technology.
                            </p>
                            <p>
                                Adesuwa has won the 2X Global Woman Fund Manager of the Year award and was recognised as one of the 150 Eko Aspire Women by the Lagos State Governor and recognized as one of the 100 Laureates by Institut Choiseul (2021-2024) under the age of 40 shaping Africa's future. Adesuwa is also a Young Global Leader under the World Economic Forum. She holds a BSc in Economics from the University of Bristol. She currently sits on several boards in Nigeria across healthcare, manufacturing, agriculture renewable energy and hospitality sectors. She is married with children and enjoys travelling, tennis and cooking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;