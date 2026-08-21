import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import "../styles/contact.css";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Wordmark Configuration ───
// "CONTACT" — built the same way as the other pages: reused glyphs
// where they already exist (O, N, T, A), plus one new glyph.
//
// The "C" does not exist anywhere else on the site, so it's been
// hand-built here in the same visual weight as the rest (730-unit
// cap height, ~74-unit side margins, similar ring thickness to O),
// using SVG arc ("A") commands rather than hand-tuned Bézier
// control points — a more exact way to get a clean circular
// letterform than eyeballing curve coordinates, while still landing
// on the same proportions as the extracted-font glyphs.
const CAP_HEIGHT = 760;
const TOTAL_WIDTH = 5341;

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
  // C — new glyph. Outer radius 365 (0→730 cap height), inner
  // radius 215 (150-unit ring thickness), opening is a 70°-wide gap
  // centered on the right (±35° from due "east").
  {
    ch: "C",
    d: "M738.0 574.4A365 365 0 1 1 738.0 155.6L615.1 241.7A215 215 0 1 0 615.1 488.3Z",
    x: 0,
    w: 812,
  },
  // O — rescaled/re-baselined to match cap height of the other
  // letters (same fix used on Videos/About).
  {
    ch: "O",
    d: "M100 366V362Q100 281 128.5 219.5Q157 158 214.5 119.0Q272 80 360 80Q448 80 505.5 119.0Q563 158 591.5 219.5Q620 281 620 362V366Q620 447 591.5 508.5Q563 570 505.5 609.0Q448 648 360 648Q272 648 214.5 609.0Q157 570 128.5 508.5Q100 447 100 366ZM284 366V362Q284 317 296.5 284.5Q309 252 337.5 233.0Q366 214 412 214Q458 214 486.5 233.0Q515 252 527.5 284.5Q540 317 540 362V366Q540 411 527.5 443.5Q515 476 486.5 495.5Q458 515 412 515Q366 515 337.5 495.5Q309 476 296.5 443.5Q284 411 284 366Z",
    x: 812,
    w: 790,
    transform: "translate(-67.68, -102.82) scale(1.285211)",
  },
  {
    ch: "N",
    d: "M74 0V730H379L622 148H637V730H811V0H504L261 582H246V0Z",
    x: 1602,
    w: 885,
  },
  {
    ch: "T",
    d: "M220 0V568H20V730H606V568H406V0Z",
    x: 2487,
    w: 626,
  },
  {
    ch: "A",
    d: "M8 0 242 730H540L782 0H590L537 169H246L194 0ZM292 321H489L408 580H371Z",
    x: 3113,
    w: 790,
  },
  {
    ch: "C",
    d: "M738.0 574.4A365 365 0 1 1 738.0 155.6L615.1 241.7A215 215 0 1 0 615.1 488.3Z",
    x: 3903,
    w: 812,
  },
  {
    ch: "T",
    d: "M220 0V568H20V730H606V568H406V0Z",
    x: 4715,
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
  // No submission method has been wired up yet. Swap this out for
  // whichever approach gets chosen later:
  //   • mailto: link — change the <form> to a plain <a href="mailto:...">
  //   • Form service (Formspree/Web3Forms/EmailJS) — POST/fetch here
  //   • Your own backend — fetch("/api/contact", { method: "POST", ... })
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
                <a
                  href="https://aruwacapital.com/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-intro__link"
                >
                  https://aruwacapital.com/contact/
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CONTACT FORM
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
                  Name <span className="contact-form__required">*</span>
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

              <div className="contact-form__field">
                <label
                  htmlFor="contact-message"
                  className="contact-form__label"
                >
                  Comment or Message{" "}
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
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;