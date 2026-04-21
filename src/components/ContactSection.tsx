import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import contactImg from "@/assets/about.jpg";
import { useTranslation } from "react-i18next";

import { ChevronDown, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Synchronized with your EmailJS Template screenshot
      const templateParams = {
        name: formData.name,       // matches {{name}}
        email: formData.email,     // matches {{email}}
        message: formData.message, // matches {{message}}
        title: "New Website Inquiry" // matches {{title}} in subject
      };

      // Use your values:
      const SERVICE_ID = "service_4y077ac"; // Correct
      const TEMPLATE_ID = "template_kfdl6js"; // Paste your Template ID here
      const PUBLIC_KEY = "W9c2q-jatX_zogst8";  // Paste your Public Key here

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success(t("contact.success"), {
          description: t("contact.successDesc"),
        });
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t("contact.error"), {
        description: t("contact.errorDesc"),
      });
    } finally {
      setLoading(false);
    }
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
                <span className="text-[14px] font-bold text-primary tracking-widest uppercase">{t("contact.badge")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground font-display">
                {t("contact.title")}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{t("contact.labels.name")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.placeholders.name")}
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-all text-[15px] shadow-sm active:ring-2 active:ring-primary/10"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{t("contact.labels.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.placeholders.email")}
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-all text-[15px] shadow-sm active:ring-2 active:ring-primary/10"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{t("contact.labels.phone")}</label>
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
                    placeholder={t("contact.placeholders.phone")}
                    className="flex-1 bg-transparent px-5 py-4 outline-none text-[15px]"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-primary transition-colors">{t("contact.labels.message")}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("contact.placeholders.message")}
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 outline-none focus:border-primary transition-all min-h-[140px] text-[15px] resize-none shadow-sm active:ring-2 active:ring-primary/10"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00AEEF] hover:bg-[#0096cc] text-white font-bold py-7 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? t("contact.sending") : t("contact.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
