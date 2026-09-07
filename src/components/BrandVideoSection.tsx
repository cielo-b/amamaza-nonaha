import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, Shield, TrendingUp, Search } from "lucide-react";
import VideoModal from "./VideoModal";
import thumbnail from "@/assets/founder-thumbnail.png";
import brandVideo from "@/assets/videos/global-reach.mp4";
import { Trans, useTranslation } from "react-i18next";

/**
 * Emphasised span used inside the translated headline. react-i18next forwards an
 * internal `i18nIsDynamicList` flag to mapped components, so strip it here rather
 * than let React warn about an unknown DOM prop.
 */
const Accent = ({
    i18nIsDynamicList: _ignored,
    ...props
}: React.ComponentProps<"span"> & { i18nIsDynamicList?: boolean }) => (
    <span className="text-primary italic" {...props} />
);

const BrandVideoSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gradient-to-b from-background to-slate-50 dark:to-slate-900/20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase">
                                {t("brandVideo.badge")}
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                                {/* One key per sentence, so each language places the emphasis where its
                                    own grammar puts it instead of inheriting English word order.
                                    `t` is passed explicitly because Trans alone does not subscribe to
                                    language changes — without it the headline freezes on first render. */}
                                <Trans
                                    t={t}
                                    i18nKey="brandVideo.title"
                                    components={{ accent: <Accent /> }}
                                />
                            </h2>
                            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
                                {t("brandVideo.description")}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: TrendingUp, title: t("brandVideo.growthTitle"), desc: t("brandVideo.growthDesc") },
                                { icon: Search, title: t("brandVideo.discoveryTitle"), desc: t("brandVideo.discoveryDesc") },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary font-bold transition-transform hover:scale-110">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="group inline-flex items-center gap-4 bg-primary text-white px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all font-bold text-lg shadow-xl shadow-primary/20"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                                {t("brandVideo.cta")}
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Video Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative"
                    >
                        <div className="relative z-10 aspect-video rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] group cursor-pointer" onClick={() => setIsOpen(true)}>
                            <img
                                src={thumbnail}
                                alt={t("a11y.brandMessage")}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                                    <Play className="w-8 h-8 fill-current" />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    <Volume2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-xs sm:text-sm leading-snug">{t("brandVideo.founderTitle")}</div>
                                    <div className="text-white/60 text-xs leading-snug">{t("brandVideo.founderSub")}</div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 blur-[100px] -z-10" />

                        {/* Dots pattern overlay (simulated) */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 grid grid-cols-4 gap-2 opacity-20 -z-10">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal */}
            <VideoModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                videoUrl={brandVideo}
            />
        </section>
    );
};

export default BrandVideoSection;
