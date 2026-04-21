import { motion, Variants } from "framer-motion";
import { Lightbulb, ShieldCheck, Award, Hand, TrendingUp, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const CoreValues = () => {
    const { t } = useTranslation();

    const values = [
        {
            icon: Lightbulb,
            title: t("coreValues.items.innovation.title"),
            desc: t("coreValues.items.innovation.desc"),
        },
        {
            icon: ShieldCheck,
            title: t("coreValues.items.trust.title"),
            desc: t("coreValues.items.trust.desc"),
        },
        {
            icon: Award,
            title: t("coreValues.items.professionalism.title"),
            desc: t("coreValues.items.professionalism.desc"),
        },
        {
            icon: Hand,
            title: t("coreValues.items.accessibility.title"),
            desc: t("coreValues.items.accessibility.desc"),
        },
        {
            icon: TrendingUp,
            title: t("coreValues.items.growth.title"),
            desc: t("coreValues.items.growth.desc"),
        },
        {
            icon: Users,
            title: t("coreValues.items.partnership.title"),
            desc: t("coreValues.items.partnership.desc"),
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="values" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/10">
            <div className="container space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-badge tracking-widest text-[11px]"
                    >
                        {t("coreValues.badge")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-display font-medium text-foreground"
                    >
                        {t("coreValues.title")}
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="p-8 md:p-10 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <v.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{v.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-[15px]">{v.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CoreValues;
