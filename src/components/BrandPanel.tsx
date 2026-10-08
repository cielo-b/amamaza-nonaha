import { motion, useReducedMotion } from "framer-motion";
import { Globe, ShoppingBag, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";

interface BrandPanelProps {
  className?: string;
  /** Roomier layout: adds the company description, more floating objects and particles. */
  full?: boolean;
}

interface Chip {
  icon: LucideIcon;
  pos: string;
  delay: number;
  /** Only rendered in the roomy layout, where it cannot collide with the text. */
  fullOnly?: boolean;
}

const chips: Chip[] = [
  { icon: Globe, pos: "top-[10%] right-[8%]", delay: 0 },
  { icon: TrendingUp, pos: "top-[12%] right-[32%]", delay: 1.1 },
  { icon: ShoppingBag, pos: "top-[24%] left-[12%]", delay: 2.2, fullOnly: true },
  { icon: Users, pos: "top-[48%] right-[10%]", delay: 3.3, fullOnly: true },
];

// Network nodes in a 100x100 box, joined by the lines below.
const nodes = [
  [14, 62], [34, 40], [58, 55], [78, 28], [88, 66], [48, 82],
] as const;
const links = [[0, 1], [1, 2], [2, 3], [2, 4], [2, 5], [1, 3], [0, 5]] as const;

const particles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 2 + (i % 3),
  duration: 7 + (i % 5) * 1.6,
  delay: (i * 0.9) % 6,
}));

/**
 * Designed brand card that stands in for stock/AI photography: gradient and grid,
 * a pulsing connection network, floating icon chips, rising particles, a light
 * sweep, the logo and the tagline. Motion is switched off for reduced-motion users.
 */
const BrandPanel = ({ className = "", full = false }: BrandPanelProps) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const visibleChips = chips.filter((c) => full || !c.fullOnly);

  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br from-primary via-primary/85 to-slate-950 text-white ${className}`}
    >
      {/* Fine grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.12] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_30%,transparent_100%)]" />

      {/* Drifting light blobs */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/25 blur-3xl -z-10"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full bg-cyan-300/20 blur-3xl -z-10"
      />

      {/* Slowly rotating dashed rings */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/15 border-dashed -z-10"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-white/10 -z-10"
      />

      {/* Connection network */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full -z-10 opacity-60"
      >
        {links.map(([a, b], i) => (
          <motion.line
            key={`l${i}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="white"
            strokeOpacity={0.35}
            strokeWidth={0.35}
            strokeDasharray="1.5 2"
            vectorEffect="non-scaling-stroke"
            animate={reduce ? undefined : { strokeDashoffset: [0, -7] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
      {nodes.map(([x, y], i) => (
        <motion.span
          key={`n${i}`}
          aria-hidden="true"
          animate={reduce ? undefined : { scale: [1, 1.9, 1], opacity: [0.9, 0.35, 0.9] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          style={{ left: `${x}%`, top: `${y}%` }}
          className="absolute -z-10 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.55)]"
        />
      ))}

      {/* Rising particles */}
      {full &&
        particles.map((p, i) => (
          <motion.span
            key={`p${i}`}
            aria-hidden="true"
            initial={{ y: "110%", opacity: 0 }}
            animate={reduce ? { y: "50%", opacity: 0.4 } : { y: ["110%", "-10%"], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
            style={{ left: p.left, width: p.size, height: p.size }}
            className="absolute top-0 -z-10 rounded-full bg-white/80"
          />
        ))}

      {/* Light sweep */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: ["-120%", "220%"] }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent -z-10 pointer-events-none"
      />

      {/* Floating icon chips */}
      {visibleChips.map(({ icon: Icon, pos, delay }) => (
        <motion.div
          key={pos}
          aria-hidden="true"
          animate={reduce ? undefined : { y: [0, -9, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 5 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
          className={`absolute ${pos} w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-lg shadow-black/20 flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      ))}

      <div className="relative h-full flex flex-col justify-between gap-6 p-6 md:p-8">
        <img src={logo} alt={t("a11y.logo")} className="h-9 md:h-11 w-auto self-start brightness-0 invert opacity-95" />

        <div className="space-y-2">
          <div className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            {t("hero.tagline")}
          </div>
          <div className="text-lg md:text-2xl font-display font-semibold leading-snug">{t("hero.subtitle")}</div>
          {full && (
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
