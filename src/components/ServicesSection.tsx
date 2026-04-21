import { Building2, ShoppingBag, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import video7 from "@/assets/videos/7.mp4";

const services = [
  {
    icon: ShoppingBag,
    key: "marketplace",
  },
  {
    icon: TrendingUp,
    key: "ecommerce",
  },
  {
    icon: ShoppingBag,
    key: "marketing",
  },
  {
    icon: TrendingUp,
    key: "promotion",
  },
  {
    icon: Building2,
    key: "discovery",
  },
  {
    icon: TrendingUp,
    key: "trade",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-hero-bg transition-colors duration-500 relative overflow-hidden">
      {/* Background Stripes Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, var(--stripe-color) 0px, var(--stripe-color) 2px, transparent 2px, transparent 15px)`,
          opacity: 0.8
        }}
      />

      {/* Decorative High-Tech Video background */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <video
          src={video7}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        :root { --stripe-color: #F2F4F7; }
        .dark { --stripe-color: #111111; }
      `}} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container text-center space-y-12 relative z-10"
      >
        <div className="space-y-4">
          <motion.span variants={itemVariants} className="section-badge tracking-widest text-[11px] mb-2">
            {t("services.badge")}
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] dark:text-white transition-colors">
            {t("services.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[#6B7280] dark:text-white/60 max-w-xl mx-auto text-lg leading-relaxed transition-colors">
            {t("services.description")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16 px-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white dark:bg-[#111111] rounded-[2rem] p-10 py-16 px-12 border border-[#E5E7EB] dark:border-white/5 hover:border-[#00AEEF]/50 shadow-xl dark:shadow-2xl transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 flex items-center justify-center mb-10 group-hover:bg-[#00AEEF]/20 dark:group-hover:bg-[#00AEEF]/30 transition-colors">
                <s.icon className="w-8 h-8 text-[#00AEEF]" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground dark:text-white mb-6 leading-tight">
                {t(`services.items.${s.key}.title`)}
              </h3>
              <p className="text-muted-foreground dark:text-white/60 text-[16px] leading-relaxed max-w-[280px] font-medium">
                {t(`services.items.${s.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
