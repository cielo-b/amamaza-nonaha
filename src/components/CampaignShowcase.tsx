import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, Instagram, Music2 } from "lucide-react";
import wellnessAd from "@/assets/wellness-ad.png";
import fashionAd from "@/assets/fashion-ad.png";
import techAd from "@/assets/tech-ad.png";
import VideoModal from "./VideoModal";

const campaigns = [
    {
        id: 1,
        title: "Eco-Luxe Wellness Retreat",
        client: "Lumina Spa & Wellness",
        thumbnail: wellnessAd,
        videoUrl: "https://www.tiktok.com/@amamaza_nonaha", // Placeholder link to their TikTok
        category: "Wellness",
        stats: "2.4k Views",
    },
    {
        id: 2,
        title: "Urban Chic Spring Collection",
        client: "Vibrant Boutique",
        thumbnail: fashionAd,
        videoUrl: "https://www.tiktok.com/@amamaza_nonaha",
        category: "Fashion",
        stats: "5.1k Views",
    },
    {
        id: 3,
        title: "Next-Gen Tech Gadgets",
        client: "Tech Hub Rwanda",
        thumbnail: techAd,
        videoUrl: "https://www.tiktok.com/@amamaza_nonaha",
        category: "Technology",
        stats: "3.8k Views",
    },
];

const CampaignShowcase = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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
                                Our Latest Advertising Campaigns
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                We help businesses grow through impactful video storytelling on TikTok and social media.
                                Our content drives real engagement and visibility.
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
                            href="https://www.tiktok.com/@amamaza_nonaha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-all font-semibold group"
                        >
                            <Music2 className="w-5 h-5 group-hover:animate-bounce" />
                            Follow us on TikTok
                            <ExternalLink className="w-4 h-4 opacity-50" />
                        </a>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {campaigns.map((campaign, index) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative aspect-[9/16] overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-800">
                                <img
                                    src={campaign.thumbnail}
                                    alt={campaign.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-xs font-bold w-fit mb-3">
                                        {campaign.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {campaign.title}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-6">
                                        {campaign.client}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => setSelectedVideo(campaign.videoUrl)}
                                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg"
                                        >
                                            <Play className="w-5 h-5 fill-current" />
                                        </button>
                                        <span className="text-white/50 text-xs font-medium">
                                            {campaign.stats}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo}
                />
            )}
        </section>
    );
};

export default CampaignShowcase;
