import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Wordmark Configuration ───
// "ABOUT ADESUWA" — TOTAL_WIDTH recalculated to match the real extent
// of all letter paths (last letter's x + w), with a word-gap of 300
// units inserted between "ABOUT" and "ADESUWA" so they don't run
// together.
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 9581;

interface LetterGlyph {
    ch: string;
    d: string;
    x: number;
    w: number;
}

const LETTERS: LetterGlyph[] = [
    // ── A B O U T ──
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 0,
        w: 790,
    },
    {
        ch: "B",
        d: "M74 0V730H402Q502 730 566 697.5Q630 665 658 605.0Q686 545 686 478Q686 432 670.5 395.0Q655 358 624.5 333.5Q594 309 548 297V291Q630 278 680.0 228.5Q730 179 730 110Q730 46 696.5 23.0Q663 0 578 0H74ZM246 158H387Q423 158 449.5 173.5Q476 189 486 219.5Q496 250 496 289Q496 328 485.5 357.5Q475 387 449.0 402.0Q423 417 389 417H246ZM246 573H405Q439 573 465.5 587.0Q492 601 502.0 630.0Q512 659 512 696Q512 737 483.5 756.5Q455 776 409 776H246Z",
        x: 790,
        w: 790,
    },
    {
        ch: "O",
        d: "M100 366V362Q100 281 128.5 219.5Q157 158 214.5 119.0Q272 80 360 80Q448 80 505.5 119.0Q563 158 591.5 219.5Q620 281 620 362V366Q620 447 591.5 508.5Q563 570 505.5 609.0Q448 648 360 648Q272 648 214.5 609.0Q157 570 128.5 508.5Q100 447 100 366ZM284 366V362Q284 317 296.5 284.5Q309 252 337.5 233.0Q366 214 412 214Q458 214 486.5 233.0Q515 252 527.5 284.5Q540 317 540 362V366Q540 411 527.5 443.5Q515 476 486.5 495.5Q458 515 412 515Q366 515 337.5 495.5Q309 476 296.5 443.5Q284 411 284 366Z",
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
        x: 3141,
        w: 680,
    },

    // ── ADESUWA (shifted +300 units to create a word gap after "T") ──
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 4121,
        w: 790,
    },
    {
        ch: "D",
        d: "M74 -4V736H352Q451 736 525.5 708.0Q600 680 650.0 630.5Q700 581 725.0 516.0Q750 451 750 378V356Q750 289 725.0 224.5Q700 160 650.0 111.5Q600 63 525.5 31.5Q451 0 352 0H74ZM246 152H344Q409 152 458.0 178.5Q507 205 535.5 253.0Q564 301 564 366V370Q564 435 535.5 483.0Q507 531 458.0 557.5Q409 584 344 584H246Z",
        x: 4911,
        w: 778,
    },
    {
        ch: "E",
        d: "M74 0V730H536V578H254V447H521V295H254V152H542V0Z",
        x: 5689,
        w: 592,
    },
    {
        ch: "S",
        d: "M334 -20Q232 -20 162.5 12.0Q93 44 57.5 99.5Q22 155 22 227H202Q202 187 234.5 160.5Q267 134 334 134Q393 134 424.5 155.5Q456 177 456 212Q456 240 436.5 257.5Q417 275 380 285L262 316Q170 340 116.0 393.0Q62 446 62 522Q62 585 94.5 630.0Q127 675 186.5 698.5Q246 722 322 722Q404 722 464.0 696.5Q524 671 557.0 623.5Q590 576 592 511H412Q412 545 384.5 566.5Q357 588 304 588Q253 588 224.5 568.5Q196 549 196 517Q196 491 214.5 475.0Q233 459 268 449L385 418Q483 392 536.5 337.0Q590 282 590 205Q590 141 555.5 96.0Q521 51 460.5 26.5Q400 2 322 -20Q328 -20 334 -20Z",
        x: 6281,
        w: 659,
    },
    {
        ch: "U",
        d: "M386 -20Q281 -20 208.5 19.0Q136 58 98.0 129.5Q60 201 60 299V730H246V295Q246 230 269.0 190.5Q292 151 331.5 133.5Q371 116 421 116Q471 116 510.5 133.5Q550 151 573.0 190.5Q596 230 596 295V730H782V299Q782 201 743.5 129.5Q705 58 632.5 19.0Q560 -20 455 -20Q420 -20 386 -20Z",
        x: 6940,
        w: 771,
    },
    {
        ch: "W",
        d: "M192 0 18 730H210L336 148H360L455 704H638L749 148H773L882 730H1062L909 0H626L545 458H507L426 0Z",
        x: 7711,
        w: 1080,
    },
    {
        ch: "A",
        d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
        x: 8791,
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
                                Adesuwa Okunbo Rhodes is the Founder and Managing Partner of Aruwa Capital Management, one of the few women-owned and women-led private equity funds in Africa, investing in untapped opportunities in the small to lower-mid market across West Africa. Adesuwa launched Aruwa Capital Management from her savings in July 2019 at just 29 years old, leaving behind the comfort of a six-figure salary to make an impact on society with her skills and track record, and to change the narrative for women and small businesses across Africa.
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