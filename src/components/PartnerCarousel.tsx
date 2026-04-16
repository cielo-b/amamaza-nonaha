import React from "react";
import { motion } from "framer-motion";

const companies = [
    {
        name: "Papeterie blessings Ltd",
        style: "font-serif tracking-tight font-bold",
        color: "hover:text-amber-600 transition-all duration-300"
    },
    {
        name: "Posh wellness Plus",
        style: "font-sans uppercase tracking-[0.3em] font-light italic",
        color: "hover:text-emerald-500 transition-all duration-300"
    },
    {
        name: "Sando collection",
        style: "font-mono font-black",
        color: "hover:text-blue-600 transition-all duration-300"
    },
    {
        name: "N.J.Amazing shop company Ltd",
        style: "font-sans font-extrabold tracking-tighter border-l-4 border-primary/40 pl-3 leading-none",
        color: "hover:text-primary transition-all duration-300"
    },
    {
        name: "Magic Furniture",
        style: "font-serif italic font-medium tracking-wide",
        color: "hover:text-indigo-400 transition-all duration-300"
    },
    {
        name: "Dolphix Group",
        style: "font-sans font-semibold border-y border-foreground/10 py-1 px-2",
        color: "hover:bg-foreground hover:text-background transition-all duration-300"
    },
    {
        name: "Nziza House",
        style: "font-serif tracking-[0.2em] uppercase font-bold text-lg md:text-xl",
        color: "hover:text-rose-500 transition-all duration-300"
    },
    {
        name: "Rema fashion",
        style: "font-sans italic font-bold",
        color: "hover:text-purple-500 hover:scale-110 transition-all duration-300"
    },
];

const PartnerCarousel = () => {
    // We double the companies array multiple times to ensure enough length for the animation
    const duplicatedCompanies = [...companies, ...companies, ...companies];

    return (
        <section className="py-24 overflow-hidden bg-background relative border-y border-foreground/5">
            <div className="container mx-auto px-4 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We take pride in our collaborations with businesses that strive for excellence and innovation.
                    </p>
                </motion.div>
            </div>

            <div className="relative flex flex-col gap-12">
                <div className="relative flex overflow-x-hidden group">
                    <motion.div
                        className="flex whitespace-nowrap py-12 items-center"
                        animate={{
                            x: ["0%", "-33.33%"],
                        }}
                        transition={{
                            duration: 40,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {duplicatedCompanies.map((company, index) => (
                            <div
                                key={index}
                                className="mx-12 md:mx-16 flex items-center justify-center shrink-0"
                            >
                                <span
                                    className={`text-2xl md:text-4xl text-foreground/30 select-none cursor-default inline-block ${company.style} ${company.color}`}
                                >
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient overlays for smooth fading at edges */}
                    <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default PartnerCarousel;
