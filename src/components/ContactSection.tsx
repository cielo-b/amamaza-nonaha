import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import contactImg from "@/assets/about.jpg";

import { ChevronDown, Send } from "lucide-react";

const SharpInput = ({ label, required, isTextArea, ...props }: any) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground flex items-center gap-1">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {isTextArea ? (
        <textarea
          {...props}
          className="w-full bg-white border border-border px-4 py-3 outline-none focus:border-primary transition-colors min-h-[120px] rounded-sm text-sm"
        />
      ) : (
        <input
          {...props}
          className="w-full bg-white border border-border px-4 py-3 outline-none focus:border-primary transition-colors rounded-sm text-sm"
        />
      )}
    </div>
  );
};

const PhoneInputWithCountry = ({ label, ...props }: any) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="flex bg-white border border-border rounded-sm overflow-hidden focus-within:border-primary transition-colors">
        <div className="flex items-center gap-2 px-3 border-r border-border bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors">
          <span className="text-sm font-medium">US</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-none px-3 flex items-center text-sm text-muted-foreground border-r border-border">
          +1
        </div>
        <input
          {...props}
          type="tel"
          className="flex-1 bg-transparent px-4 py-3 outline-none text-sm placeholder:text-muted-foreground/50"
          placeholder="000 - 000 - 0000"
        />
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
    }, 1000);
  };

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-section-alt overflow-hidden">
      <div className="container max-w-7xl px-4 md:px-0">
        <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/5 grid md:grid-cols-2">
          {/* Left: Image Side */}
          <div className="relative h-[300px] md:h-full overflow-hidden">
            <img
              src={contactImg}
              alt="Team discussing"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Form Side */}
          <div className="p-8 md:p-16 lg:p-20 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <span className="text-[14px] font-bold text-primary tracking-widest uppercase">Contact Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground font-display">
                Send us a message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-muted-foreground">Your names</label>
                <input
                  type="text"
                  placeholder="Enter your names"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-muted-foreground">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-muted-foreground">Phone number</label>
                <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:border-primary transition-colors">
                  <div className="flex items-center gap-2 px-4 border-r border-border bg-muted/5 cursor-pointer hover:bg-muted/10">
                    <span className="text-sm font-semibold">US</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center px-4 text-sm text-muted-foreground border-r border-border">
                    +1
                  </div>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="flex-1 bg-transparent px-5 py-4 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-muted-foreground">Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors min-h-[140px] text-sm resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00AEEF] hover:bg-[#0096cc] text-white font-bold py-7 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
