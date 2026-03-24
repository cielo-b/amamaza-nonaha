import { useState, useEffect, useCallback, useRef } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VideoModal from "./VideoModal";

const testimonials = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "This platform has transformed my business. I'm reaching customers I never knew existed. My sales grew by 3x in just 6 months.",
    name: "Claudine Uwimana",
    role: "Founder, Kigali Crafts Co.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Rickroll placeholder
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "Marketing and visibility were our biggest hurdles. Amamazanonaha provided the bridge we needed to connect with a wider audience.",
    name: "Leonce Karemera",
    role: "Director, Innovate Rwanda",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: "Finding high-quality services used to take days. Now I find trusted pros in minutes. The trust and professionalism are unmatched.",
    name: "Jeanne Gasana",
    role: "Entrepreneur",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const openVideo = (url: string) => {
    setSelectedVideo(url || "");
    setVideoOpen(true);
    setIsPaused(true);
  };

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getVisibleItems = () => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const next = (activeIndex + 1) % testimonials.length;
    return [prev, activeIndex, next];
  };

  const visibleIndices = getVisibleItems();

  return (
    <section className="py-16 md:py-20 overflow-hidden bg-section-alt">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="container space-y-10 text-center"
      >
        <div className="space-y-4">
          <span className="section-badge tracking-widest text-[11px]">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground">
            What They Say?
          </h2>
        </div>

        <div
          className="relative w-full max-w-[1400px] mx-auto pt-4 pb-8 flex items-center justify-center gap-4 md:gap-12 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Faded Item */}
          <motion.div
            key={`left-${testimonials[visibleIndices[0]].id}`}
            initial={{ opacity: 0, x: 100, scale: 0.6 }}
            animate={{ opacity: 0.4, x: 0, scale: 0.75, filter: "blur(2px)" }}
            exit={{ opacity: 0, x: -100, scale: 0.6 }}
            className="hidden md:block relative w-1/4 h-[300px] rounded-3xl overflow-hidden shrink-0"
            onClick={prevSlide}
          >
            <img src={testimonials[visibleIndices[0]].image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover/card:bg-white/30">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </motion.div>

          {/* Center Active Item */}
          <motion.div
            key={`center-${testimonials[visibleIndices[1]].id}`}
            layoutId="active-testimonial"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) prevSlide();
              else if (info.offset.x < -100) nextSlide();
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full md:w-[60%] lg:w-1/2 h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl z-20 shrink-0 select-none group/card"
          >
            <img src={testimonials[visibleIndices[1]].image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            <div
              onClick={() => openVideo(testimonials[visibleIndices[1]].videoUrl)}
              className="absolute top-8 left-8 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all z-30 group-hover/card:bg-primary/90"
            >
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-left">
              <p className="text-white text-xl md:text-3xl font-medium leading-snug mb-8 max-w-[90%]">
                "{testimonials[visibleIndices[1]].quote}"
              </p>
              <div>
                <div className="text-white font-bold text-lg">{testimonials[visibleIndices[1]].name}</div>
                <div className="text-white/70 text-sm mt-1">{testimonials[visibleIndices[1]].role}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Faded Item */}
          <motion.div
            key={`right-${testimonials[visibleIndices[2]].id}`}
            initial={{ opacity: 0, x: -100, scale: 0.6 }}
            animate={{ opacity: 0.4, x: 0, scale: 0.75, filter: "blur(2px)" }}
            exit={{ opacity: 0, x: 100, scale: 0.6 }}
            className="hidden md:block relative w-1/4 h-[300px] rounded-3xl overflow-hidden shrink-0 cursor-pointer group/card"
            onClick={() => openVideo(testimonials[visibleIndices[2]].videoUrl)}
          >
            <img src={testimonials[visibleIndices[2]].image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover/card:bg-white/30">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-border hover:bg-border/80"
                }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={selectedVideo}
      />
    </section>
  );
};

export default TestimonialsSection;
