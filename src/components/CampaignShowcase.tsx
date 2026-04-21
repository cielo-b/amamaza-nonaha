import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Music2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const CampaignShowcase = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Load the Curator.io widget script
        const script = document.createElement("script");
        script.src = "https://cdn.curator.io/published/YOUR_WIDGET_ID.js"; // Replace with actual ID
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {t("campaigns.title")}
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                {t("campaigns.description")}
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <a
                            href="https://www.tiktok.com/@amamazanonaha.ltd?_r=1&_t=ZS-95aGYHcXCTc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-all font-semibold group"
                        >
                            <Music2 className="w-5 h-5 group-hover:animate-bounce" />
                            {t("campaigns.cta")}
                            <ExternalLink className="w-4 h-4 opacity-50" />
                        </a>
                    </motion.div>
                </div>

                {/* The Live TikTok Widget */}
                <div className="w-full min-h-[600px] bg-slate-100/50 dark:bg-slate-800/50 rounded-3xl overflow-hidden p-4 md:p-8">
                    <div id="curator-feed-default-feed-layout" className="w-full overflow-hidden">
                        <a href="https://curator.io" target="_blank" className="crt-logo crt-tag">
                            Powered by Curator.io
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CampaignShowcase;
