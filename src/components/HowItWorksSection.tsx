import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import howItWorksImg from "@/assets/howit-works.jpg";
import VideoModal from "./VideoModal";
import { useTranslation } from "react-i18next";
import video4 from "@/assets/videos/4.mp4";

const HowItWorksSection = () => {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const { t } = useTranslation();

  const steps = [
    {
      title: t("howItWorks.steps.step1.title"),
      desc: t("howItWorks.steps.step1.desc"),
    },
    {
      title: t("howItWorks.steps.step2.title"),
      desc: t("howItWorks.steps.step2.desc"),
    },
    {
      title: t("howItWorks.steps.step3.title"),
      desc: t("howItWorks.steps.step3.desc"),
    },
    {
      title: t("howItWorks.steps.step4.title"),
      desc: t("howItWorks.steps.step4.desc"),
    },
    {
      title: t("howItWorks.steps.step5.title"),
      desc: t("howItWorks.steps.step5.desc"),
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="container space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="section-badge tracking-widest text-[11px]">{t("howItWorks.badge")}</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground mt-4 mb-6">{t("howItWorks.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-primary pl-6">
            {t("howItWorks.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Accordion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border-b border-border/50 pb-4"
              >
                <button
                  onClick={() => setActive(active === i ? -1 : i)}
                  className="w-full text-left flex items-start justify-between py-2 group gap-3"
                  aria-expanded={active === i}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-sm font-bold text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {i + 1}
                    </span>
                    <span className={`text-base md:text-xl font-semibold transition-colors leading-snug ${active === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {step.title}
                    </span>
                  </div>
                  {active === i ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pr-4 pt-3 pb-2">
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Video Player */}
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
                alt="How it works video thumbnail"
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
