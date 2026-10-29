import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

const LANDSCAPE_RATIO = 16 / 9;

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
    const { t } = useTranslation();

    /**
     * Width / height of the loaded video. Most of the brand clips are 9:16, and
     * a fixed 16:9 frame pillarboxed them with heavy black bars, so the frame
     * follows the source instead. Null until the metadata arrives, and reset
     * between clips so a portrait video does not leave a tall frame behind for
     * the next landscape one.
     */
    const [ratio, setRatio] = useState<number | null>(null);
    useEffect(() => setRatio(null), [videoUrl, isOpen]);

    const isDirectVideo = (url: string) => {
        return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg") || url.startsWith("blob:");
    };

    // Extract YouTube or TikTok ID if it's a social link
    const getEmbedUrl = (url: string) => {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            const videoId = (match && match[2].length === 11) ? match[2] : null;
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        if (url.includes("tiktok.com")) {
            const regExp = /\/video\/(\d+)/;
            const match = url.match(regExp);
            const videoId = match ? match[1] : null;
            if (videoId) {
                return `https://www.tiktok.com/embed/v2/${videoId}`;
            }
        }
        return url;
    };

    const isPortrait = ratio !== null && ratio < 1;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className={`p-0 bg-black border-none overflow-hidden sm:rounded-2xl flex items-center justify-center shadow-2xl ${
                    isPortrait ? "max-w-[min(92vw,26rem)]" : "max-w-[1000px] w-[95vw]"
                }`}
            >
                <div
                    className="relative w-full bg-black group max-h-[85vh]"
                    style={{ aspectRatio: ratio ?? LANDSCAPE_RATIO }}
                >
                    {isDirectVideo(videoUrl) ? (
                        <video
                            src={videoUrl}
                            className="absolute inset-0 w-full h-full object-contain"
                            controls
                            autoPlay
                            playsInline
                            onLoadedMetadata={(event) => {
                                const { videoWidth, videoHeight } = event.currentTarget;
                                if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
                            }}
                        >
                            {t("a11y.videoUnsupported")}
                        </video>
                    ) : (
                        <iframe
                            src={getEmbedUrl(videoUrl)}
                            className="absolute inset-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={t("a11y.videoPlayer")}
                        />
                    )}

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2.5 text-white hover:text-rose-400 transition-colors focus:outline-none z-50 bg-black/80 hover:bg-black rounded-full backdrop-blur-md shadow-2xl border border-white/20 cursor-pointer"
                        aria-label={t("a11y.closeVideo")}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {!isDirectVideo(videoUrl) && (
                        <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
                            <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all shadow-xl hover:scale-105"
                            >
                                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                                <span>Watch Directly on Source</span>
                            </a>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VideoModal;
