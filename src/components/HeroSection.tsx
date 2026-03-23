import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const slides = [hero1, hero2];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="pt-16 bg-hero-bg">
      <div className="container grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
        <div className="space-y-6 animate-reveal">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground">
            Everything You Need,{" "}
            <span className="relative">
              <span className="absolute -left-8 top-1/2 w-6 h-px bg-foreground hidden md:block" />
              All In One Place
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Discover, book and order products, properties, and services online. From local to luxury,
            from products to unique experiences — one platform with trust.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full px-8">
              Explore services
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
              <Phone className="w-4 h-4" />
              Contact us
            </Button>
          </div>
        </div>

        {/* Image carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] animate-reveal" style={{ animationDelay: "150ms" }}>
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-8" : "bg-background/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <div className="border-t border-border bg-background">
        <div className="container py-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Trusted by 100+ Companies in Rwanda</span>
          {["Agritimes", "Crystal Tech", "NovaCorp", "NRTech"].map((name) => (
            <span key={name} className="text-sm font-semibold text-muted-foreground/50">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
