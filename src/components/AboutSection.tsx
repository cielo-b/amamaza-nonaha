import aboutImg from "@/assets/about.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "100+", label: "Companies" },
  { value: "500+", label: "Products" },
  { value: "2K+", label: "Users" },
];

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container grid md:grid-cols-2 gap-12 items-center" ref={ref}>
        <div className="grid grid-cols-2 gap-3">
          <img
            src={aboutImg}
            alt="Team collaboration"
            className="col-span-2 rounded-xl object-cover w-full h-64 shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <span className="section-badge">About</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">About us</h2>
          <p className="text-muted-foreground leading-relaxed">
            Amamazanonaha is a platform connecting local people to over 100+ companies in Rwanda.
            From lifestyle to agriculture, education, real estate, and more —
            we bring everything you need into one seamless digital experience, empowering communities and entrepreneurs.
          </p>
          <div className="flex gap-8 pt-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
