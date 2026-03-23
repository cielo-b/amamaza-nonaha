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
    <section id="services" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Stripes Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #F9FBFC 0px, #F9FBFC 2px, transparent 2px, transparent 15px)`,
          opacity: 0.8
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container text-center space-y-12 relative z-10"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-4 bg-[#00AEEF]" />
            <motion.span variants={itemVariants} className="text-[12px] font-bold text-[#00AEEF] tracking-widest uppercase">
              WHAT WE OFFER
            </motion.span>
          </div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A]">Our Services</motion.h2>
          <motion.p variants={itemVariants} className="text-[#6B7280] max-w-xl mx-auto text-lg leading-relaxed">
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
              className="bg-[#111111] rounded-[2rem] p-10 py-16 px-12 border border-white/5 hover:border-[#00AEEF]/30 shadow-2xl transition-all duration-300 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00AEEF]/20 flex items-center justify-center mb-10">
                <s.icon className="w-8 h-8 text-[#00AEEF]" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6 leading-tight">{s.title}</h3>
              <p className="text-white/60 text-[16px] leading-relaxed max-w-[280px] font-medium">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
