import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import howItWorksImg from "@/assets/howit-works.jpg";
import VideoModal from "./VideoModal";

const steps = [
  {
    title: "Businesses & Brands Join",
    desc: "Local businesses and brands create listings for the products and services they offer. Verified profiles help customers understand what you sell, where you operate, and what makes your offer trustworthy.",
    bullets: [
      "Verified listings that build customer confidence",
      "Clear details: services, pricing, and locations",
      "Greater visibility across Rwanda’s market"
    ],
  },
  {
    title: "Digital Marketing & Promotion",
    desc: "We promote your listings through targeted campaigns and community-focused outreach. This ensures the right customers discover your offer when they’re searching for solutions.",
    bullets: [
      "Targeted promotion and discoverability",
      "Community-driven growth and brand awareness",
      "Consistent engagement across digital channels"
    ],
  },
  {
    title: "Customers Discover & Order",
    desc: "Customers browse, compare, and order with confidence. From local needs to unique experiences, everything is available in one place—reducing friction and improving trust.",
    bullets: [
      "Easy browsing and comparison",
      "Fast ordering from one platform",
      "Better trust with clear information"
    ],
  },
  {
    title: "Creators & Partners Earn",
    desc: "Creators, delivery partners, and affiliates earn through partnerships. We help match opportunities with people who can deliver value—while keeping the process simple and rewarding.",
    bullets: [
      "Creators and partners earn through referrals",
      "Delivery support that helps fulfill orders",
      "Opportunities tied to real impact"
    ],
  },
  {
    title: "Technology → Local Impact",
    desc: "Our technology connects communities to commerce. The result is measurable local impact—more opportunities, stronger businesses, and a growing economy driven by everyday people.",
    bullets: [
      "Jobs and income through active participation",
      "Stronger businesses across communities",
      "Local economic growth through digital access"
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HowItWorksSection = () => {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="container space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="section-badge tracking-widest text-[11px]">THE PROBLEM & SOLUTION</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground mt-4 mb-6">Solving fragmentations through digital connection</h2>
          <p className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-primary pl-6">
            Many customers struggle to find reliable opportunities in one place, while many businesses face limited visibility. Amamazanonaha Ltd solves this by creating a central digital platform for discoverability and commercial opportunity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Accordion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border-b border-border/50 pb-4"
              >
                <button
                  onClick={() => setActive(active === i ? -1 : i)}
                  className="w-full text-left flex items-center justify-between py-2 group"
                  aria-expanded={active === i}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-sm font-bold text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {i + 1}
                    </span>
                    <span className={`text-lg md:text-xl font-semibold transition-colors ${active === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {step.title}
                    </span>
                  </div>
                  {active === i ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pr-4 pt-3 pb-2">
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                          {step.desc}
                        </p>
                        {/* Optionally show bullets or hide them to keep it clean like mockup */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative lg:ml-10"
          >
            <div
              onClick={() => setVideoOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-muted aspect-[4/3] md:aspect-video flex items-center justify-center group cursor-pointer"
            >
              {/* Decorative blue dashes */}
              <div className="absolute top-0 right-[40%] md:right-32 w-2 h-12 bg-primary z-20 rounded-b-md transform -translate-y-2 group-hover:translate-y-0 transition-transform" />
              <div className="absolute bottom-0 left-[40%] md:left-12 w-2 h-12 bg-primary z-20 rounded-t-md transform translate-y-2 group-hover:translate-y-0 transition-transform" />

              <img
                src={howItWorksImg}
                alt="How it works video thumbnail"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

              <button className="relative z-20 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform active:scale-95">
                <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-primary ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
    </section>
  );
};

export default HowItWorksSection;
