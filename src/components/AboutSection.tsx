import aboutImg from "@/assets/about.jpg";
import { motion, Variants } from "framer-motion";
import { Building2, Users, LifeBuoy } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "1000+", label: t("about.stats.listings"), icon: Building2 },
    { value: "500+", label: t("about.stats.providers"), icon: Users },
    { value: "24/7", label: t("about.stats.support"), icon: LifeBuoy },
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 gap-4 relative"
        >
          {/* Collage Column 1 */}
          <div className="space-y-4 flex flex-col justify-end pb-8">
            <img
              src={aboutImg}
              alt="Team at market"
              className="rounded-2xl object-cover w-full h-48 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="People working"
              className="rounded-2xl object-cover w-full h-64 shadow-md"
            />
          </div>
          {/* Collage Column 2 */}
          <div className="space-y-4 pt-12">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Team discussion"
              className="rounded-2xl object-cover w-full h-60 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Workspace"
              className="rounded-2xl object-cover w-full h-40 shadow-md"
            />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.span variants={itemVariants} className="section-badge tracking-widest text-[11px]">
            {t("about.badge")}
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-foreground leading-tight"
          >
            {t("about.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed text-lg">
            {t("about.description")}
            <br />
            <br />
            {t("about.subDescription")}
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-8 pt-4">
            <motion.div variants={itemVariants} className="space-y-3 p-6 bg-card rounded-2xl border border-border">
              <h4 className="font-bold text-primary flex items-center gap-2">{t("about.vision.title")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("about.vision.text")}
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3 p-6 bg-card rounded-2xl border border-border">
              <h4 className="font-bold text-primary flex items-center gap-2">{t("about.mission.title")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("about.mission.text")}
              </p>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap sm:flex-nowrap gap-4 pt-6">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
                className="flex-1 flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold text-foreground leading-tight">{s.value}</div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
