import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";

/** The one video currently playing with sound, so turning one on silences the others. */
let activeVideo: HTMLVideoElement | null = null;

interface SoundVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  /** Extra classes for the speaker button, e.g. to move it to another corner. */
  toggleClassName?: string;
}

/**
 * Looping, muted-by-default video with a speaker button. Browsers only allow
 * autoplay while muted, so the button is how visitors turn the sound on; it also
 * turns it off again. Sound switches off by itself when the video scrolls out of
 * view or when another video's sound is turned on.
 *
 * Renders the <video> and the button as siblings: place it inside a `relative`
 * container.
 */
const SoundVideo = ({ toggleClassName = "bottom-3 right-3", ...videoProps }: SoundVideoProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const sync = () => setMuted(video.muted);
    video.addEventListener("volumechange", sync);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.muted) video.muted = true;
      },
      { threshold: 0.2 },
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("volumechange", sync);
      observer.disconnect();
      if (activeVideo === video) activeVideo = null;
    };
  }, []);

  const toggle = (event: React.MouseEvent) => {
    // Cards that open a popup on click must not react to this button.
    event.stopPropagation();
    event.preventDefault();
    const video = ref.current;
    if (!video) return;

    if (video.muted) {
      if (activeVideo && activeVideo !== video) activeVideo.muted = true;
      activeVideo = video;
      video.muted = false;
      video.volume = 1;
      void video.play().catch(() => undefined);
    } else {
      video.muted = true;
      if (activeVideo === video) activeVideo = null;
    }
  };

  return (
    <>
      <video ref={ref} autoPlay muted loop playsInline {...videoProps} />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? t("a11y.unmute") : t("a11y.mute")}
        className={`absolute z-30 w-10 h-10 rounded-full bg-black/55 hover:bg-primary backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-lg transition-colors active:scale-95 ${toggleClassName}`}
      >
        {!muted && (
          <span aria-hidden="true" className="absolute inset-0 rounded-full border border-white/60 animate-ping opacity-60" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={muted ? "off" : "on"}
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
};

export default SoundVideo;
