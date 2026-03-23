import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useScrollReveal();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-section-alt">
      <div className="container max-w-2xl" ref={ref}>
        <div className="text-center space-y-3 mb-10">
          <span className="section-badge">Contact Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Send us a message</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-sm border border-border p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input placeholder="Your name" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Phone number</label>
              <Input placeholder="+250 788 123 456" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input placeholder="How can we help?" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Message</label>
            <Textarea placeholder="Write your message here..." rows={4} required />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
