import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import howItWorksImg from "@/assets/howit-works.jpg";

const steps = [
  {
    title: "Businesses & Brands Join",
    desc: "Local companies list their products and services on our platform, reaching thousands of potential customers daily.",
  },
  {
    title: "Digital Marketing & Promotion",
    desc: "We promote businesses through targeted digital campaigns and social media outreach.",
  },
  {
    title: "Customers Discover & Order",
    desc: "Users browse, compare and order products and services — all from one convenient platform.",
  },
  {
    title: "Creators & Partners Earn",
    desc: "Content creators, delivery partners, and affiliates earn through our partnership programs.",
  },
  {
    title: "Technology → Local Impact",
    desc: "Our tech connects communities to commerce, creating jobs and growing the local economy.",
  },
];

const HowItWorksSection = () => {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28">
      <div className="container space-y-8" ref={ref}>
        <div>
          <span className="section-badge">The Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">How it works</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-1">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                  active === i
                    ? "bg-primary/5 border-l-2 border-primary"
                    : "hover:bg-muted/50 border-l-2 border-transparent"
                }`}
              >
                <span className={`text-sm font-bold ${active === i ? "text-primary" : "text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <span className={`font-medium flex-1 ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${active === i ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={howItWorksImg} alt="How it works" className="w-full h-64 md:h-80 object-cover" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed px-1">
              {steps[active].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
