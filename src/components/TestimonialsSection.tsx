import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { testimonials, type Lang, type Testimonial } from "@/data/testimonials";

const quoteFor = (item: Testimonial, lang: string) => {
  if (typeof item.quote === "string") return item.quote;
  const base = lang.split("-")[0] as Lang;
  return item.quote[base] ?? item.quote.en;
};

const AUTO_ADVANCE_MS = 7000;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const TestimonialsInvite = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-section-alt">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="container relative space-y-12 text-center"
      >
        <div className="space-y-4">
          <span className="section-badge tracking-widest text-[11px]">{t("testimonials.badge")}</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground">{t("testimonials.title")}</h2>
        </div>

        {/* Open slots: clearly empty placeholders, not quotes */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * i }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                whileHover={{ scale: 1.03 }}
                className="relative h-full rounded-3xl border-2 border-dashed border-primary/30 bg-card/60 backdrop-blur-sm p-8 text-left overflow-hidden group hover:border-primary/60 transition-colors"
              >
                <Quote className="w-10 h-10 text-primary/25 rotate-180 mb-6 group-hover:text-primary/50 transition-colors" strokeWidth={1.5} />
                <div className="space-y-3" aria-hidden="true">
                  <div className="h-3 rounded-full bg-muted overflow-hidden relative">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
                    />
                  </div>
                  <div className="h-3 w-5/6 rounded-full bg-muted" />
                  <div className="h-3 w-2/3 rounded-full bg-muted" />
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center text-primary/60 font-bold">
                    +
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">{t("testimonials.slot")}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6 max-w-xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground">{t("testimonials.emptyTitle")}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("testimonials.emptyDesc")}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-semibold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
          >
            {t("testimonials.cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const count = testimonials.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (isPaused || count < 2) return;
    const timer = setTimeout(() => go(index + 1, 1), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, isPaused, count, go]);

  // Until real feedback is added to src/data/testimonials.ts, show an honest
  // invitation instead of made-up quotes.
  if (count === 0) return <TestimonialsInvite />;

  const active = testimonials[index];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-section-alt">
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="container relative space-y-12 text-center"
      >
        <div className="space-y-4">
          <span className="section-badge tracking-widest text-[11px]">{t("testimonials.badge")}</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground">{t("testimonials.title")}</h2>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative rounded-[2rem] border border-border bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5 px-6 py-12 md:px-16 md:py-16 overflow-hidden">
            <Quote
              aria-hidden="true"
              className="absolute -top-2 left-6 md:left-10 w-24 h-24 md:w-32 md:h-32 text-primary/10 rotate-180"
              strokeWidth={1.5}
            />

            <div className="relative min-h-[240px] md:min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 60, filter: "blur(6px)" }),
                    center: { opacity: 1, x: 0, filter: "blur(0px)" },
                    exit: (d: number) => ({ opacity: 0, x: d * -60, filter: "blur(6px)" }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) go(index - 1, -1);
                    else if (info.offset.x < -80) go(index + 1, 1);
                  }}
                  className="space-y-8 cursor-grab active:cursor-grabbing select-none"
                >
                  <blockquote className="text-xl md:text-3xl font-display font-medium leading-snug text-foreground">
                    &ldquo;{quoteFor(active, i18n.language)}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center justify-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-bold text-sm tracking-wide shadow-lg shadow-primary/20">
                      {initials(active.name)}
                    </span>
                    <span className="text-left font-bold text-lg text-foreground">{active.name}</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Auto-advance progress */}
            {count > 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/60">
                <motion.div
                  key={`${index}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "0%" : "100%" }}
                  transition={{ duration: isPaused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  className="h-full bg-primary"
                />
              </div>
            )}
          </div>

          {count > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label={t("a11y.prevSlide")}
                onClick={() => go(index - 1, -1)}
                className="w-11 h-11 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2.5">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => go(i, i > index ? 1 : -1)}
                    aria-label={t("a11y.slide", { number: i + 1 })}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label={t("a11y.nextSlide")}
                onClick={() => go(index + 1, 1)}
                className="w-11 h-11 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
