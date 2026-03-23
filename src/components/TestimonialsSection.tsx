import { useScrollReveal } from "@/hooks/useScrollReveal";
import testimonialImg from "@/assets/testimonial.jpg";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This platform has transformed my business. I'm reaching customers I never knew existed. My sales grew by 3x in just 6 months.",
    name: "Claudine Uwimana",
    role: "Founder, Kigali Crafts Co.",
  },
  {
    quote: "Amamazanonaha gave our brand the digital presence we needed. Professional, reliable, and truly community-driven.",
    name: "Patrick Habimana",
    role: "CEO, GreenField Farms",
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 md:py-28">
      <div className="container space-y-12 text-center" ref={ref}>
        <div className="space-y-3">
          <span className="section-badge">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What They Say?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background rounded-xl shadow-sm border border-border p-8 text-left relative hover:shadow-md transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground/80 leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonialImg}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
