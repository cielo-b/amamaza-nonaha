import { Check, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import video2 from "@/assets/videos/2.mp4";

const WhyChooseSection = () => {
  const { t } = useTranslation();

  const beliefs = ["b1", "b2", "b3", "b4"].map((key) => ({ key, text: t(`whyChoose.beliefs.${key}`) }));

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Framed video with floating highlight chips */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[420px] md:h-[600px] max-w-md w-full mx-auto md:max-w-none"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-3xl -z-10" />
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-background ring-1 ring-border/60 bg-black">
            <video
              src={video2}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {[
            { icon: Eye, label: t("brandVideo.discoveryTitle"), pos: "top-8 -left-2 md:-left-5", delay: 0 },
            { icon: TrendingUp, label: t("brandVideo.growthTitle"), pos: "bottom-12 -right-2 md:-right-5", delay: 1.2 },
          ].map((chip) => (
            <motion.div
              key={chip.label}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
              className={`absolute ${chip.pos} z-20 flex items-center gap-3 rounded-2xl bg-card/90 backdrop-blur-md border border-border px-4 py-3 shadow-xl`}
            >
              <span className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <chip.icon className="w-5 h-5" />
              </span>
              <span className="text-sm font-bold text-foreground">{chip.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.span variants={itemVariants} className="section-badge tracking-widest text-[11px]">
            {t("whyChoose.badge")}
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-medium text-foreground">
            {t("whyChoose.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed max-w-lg pb-4">
            {t("whyChoose.description")}
          </motion.p>
          <motion.div variants={itemVariants} className="font-bold text-lg text-foreground">
            {t("whyChoose.beliefsIntro")}
          </motion.div>
          <motion.ul variants={containerVariants} className="space-y-6">
            {beliefs.map(({ key, text }) => (
              <motion.li variants={itemVariants} key={key} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div className="text-[15px] text-muted-foreground leading-relaxed">{text}</div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={itemVariants} className="pt-8">
            <Button size="lg" className="rounded-md px-10 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300">
              {t("whyChoose.cta")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
