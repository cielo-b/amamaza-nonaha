import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";

interface BrandPanelProps {
  className?: string;
  /** Adds the longer company description under the tagline (used where there is room). */
  showDescription?: boolean;
}

/**
 * Designed brand card that stands in for stock/AI photography: a layered
 * gradient with slow-drifting light blobs, a fine grid, the logo and the tagline.
 */
const BrandPanel = ({ className = "", showDescription = false }: BrandPanelProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br from-primary via-primary/85 to-slate-950 text-white ${className}`}
    >
      {/* Fine grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.12] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_30%,transparent_100%)]" />

      {/* Drifting light blobs */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/25 blur-3xl -z-10"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full bg-cyan-300/20 blur-3xl -z-10"
      />

      {/* Slowly rotating ring */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/15 border-dashed -z-10"
      />

      <div className="relative h-full flex flex-col justify-between gap-6 p-6 md:p-8">
        <img src={logo} alt={t("a11y.logo")} className="h-9 md:h-11 w-auto self-start brightness-0 invert opacity-95" />

        <div className="space-y-2">
          <div className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            {t("hero.tagline")}
          </div>
          <div className="text-lg md:text-2xl font-display font-semibold leading-snug">{t("hero.subtitle")}</div>
          {showDescription && (
            <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-md pt-2">
              {t("footer.description")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandPanel;
