import { Building2, ShoppingBag, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

const services = [
  {
    icon: ShoppingBag,
    title: "Digital Marketplace Access",
    desc: "A professional space where customers discover products and services conveniently.",
  },
  {
    icon: TrendingUp,
    title: "E-commerce Solutions",
    desc: "Helping businesses with digital tools to sell, promote, and scale online.",
  },
  {
    icon: ShoppingBag,
    title: "Marketing & Brand Visibility",
    desc: "Awareness strategies that help brands attract the right audience and build presence.",
  },
  {
    icon: TrendingUp,
    title: "Business Promotion",
    desc: "Giving entrepreneurs a platform to showcase their offers to more potential customers.",
  },
  {
    icon: Building2,
    title: "Opportunity Discovery",
    desc: "Connecting users to valuable listings, services, and growth opportunities across Rwanda.",
  },
  {
    icon: TrendingUp,
    title: "Trade & Market Connection",
    desc: "Supporting the movement of ideas and products from local markets to broader access.",
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
