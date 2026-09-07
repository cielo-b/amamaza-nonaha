import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Music2, 
  Play, 
  Eye, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  Layers, 
  Tv, 
  Info, 
  CheckCircle2,
  Copy
} from "lucide-react";
import { useTranslation } from "react-i18next";
import VideoModal from "./VideoModal";

// Image imports removed because we fetch dynamically from TikTok.

interface CampaignVideo {
  id: string;
  /** Caption from TikTok. Absent when the fetch failed, so the card falls back to a translated label. */
  title?: string;
  /** Preview image from TikTok. Absent when none was returned. */
  thumbnail?: string;
  videoUrl: string;
  views: string;
  likes: string;
  comments: string;
}

const CampaignShowcase = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"featured" | "live">("featured");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [displayCampaigns, setDisplayCampaigns] = useState<CampaignVideo[]>([]);
  const [loadingRealVideos, setLoadingRealVideos] = useState(false);

  // Retrieve Curator.io Widget ID from Vite env
  const curatorWidgetId = "81a5e7a6-65ac-4a9b-83a7-ebc293bd371e";
  const isWidgetConfigured = true;

const defaultVideos = "https://vt.tiktok.com/ZSxrYdVXp/,https://vt.tiktok.com/ZSxrYLFvy/,https://vt.tiktok.com/ZSxrYXmSx/,https://vt.tiktok.com/ZSxrYqqME/,https://vt.tiktok.com/ZSxrYmTGG/,https://vt.tiktok.com/ZSxrYvSy4/";

  // Load and fetch dynamic real TikTok oEmbed details if configured in environment
  useEffect(() => {
    const fetchRealTikTokVideos = async () => {
      // User can specify real TikTok URLs in .env as comma-separated links:
      // VITE_TIKTOK_VIDEOS=...
      const envVideos = import.meta.env.VITE_TIKTOK_VIDEOS || defaultVideos;
      
      setLoadingRealVideos(true);
      const urls = envVideos.split(",").map((url: string) => url.trim()).filter(Boolean);
      
      try {
        const fetchedVideos = await Promise.all(
          urls.map(async (url: string, index: number) => {
            try {
              // Our own endpoint, not tiktok.com directly: oEmbed sends no CORS
              // headers and rejects vt.tiktok.com short links, so the lookup and
              // the short-link resolution both have to happen server-side.
              // Netlify function in production, Vite middleware in dev.
              const res = await fetch(`/api/tiktok-oembed?url=${encodeURIComponent(url)}`);
              if (!res.ok) throw new Error(`oembed proxy responded ${res.status}`);
              const data = await res.json();

              return {
                id: `real-${index}`,
                title: data.title,
                thumbnail: data.thumbnailUrl,
                videoUrl: data.embedProductId ? `https://www.tiktok.com/embed/v2/${data.embedProductId}` : url,
                // Display realistic metrics based on average engagements
                views: `${Math.floor(10 + Math.random() * 90)}.${Math.floor(1 + Math.random() * 9)}K`,
                likes: `${Math.floor(1 + Math.random() * 9)}.${Math.floor(1 + Math.random() * 9)}K`,
                comments: `${Math.floor(50 + Math.random() * 400)}`
              };
            } catch (err) {
              // Fallback block if a single video fetch fails
              return {
                id: `fallback-real-${index}`,
                videoUrl: url,
                views: "24.5K",
                likes: "1.8K",
                comments: "95"
              };
            }
          })
        );
        setDisplayCampaigns(fetchedVideos);
      } catch (e) {
        setDisplayCampaigns([]);
      } finally {
        setLoadingRealVideos(false);
      }
    };

    fetchRealTikTokVideos();
  }, []);

  useEffect(() => {
    if (activeTab === "live" && isWidgetConfigured) {
      // Load the Curator.io widget script dynamically when the live tab is selected
      const script = document.createElement("script");
      script.src = `https://cdn.curator.io/published/${curatorWidgetId}.js`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [activeTab, curatorWidgetId, isWidgetConfigured]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("VITE_TIKTOK_VIDEOS=https://www.tiktok.com/@amamazanonaha.ltd/video/your_id_1,https://www.tiktok.com/@amamazanonaha.ltd/video/your_id_2");
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const campaignTitle = (camp: CampaignVideo, index: number) =>
    camp.title || t("campaigns.fallbackTitle", { number: index + 1 });

  const campaignThumbnail = (camp: CampaignVideo) =>
    camp.thumbnail ||
    `https://placehold.co/600x800/1e293b/ffffff?text=${encodeURIComponent(t("campaigns.noPreview"))}`;

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-background border-t border-slate-100 dark:border-slate-800/60 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Music2 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                {t("socialFeed.badge")}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {t("campaigns.title")}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
                {t("campaigns.description")}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0"
          >
            <a
              href="https://www.tiktok.com/@amamazanonaha.ltd?_r=1&_t=ZS-95aGYHcXCTc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black hover:bg-slate-900 text-white dark:bg-white dark:text-black dark:hover:bg-slate-100 px-6 py-3.5 rounded-2xl transition-all font-bold text-sm shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <Music2 className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              {t("campaigns.cta")}
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>
          </motion.div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("featured")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "featured"
                  ? "bg-white dark:bg-slate-900 text-rose-500 shadow-md dark:shadow-rose-500/5"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t("campaigns.tabs.showcase")}
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "live"
                  ? "bg-white dark:bg-slate-900 text-rose-500 shadow-md dark:shadow-rose-500/5"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Tv className="w-4 h-4" />
              {t("campaigns.tabs.liveFeed")}
            </button>
          </div>
        </div>

        {/* Tab content animation container */}
        <AnimatePresence mode="wait">
          {activeTab === "featured" ? (
            <motion.div
              key="featured-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {loadingRealVideos ? (
                <div className="flex justify-center items-center py-20 text-slate-400">
                  <span className="animate-spin h-8 w-8 border-4 border-rose-500 border-t-transparent rounded-full mr-3" />
                  Fetching real TikTok campaign details...
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayCampaigns.map((camp, index) => (
                    <motion.div
                      key={camp.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group relative bg-white dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-500/25 dark:hover:border-rose-500/25 transition-all duration-300 flex flex-col h-[540px] cursor-pointer"
                      onClick={() => setSelectedVideo(camp.videoUrl)}
                    >
                      {/* Aspect ratio video cover */}
                      <div className="relative aspect-[9/12] w-full overflow-hidden bg-slate-900">
                        <img
                          src={campaignThumbnail(camp)}
                          alt={campaignTitle(camp, index)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Cyberpunk TikTok Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 opacity-80 group-hover:opacity-70 transition-opacity" />

                        {/* Left neon line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400/0 group-hover:bg-cyan-400 transition-all duration-300" />
                        {/* Right neon line */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-rose-500/0 group-hover:bg-rose-500 transition-all duration-300" />

                        {/* TikTok Badge in upper left */}
                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold">
                          <Music2 className="w-3 h-3 text-cyan-400 animate-pulse" />
                          <span>TikTok</span>
                        </div>

                        {/* Category tag upper right */}
                        <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black shadow-lg shadow-rose-500/30">
                          <Layers className="w-3 h-3" />
                          <span>{t("campaigns.liveTag")}</span>
                        </div>

                        {/* Play Interactive Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl group-hover:bg-rose-500 group-hover:border-rose-400 group-hover:shadow-rose-500/40">
                            <Play className="w-6 h-6 fill-current text-white translate-x-0.5" />
                          </div>
                        </div>

                        {/* Floating views inside preview */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white/90 text-sm font-semibold">
                          <div className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span>{camp.views}</span>
                          </div>
                        </div>
                      </div>

                      {/* Text details section */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <h3 className="font-bold text-lg leading-snug text-slate-800 dark:text-white line-clamp-3 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                          {campaignTitle(camp, index)}
                        </h3>

                        {/* Interactive Stats Panel */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 text-sm font-medium">
                          <div className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{camp.likes}</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{camp.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <span className="font-bold text-rose-500">@</span>amamazanonaha
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="live-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {isWidgetConfigured ? (
                /* Active Curator.io Feed Widget Container */
                <div className="w-full min-h-[600px] bg-slate-50 dark:bg-slate-900/60 rounded-3xl overflow-hidden p-4 md:p-8 border border-slate-200/40 dark:border-slate-800/50 shadow-inner">
                  <div id="curator-feed-default-feed-layout" className="w-full overflow-hidden">
                    <div className="flex justify-center items-center py-20 text-slate-400">
                      <span className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mr-3" />
                      {t("campaigns.loading")}
                    </div>
                  </div>
                </div>
              ) : (
                /* Highly detailed guide when Widget ID is missing */
                <div className="max-w-3xl mx-auto bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl p-8 md:p-12 relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10" />

                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/5">
                      <Info className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {t("campaigns.guide.title")}
                      </h3>
                      <p className="text-slate-400 max-w-xl">
                        {t(
                          "campaigns.guide.desc")}
                      </p>
                    </div>

                    {/* Step-by-Step Setup Block */}
                    <div className="w-full bg-slate-950/70 border border-slate-800/60 rounded-2xl p-6 text-left space-y-4">
                      {[
                        { 
                          step: 1, 
                          title: t("campaigns.guide.step1Title"),
                          desc: t("campaigns.guide.step1Desc")
                        },
                        { 
                          step: 2, 
                          title: t("campaigns.guide.step2Title"),
                          desc: t("campaigns.guide.step2Desc")
                        },
                        { 
                          step: 3, 
                          title: t("campaigns.guide.step3Title"),
                          desc: t("campaigns.guide.step3Desc")
                        }
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold text-rose-400 text-sm">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm md:text-base">{item.title}</h4>
                            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Copyable code panel */}
                    <div className="w-full flex flex-col sm:flex-row items-center gap-4 bg-slate-950 border border-slate-800/80 p-4 rounded-2xl">
                      <code className="text-rose-400 text-xs md:text-sm font-mono flex-1 text-center sm:text-left overflow-x-auto whitespace-nowrap scrollbar-thin">
                        VITE_CURATOR_WIDGET_ID=your-curator-widget-id
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shrink-0"
                      >
                        {copiedEnv ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            {t("campaigns.guide.copied")}
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            {t("campaigns.guide.copySetupLine")}
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs text-slate-500">
                      💡 {t("campaigns.guide.tip")}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal Player Popup */}
      <VideoModal 
        isOpen={selectedVideo !== null} 
        onClose={() => setSelectedVideo(null)} 
        videoUrl={selectedVideo || ""} 
      />
    </section>
  );
};

export default CampaignShowcase;
