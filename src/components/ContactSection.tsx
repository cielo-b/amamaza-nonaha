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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate real network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    toast.success("Thank you! Your message has been sent.", {
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
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
              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">Your names</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your names"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-all text-[15px] shadow-sm active:ring-2 active:ring-primary/10"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-all text-[15px] shadow-sm active:ring-2 active:ring-primary/10"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">Phone number</label>
                <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:border-primary transition-all shadow-sm active:ring-2 active:ring-primary/10">
                  <div className="flex items-center gap-2 px-5 border-r border-border bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors">
                    <span className="text-sm font-bold">RW</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center px-4 text-sm font-medium text-foreground border-r border-border">
                    +250
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="7XX XXX XXX"
                    className="flex-1 bg-transparent px-5 py-4 outline-none text-[15px]"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-all min-h-[140px] text-[15px] resize-none shadow-sm active:ring-2 active:ring-primary/10"
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
