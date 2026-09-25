import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { useTranslation } from "react-i18next";
import heroShowreel from "@/assets/videos/brand-promo.mp4";
import heroSlideVideo from "@/assets/videos/hero-1.mp4";
import VideoModal from "./VideoModal";

const HeroSection = () => {
  const { t } = useTranslation();
  const [videoOpen, setVideoOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="home" className="pt-16 bg-hero-bg overflow-hidden relative" ref={heroRef}>
      {/* Parallax blob in background */}
      <motion.div style={{ y: yBlob }} className="absolute -top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="container px-4 sm:px-6 py-10 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left: Framed brand video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative glow behind the frame */}
            <div className="absolute -inset-4 md:-inset-6 rounded-[2rem] bg-primary/10 blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.35)] ring-1 ring-border/60 border-[6px] md:border-8 border-background bg-black min-h-[320px] md:min-h-[520px]">
              <motion.video
                src={heroSlideVideo}
                style={{ y: yImage, scale: 1.1 }}
                autoPlay
                muted
                loop
                playsInline
                aria-label={t("a11y.heroVideo")}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle bottom gradient for depth and contrast */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
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
