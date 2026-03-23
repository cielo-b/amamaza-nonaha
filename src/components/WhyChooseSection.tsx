import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import whyImg from "@/assets/why-choose.jpg";

const reasons = [
  { title: "Your Own Marketplace", desc: "List your products and services to reach more customers across Rwanda." },
  { title: "Community-Driven Growth", desc: "Join a network of businesses that support and promote each other." },
  { title: "Online Advertising, Global Standards", desc: "Professional digital marketing with local expertise." },
  { title: "Cultural Opportunity", desc: "Celebrate and promote Rwandan culture through commerce." },
];

const WhyChooseSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container grid md:grid-cols-2 gap-12 items-center" ref={ref}>
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img src={whyImg} alt="Partnership" className="w-full h-72 md:h-96 object-cover" />
        </div>

        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-foreground/15">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Why Choose Amamazanonaha?
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            We bring together cutting-edge technology, deep local knowledge, and a passion for community growth.
          </p>
          <ul className="space-y-4">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-sm text-primary-foreground/70">{r.desc}</div>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="secondary" size="lg" className="rounded-full px-8 mt-2">
            Explore Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
