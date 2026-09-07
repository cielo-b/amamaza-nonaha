import { useState } from "react";
import { motion } from "framer-motion";
import howItWorksImg from "@/assets/howit-works.jpg";
import VideoModal from "./VideoModal";
import { useTranslation } from "react-i18next";
import video4 from "@/assets/videos/4.mp4";

/**
 * The five-step accordion that used to sit here was removed: the FAQ section
 * further down the page now covers the same ground in question-and-answer form.
 * What remains is the section's own explanation alongside the video.
 */
const HowItWorksSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: heading and explanation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground mb-6">
              {t("howItWorks.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-primary pl-6">
              {t("howItWorks.description")}
            </p>
          </motion.div>

          {/* Right: video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative lg:ml-10"
          >
            <div
              onClick={() => setVideoOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-muted aspect-[4/3] md:aspect-video flex items-center justify-center group cursor-pointer"
            >
              {/* Decorative blue dashes */}
              <div className="absolute top-0 right-[40%] md:right-32 w-2 h-12 bg-primary z-20 rounded-b-md transform -translate-y-2 group-hover:translate-y-0 transition-transform" />
              <div className="absolute bottom-0 left-[40%] md:left-12 w-2 h-12 bg-primary z-20 rounded-t-md transform translate-y-2 group-hover:translate-y-0 transition-transform" />

              <img
                src={howItWorksImg}
                alt={t("a11y.howItWorksThumb")}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

              <button className="relative z-20 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform active:scale-95">
                <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-primary ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={video4}
      />
    </section>
  );
};

export default HowItWorksSection;
