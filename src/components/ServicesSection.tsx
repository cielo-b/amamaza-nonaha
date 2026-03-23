import { Building2, ShoppingBag, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

const services = [
  {
    icon: Building2,
    title: "Property Discovery",
    desc: "Find verified properties for rent or sale with ease, all in one trusted digital space.",
  },
  {
    icon: ShoppingBag,
    title: "Services & Products Marketplace",
    desc: "Discover local services and products from individuals and businesses across Rwanda.",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth & Empowerment",
    desc: "We help businesses and entrepreneurs grow through modern digital tools and visibility.",
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
            WHAT WE OFFER
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] dark:text-white transition-colors">Our Services</motion.h2>
          <motion.p variants={itemVariants} className="text-[#6B7280] dark:text-white/60 max-w-xl mx-auto text-lg leading-relaxed transition-colors">
            A comprehensive platform connecting you with everything you need - all verified, secure, and easy to access.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16 px-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white dark:bg-[#111111] rounded-[2rem] p-10 py-16 px-12 border border-[#E5E7EB] dark:border-white/5 hover:border-[#00AEEF]/50 shadow-xl dark:shadow-2xl transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 flex items-center justify-center mb-10 group-hover:bg-[#00AEEF]/20 dark:group-hover:bg-[#00AEEF]/30 transition-colors">
                <s.icon className="w-8 h-8 text-[#00AEEF]" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground dark:text-white mb-6 leading-tight">{s.title}</h3>
              <p className="text-muted-foreground dark:text-white/60 text-[16px] leading-relaxed max-w-[280px] font-medium">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
