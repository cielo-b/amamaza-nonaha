import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
    const { t } = useTranslation();

    const isDirectVideo = (url: string) => {
        return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg") || url.startsWith("blob:");
    };

    // Extract YouTube or TikTok ID if it's a social link
    const getEmbedUrl = (url: string) => {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
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

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[1000px] w-[95vw] p-0 bg-black border-none overflow-hidden sm:rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="relative w-full pt-[56.25%] bg-black group">
                    {isDirectVideo(videoUrl) ? (
                        <video
                            src={videoUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            controls
                            autoPlay
                            playsInline
                        >
                            {t("a11y.videoUnsupported")}
                        </video>
                    ) : (
                        <iframe
                            src={getEmbedUrl(videoUrl)}
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={t("a11y.videoPlayer")}
                        />
                    )}

                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors focus:outline-none z-50 bg-black/20 rounded-full backdrop-blur-sm"
                        aria-label={t("a11y.closeVideo")}
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VideoModal;
