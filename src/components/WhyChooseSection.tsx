import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import whyImg from "@/assets/why-choose.jpg";

const reasons = [
  { title: "Multi-category access", desc: "Serving different needs through one connected ecosystem." },
  { title: "Digital-first approach", desc: "Built for the modern market where visibility and accessibility matter." },
  { title: "Local relevance, Global mindset", desc: "Focusing on Rwanda while positioning for broader global opportunity." },
  { title: "Business growth support", desc: "Moving brands from being unseen to being discoverable and competitive." },
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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const WhyChooseSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Dual Overlapping Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[360px] md:h-[600px] flex items-center"
        >
          <div className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden shadow-2xl z-10 border-[8px] border-background transition-colors duration-300">
            <img src={whyImg} alt="Partnership" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[65%] h-[65%] rounded-2xl overflow-hidden shadow-2xl z-20 border-[8px] border-background transition-colors duration-300">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team meeting" className="w-full h-full object-cover" />
          </div>
          {/* Decorative Dot Pattern or Blur behind */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.span variants={itemVariants} className="section-badge tracking-widest text-[11px]">
            WHY CHOOSE US
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-medium text-foreground">
            Why Choose Amamazanonaha?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed max-w-lg pb-4">
            We bring together cutting-edge technology, deep local knowledge, and a passion for community growth.
          </motion.p>
          <motion.ul variants={containerVariants} className="space-y-6">
            {reasons.map((r) => (
              <motion.li variants={itemVariants} key={r.title} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{r.title}</div>
                  <div className="text-[15px] text-muted-foreground mt-1 leading-relaxed">{r.desc}</div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={itemVariants} className="pt-8">
            <Button size="lg" className="rounded-md px-10 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300">
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
