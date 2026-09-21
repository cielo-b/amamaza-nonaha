import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import whyImg from "@/assets/why-choose.jpg";
import { useTranslation } from "react-i18next";
import video2 from "@/assets/videos/2.mp4";

const WhyChooseSection = () => {
  const { t } = useTranslation();

  const beliefs = ["b1", "b2", "b3", "b4"].map((key) => t(`whyChoose.beliefs.${key}`));

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
        {/* Left: Dual Overlapping Images/Videos */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[360px] md:h-[600px] flex items-center"
        >
          <div className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden shadow-2xl z-10 border-[8px] border-background transition-colors duration-300">
            <img src={whyImg} alt={t("a11y.partnership")} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[65%] h-[65%] rounded-2xl overflow-hidden shadow-2xl z-20 border-[8px] border-background transition-colors duration-300 bg-black">
            <video
              src={video2}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          {/* Decorative Dot Pattern or Blur behind */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
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
            {beliefs.map((belief) => (
              <motion.li variants={itemVariants} key={belief} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div className="text-[15px] text-muted-foreground leading-relaxed">{belief}</div>
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
