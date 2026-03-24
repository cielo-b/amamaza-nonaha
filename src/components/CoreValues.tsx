import { motion, Variants } from "framer-motion";
import { Lightbulb, ShieldCheck, Award, HandIcon, TrendingUp, Users } from "lucide-react";

const values = [
    {
        icon: Lightbulb,
        title: "Innovation",
        desc: "Embracing modern ideas and digital solutions to improve trade and growth.",
    },
    {
        icon: ShieldCheck,
        title: "Trust",
        desc: "Building a reliable platform where businesses and users feel secure.",
    },
    {
        icon: Award,
        title: "Professionalism",
        desc: "Delivering excellence, integrity, and quality in everything we do.",
    },
    {
        icon: HandIcon,
        title: "Accessibility",
        desc: "Making opportunities easier to find, access, and use for everyone.",
    },
    {
        icon: TrendingUp,
        title: "Growth",
        desc: "Dedicated to helping businesses expand their reach and potential.",
    },
    {
        icon: Users,
        title: "Partnership",
        desc: "Valuing strong relationships to build sustainable success together.",
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const CoreValues = () => {
    return (
        <section className="py-16 md:py-20 bg-section-alt">
            <div className="container space-y-12">
                <div className="text-center space-y-4">
                    <span className="section-badge tracking-widest text-[11px]">OUR CULTURE</span>
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground">Core Values</h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {values.map((v) => (
                        <motion.div
                            key={v.title}
                            variants={itemVariants}
                            className="p-6 md:p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                                <v.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CoreValues;
