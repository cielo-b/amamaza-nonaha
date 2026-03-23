import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const slides = [hero1, hero2];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [trustedIndex, setTrustedIndex] = useState(0);
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

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setTrustedIndex((i) => (i + 1) % 4), 3000);
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

      <div className="container py-12 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Image carousel + overlay controls */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl overflow-visible shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] bg-background min-h-[360px] md:min-h-[520px] ring-1 ring-border/50"
          >
            {/* Keep images clipped to the rounded photo card */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {slides.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  style={{ y: yImage, scale: 1.15 }}
                  alt={`Slide ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 origin-bottom ${i === current ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
            </div>

            {/* Carousel overlay controls */}
            <div className="absolute left-0 bottom-0 z-50 flex items-stretch h-16 shadow-lg">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
                className="w-16 h-16 bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
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
            className="relative z-30 -mt-8 md:mt-0"
          >
            <div className="bg-transparent p-4 md:p-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground font-display flex flex-wrap items-center gap-x-4">
                Everything You Need, All In One Place
                <span className="w-16 h-1.5 bg-primary mt-2" aria-hidden="true" />
              </h1>

              <p className="text-muted-foreground text-lg max-w-md leading-relaxed mt-6">
                Discover and book services, products, properties, and more across Rwanda. From land to
                homes, from products to unique experiences - we connect you with it all.
              </p>

              <div className="flex flex-wrap gap-5 items-center mt-10">
                <MagneticWrapper>
                  <Button size="lg" className="rounded-md px-8 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
                    Explore services
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full px-4 py-6 text-base font-semibold gap-3 hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone className="w-4 h-4 text-primary group-hover:text-white" />
                    </span>
                    <span className="text-foreground">Contact us</span>
                  </Button>
                </MagneticWrapper>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trusted by */}
      <div className="border-t border-border bg-background relative overflow-hidden">
        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -bottom-22 right-[-160px] text-[120px] font-display font-bold text-primary/10 whitespace-nowrap select-none">
            amamazanonaha
          </div>
        </div>

        <div className="container py-10 relative z-10">
          <div className="text-center space-y-8">
            <div className="text-lg text-foreground/80 font-semibold leading-none">
              Trusted by 100+ Companies in Rwanda
            </div>

            {/* Desktop/tablet carousel */}
            <div className="hidden md:block relative">
              {/* Faded edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

              <div className="overflow-hidden w-[800px] max-w-full mx-auto">
                {/* Each logo "tile" is fixed width so translateX can be computed */}
                <div
                  className="flex items-center transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${trustedIndex * 200}px)` }}
                >
                  {[
                    { name: "DeepTimes", sub: "SHARPEN MINDS" },
                    { name: "Posh Wellness Plus", sub: "Your Health is Your Wealth" },
                    { name: "NC", sub: "" },
                    { name: "NRTech", sub: "" },
                    // repeat to allow smooth looping
                    { name: "DeepTimes", sub: "SHARPEN MINDS" },
                    { name: "Posh Wellness Plus", sub: "Your Health is Your Wealth" },
                    { name: "NC", sub: "" },
                    { name: "NRTech", sub: "" },
                  ].map((l, idx) => (
                    <div key={`${l.name}-${idx}`} className="w-[200px] flex-shrink-0">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-sm font-semibold text-foreground/80">
                          {l.name}
                        </div>
                        {l.sub ? (
                          <div className="text-[10px] font-medium tracking-wide text-muted-foreground/70 mt-1 text-center">
                            {l.sub}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: keep it simple, same row content but stacked nicely */}
            <div className="md:hidden flex flex-wrap items-center justify-center gap-x-10 gap-y-10">
              {[
                { name: "DeepTimes", sub: "SHARPEN MINDS" },
                { name: "Posh Wellness Plus", sub: "Your Health is Your Wealth" },
                { name: "NC", sub: "" },
                { name: "NRTech", sub: "" },
              ].map((l) => (
                <div key={l.name} className="min-w-[140px]">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-sm font-semibold text-foreground/80">{l.name}</div>
                    {l.sub ? (
                      <div className="text-[10px] font-medium tracking-wide text-muted-foreground/70 mt-1 text-center">
                        {l.sub}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
