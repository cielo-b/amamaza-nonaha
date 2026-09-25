import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Play } from "lucide-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import { useTranslation } from "react-i18next";
import heroShowreel from "@/assets/videos/brand-promo.mp4";
import heroSlideVideo from "@/assets/videos/hero-1.mp4";
import VideoModal from "./VideoModal";

const slides: { type: "image" | "video"; src: string }[] = [
  { type: "video", src: heroSlideVideo },
  { type: "image", src: hero2 },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  return (
    <section
      id="home"
      className="pt-16 bg-hero-bg overflow-hidden relative"
      ref={heroRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Parallax blob in background */}
      <motion.div style={{ y: yBlob }} className="absolute -top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="container px-4 sm:px-6 py-10 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left: Image carousel + overlay controls */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl overflow-visible shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] bg-background min-h-[360px] md:min-h-[520px] ring-1 ring-border/50"
          >
            {/* Keep images clipped to the rounded photo card */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {slides.map((slide, i) =>
                slide.type === "video" ? (
                  <motion.video
                    key={i}
                    src={slide.src}
                    style={{ y: yImage, scale: 1.15 }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={t("a11y.slide", { number: i + 1 })}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 origin-bottom ${i === current ? "opacity-100" : "opacity-0"
                      }`}
                  />
                ) : (
                  <motion.img
                    key={i}
                    src={slide.src}
                    style={{ y: yImage, scale: 1.15 }}
                    alt={t("a11y.slide", { number: i + 1 })}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 origin-bottom ${i === current ? "opacity-100" : "opacity-0"
                      }`}
                  />
                )
              )}
            </div>

            {/* Carousel overlay controls */}
            <div className="absolute left-0 bottom-0 z-50 flex items-stretch h-16 shadow-lg">
              <button
                type="button"
                aria-label={t("a11y.prevSlide")}
                onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
                className="w-16 h-16 bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <button
                type="button"
                aria-label={t("a11y.nextSlide")}
                onClick={() => setCurrent((c) => (c + 1) % slides.length)}
                className="w-16 h-16 bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-primary-foreground" />
              </button>
              <div className="bg-background px-8 flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                <span className="text-foreground">01</span>
                <div className="h-[3px] w-12 bg-primary" />
                <span>10</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Text panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative z-30 mt-0"
          >
            <div className="bg-transparent p-2 sm:p-4 md:p-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground font-display">
                {t("hero.title")}
              </h1>
              <span className="block w-16 h-1.5 bg-primary mt-3" aria-hidden="true" />
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-base sm:text-xl md:text-2xl font-bold text-primary tracking-tight uppercase leading-snug">{t("hero.subtitle")}</span>
                <span className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground/80 italic leading-relaxed">{t("hero.tagline")}</span>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md leading-relaxed mt-4 md:mt-6">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-5 items-center mt-6 md:mt-10">
                <MagneticWrapper>
                  <Button size="lg" className="rounded-md px-8 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t("hero.cta")}
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper>
                  <Button
                    onClick={() => setVideoOpen(true)}
                    size="lg"
                    variant="ghost"
                    className="rounded-full px-4 py-6 text-base font-semibold gap-3 hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <Play className="w-4 h-4 text-primary group-hover:text-white fill-current" />
                    </span>
                    <span className="text-foreground">{t("hero.watchShowreel")}</span>
                  </Button>
                </MagneticWrapper>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={heroShowreel} />
    </section>
  );
};

export default HeroSection;
