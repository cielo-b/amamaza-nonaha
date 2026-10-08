import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

const LINE = 16; // text-xs line height, px
const EDGE = 16; // gap from the viewport edge while floating, px
const PAD_X = 14; // pill padding while floating, px
const PAD_Y = 8;
const RANGE = 180; // scroll distance over which the pill glides into the footer, px

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * "Powered by" credit that stays pinned to the bottom-left of the viewport while
 * the page scrolls. As the footer comes into view it glides across and settles
 * into its own spot in the footer, shedding the pill styling on the way.
 *
 * The footer renders the empty slot; the badge itself is portalled to <body> and
 * positioned with `fixed`, because the footer sits inside transformed ancestors
 * that would otherwise break fixed positioning.
 */
const PoweredBy = () => {
  const { t, i18n } = useTranslation();
  const slotRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  // The slot reserves exactly the room the text needs (it changes with the language).
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => setTextWidth(el.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [i18n.language]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const slot = slotRef.current;
      const badge = badgeRef.current;
      if (!slot || !badge) return;

      const rect = slot.getBoundingClientRect();
      const floatTop = window.innerHeight - EDGE - PAD_Y - LINE;
      const floatLeft = EDGE + PAD_X;

      // 0 = floating in the corner, 1 = settled in the footer.
      const progress = clamp(1 - (rect.top - floatTop) / RANGE, 0, 1);
      const textTop = Math.min(floatTop, rect.top);
      const textLeft = lerp(floatLeft, rect.left, progress);
      const padX = PAD_X * (1 - progress);
      const padY = PAD_Y * (1 - progress);

      badge.style.transform = `translate3d(${textLeft - padX}px, ${textTop - padY}px, 0)`;
      badge.style.padding = `${padY}px ${padX}px`;
      badge.style.setProperty("--p", progress.toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Layout shifts (images, language changes) move the slot without a scroll event.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [textWidth, i18n.language]);

  return (
    <>
      <div ref={slotRef} aria-hidden="true" style={{ width: textWidth, height: LINE }} />
      {createPortal(
        <div
          ref={badgeRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 30,
            borderRadius: 9999,
            whiteSpace: "nowrap",
            willChange: "transform",
            background: "rgba(2, 11, 20, calc(0.9 * (1 - var(--p, 0))))",
            backdropFilter: "blur(calc(12px * (1 - var(--p, 0))))",
            WebkitBackdropFilter: "blur(calc(12px * (1 - var(--p, 0))))",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, calc(0.35 * (1 - var(--p, 0)))), inset 0 0 0 1px rgba(255, 255, 255, calc(0.18 * (1 - var(--p, 0))))",
          }}
        >
          <span
            ref={textRef}
            className="block text-xs leading-4"
            style={{ color: "rgba(255, 255, 255, calc(0.35 + 0.5 * (1 - var(--p, 0))))" }}
          >
            {t("footer.poweredBy")}{" "}
            <a
              href="https://axiomfold.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-primary transition-colors"
              style={{ color: "rgba(255, 255, 255, calc(0.55 + 0.4 * (1 - var(--p, 0))))" }}
            >
              Axiom Fold LTD
            </a>
          </span>
        </div>,
        document.body,
      )}
    </>
  );
};

export default PoweredBy;
