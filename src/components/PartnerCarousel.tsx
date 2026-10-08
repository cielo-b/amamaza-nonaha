import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import globalReachVideo from "@/assets/videos/global-reach.mp4";

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
        name: "Isunzu Furniture",
        style: "font-serif font-bold tracking-wide",
        color: "hover:text-orange-500 transition-all duration-300"
    },
    {
        name: "Sts company Ltd",
        style: "font-sans font-black uppercase tracking-widest",
        color: "hover:text-sky-500 transition-all duration-300"
    },
    {
        name: "Vicky Steel Ltd",
        style: "font-mono font-bold tracking-tight border-b-2 border-foreground/20 pb-1",
        color: "hover:text-slate-400 transition-all duration-300"
    },
    {
        name: "Ev imodoka+",
        style: "font-sans italic font-extrabold tracking-tight",
        color: "hover:text-green-500 transition-all duration-300"
    },
    {
        name: "MJ Decor and catering",
        style: "font-serif italic font-medium tracking-wide",
        color: "hover:text-pink-500 transition-all duration-300"
    },
    {
        name: "Shell infrastructure group",
        style: "font-sans font-semibold uppercase tracking-[0.15em] border-y border-foreground/10 py-1 px-2",
        color: "hover:bg-foreground hover:text-background transition-all duration-300"
    },
    {
        name: "Axiom Fold",
        style: "font-mono font-black tracking-[0.2em] uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] scale-110 mx-4",
        color: "hover:scale-125 hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-500"
    }
];

const PartnerCarousel = () => {
    // We double the companies array multiple times to ensure enough length for the animation
    const duplicatedCompanies = [...companies, ...companies, ...companies];
    const { t } = useTranslation();

    return (
        <section className="py-24 overflow-hidden bg-background relative border-y border-foreground/5">
            {/* Slowly looping globe behind the names: this is where the brand's global reach belongs */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ maskImage: "linear-gradient(to bottom, transparent 30%, black 75%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 75%)" }}
            >
                <video
                    src={globalReachVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-[0.2] dark:opacity-[0.35]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
            </div>

            <div className="container mx-auto px-4 mb-16 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        {t("partners.title")}
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("partners.description")}
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
                            duration: companies.length * 4.5,
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
