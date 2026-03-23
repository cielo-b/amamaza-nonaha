import { Building2, ShoppingBag, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Building2,
    title: "Property Discovery",
    desc: "Find houses, apartments, and land across Rwanda with verified listings and virtual tours.",
  },
  {
    icon: ShoppingBag,
    title: "Services & Products Marketplace",
    desc: "Browse and order from hundreds of local businesses — from crafts to tech, delivered to your door.",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth & Empowerment",
    desc: "We help local businesses grow with digital marketing, branding, and visibility tools.",
  },
];

const ServicesSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="services" className="py-20 md:py-28 bg-section-alt">
      <div className="container text-center space-y-12" ref={ref}>
        <div className="space-y-3">
          <span className="section-badge">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A platform built to connect businesses, creators, and customers across Rwanda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="bg-background rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-left group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
