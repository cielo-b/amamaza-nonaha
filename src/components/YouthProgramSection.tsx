import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { 
  Sparkles, 
  Rocket, 
  Send, 
  CheckCircle2, 
  User, 
  Users,
  Phone, 
  Mail, 
  MapPin, 
  Palette, 
  Share2, 
  HeartHandshake, 
  TrendingUp, 
  Globe2,
  Loader2,
  MessageCircle,
  Clock,
  Instagram,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RWANDA_DISTRICTS = [
  // City of Kigali
  { group: "City of Kigali", items: ["Gasabo", "Kicukiro", "Nyarugenge"] },
  // Northern Province
  { group: "Northern Province", items: ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"] },
  // Southern Province
  { group: "Southern Province", items: ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"] },
  // Eastern Province
  { group: "Eastern Province", items: ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"] },
  // Western Province
  { group: "Western Province", items: ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"] },
  // Other
  { group: "Other", items: ["Diaspora / Outside Rwanda"] }
];

const WHATSAPP_NUMBER = "250784807389";
const WHATSAPP_DISPLAY = "+250 784 807 389";

export const YouthProgramSection: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Visibility flag: Set VITE_SHOW_YOUTH_PROGRAM=false in Netlify/.env to completely remove the section
  const isVisible = import.meta.env.VITE_SHOW_YOUTH_PROGRAM !== "false";

  // Deadline logic: Configurable via env var (e.g. 2026-11-15T23:59:59), defaults to Nov 15, 2026
  const deadlineStr = import.meta.env.VITE_YOUTH_PROGRAM_DEADLINE || "2026-11-15T23:59:59+02:00";
  const deadlineDate = new Date(deadlineStr);
  const isClosed = !isNaN(deadlineDate.getTime()) && new Date() > deadlineDate;

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    email: "",
    district: "",
    talent: "",
    message: ""
  });

  const webhookUrl =
    import.meta.env.VITE_YOUTH_PROGRAM_SHEET_URL ||
    "https://script.google.com/macros/s/AKfycbyojtulGUYw5jsSNLdmYs0duhxwg_9PFQsb9WJY2lAu1DFVezAzhBwqag-7lqJxPb07/exec";

  // If completely hidden via feature flag, do not render
  if (!isVisible) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleShare = () => {
    const url = `${window.location.origin}/#youth-program`;
    if (navigator.share) {
      navigator.share({
        title: "100 Young People Program — Amamazanonaha Ltd",
        text: "Are you one of the 100 young people who will shape the future with Amamazanonaha Ltd? Register now!",
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isClosed) {
      toast.error(t("youthProgram.closedTitle"));
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error(t("youthProgram.form.fullName"));
      return;
    }
    if (!formData.gender) {
      toast.error(t("youthProgram.form.genderPlaceholder"));
      return;
    }
    if (!formData.phone.trim()) {
      toast.error(t("youthProgram.form.phone"));
      return;
    }
    if (!formData.district) {
      toast.error(t("youthProgram.form.districtPlaceholder"));
      return;
    }
    if (!formData.talent) {
      toast.error(t("youthProgram.form.talentPlaceholder"));
      return;
    }

    setLoading(true);

    const cleanPhone = formData.phone.trim();
    const formattedPhone = cleanPhone.startsWith("+")
      ? cleanPhone
      : `+250 ${cleanPhone.replace(/^0+/, "")}`;

    const payload = {
      fullName: formData.fullName.trim(),
      gender: formData.gender,
      phone: formattedPhone,
      email: formData.email.trim(),
      district: formData.district,
      talent: formData.talent,
      message: formData.message.trim()
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      setSubmitted(true);
      toast.success(t("youthProgram.form.successTitle"), {
        description: t("youthProgram.form.successDesc")
      });
      setFormData({
        fullName: "",
        gender: "",
        phone: "",
        email: "",
        district: "",
        talent: "",
        message: ""
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(t("youthProgram.form.errorTitle"), {
        description: t("youthProgram.form.errorDesc")
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="youth-program" 
      className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden scroll-mt-20"
    >
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl px-4 mx-auto relative z-10">
        
        {/* Top Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wider uppercase"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>{t("youthProgram.badge")}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-display break-words"
          >
            {t("youthProgram.highlight")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-medium text-primary italic"
          >
            "{t("youthProgram.tagline")}"
          </motion.p>

          {/* Deadline / Availability Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-center">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{isClosed ? t("youthProgram.closedTitle") : t("youthProgram.deadlineNotice")}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{t("youthProgram.deadlineBadge")}</span>
            </div>
          </motion.div>
        </div>

        {/* 2-Column Main Content Card */}
        <div className="bg-card border border-border/70 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl shadow-primary/5 overflow-hidden grid lg:grid-cols-12 gap-0">
          
          {/* Left Column: Story, Value Prop & Pillars (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 bg-gradient-to-br from-slate-900 via-primary/95 to-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Subtle tech grid background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold">
                <Rocket className="w-3.5 h-3.5" />
                <span>Launching October 2026</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white leading-tight">
                  {t("youthProgram.title")}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {t("youthProgram.description")}
                </p>
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-100 flex items-start gap-3 backdrop-blur-md shadow-sm">
                  <Sparkles className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm italic font-medium leading-relaxed">
                    {t("youthProgram.openToAll")}
                  </p>
                </div>
              </div>

              {/* 3 Pillars */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <TrendingUp className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{t("youthProgram.benefits.visibility.title")}</h4>
                    <p className="text-white/70 text-xs mt-0.5">{t("youthProgram.benefits.visibility.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <HeartHandshake className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{t("youthProgram.benefits.mentorship.title")}</h4>
                    <p className="text-white/70 text-xs mt-0.5">{t("youthProgram.benefits.mentorship.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{t("youthProgram.benefits.opportunities.title")}</h4>
                    <p className="text-white/70 text-xs mt-0.5">{t("youthProgram.benefits.opportunities.desc")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions on Left */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/10 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleShare}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2.5 rounded-xl cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Amamazanonaha!%20I%20want%20more%20information%20about%20the%20100%20Youth%20Program`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-300 hover:text-emerald-200 font-medium transition-colors py-1 sm:py-0"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="break-all sm:break-normal">WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Form or Closed State (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 bg-card flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {isClosed ? (
                /* Program Closed View */
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 px-4 space-y-6 max-w-lg mx-auto"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-xl">
                    <Clock className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {t("youthProgram.closedSubtitle")}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                      {t("youthProgram.closedTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {t("youthProgram.closedDesc")}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/50 border border-border text-center text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">
                      {t("youthProgram.closedNotice")}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                    <a
                      href="https://www.instagram.com/amamazanonaha.ltd"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full rounded-xl gap-2 cursor-pointer">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        <span>Instagram Updates</span>
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Amamazanonaha!%20I%20have%20an%20inquiry%20regarding%20the%20100%20Youth%20Program`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-2 cursor-pointer">
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp Team</span>
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ) : submitted ? (
                /* Success View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 px-4 space-y-6 max-w-md mx-auto"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                      {t("youthProgram.form.successTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {t("youthProgram.form.successDesc")}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/50 border border-border text-left text-xs text-muted-foreground space-y-1.5">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      Next Step:
                    </p>
                    <p>Our team will review your submission and reach out directly to the WhatsApp / phone number you provided.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl cursor-pointer"
                      onClick={() => setSubmitted(false)}
                    >
                      {t("youthProgram.form.submitAnother")}
                    </Button>
                    <Button
                      className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white cursor-pointer"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share With Friends
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Registration Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                      {t("youthProgram.form.title")}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {t("youthProgram.form.subtitle")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Full Name & Gender Grid */}
                    <div className="grid sm:grid-cols-12 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-7 space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          <span>{t("youthProgram.form.fullName")} <span className="text-destructive">*</span></span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t("youthProgram.form.fullNamePlaceholder")}
                          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                        />
                      </div>

                      {/* Gender */}
                      <div className="sm:col-span-5 space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-primary" />
                          <span>{t("youthProgram.form.gender")} <span className="text-destructive">*</span></span>
                        </label>
                        <select
                          name="gender"
                          required
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full truncate px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm cursor-pointer"
                        >
                          <option value="">{t("youthProgram.form.genderPlaceholder")}</option>
                          <option value="Male">{t("youthProgram.form.male")}</option>
                          <option value="Female">{t("youthProgram.form.female")}</option>
                        </select>
                      </div>
                    </div>

                    {/* Phone & Email Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>{t("youthProgram.form.phone")} <span className="text-destructive">*</span></span>
                        </label>
                        <div className="flex items-center rounded-xl border border-input bg-background focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all overflow-hidden shadow-sm">
                          <span className="px-3 py-3 bg-muted text-muted-foreground text-xs font-bold border-r border-input select-none shrink-0">
                            +250
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("youthProgram.form.phonePlaceholder")}
                            className="w-full min-w-0 px-3 py-3 bg-transparent text-foreground text-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{t("youthProgram.form.email")}</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("youthProgram.form.emailPlaceholder")}
                          className="w-full min-w-0 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* District & Talent Dropdowns Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* District Selection */}
                      <div className="space-y-1.5 min-w-0">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>{t("youthProgram.form.district")} <span className="text-destructive">*</span></span>
                        </label>
                        <select
                          name="district"
                          required
                          value={formData.district}
                          onChange={handleChange}
                          className="w-full max-w-full truncate px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm cursor-pointer"
                        >
                          <option value="">{t("youthProgram.form.districtPlaceholder")}</option>
                          {RWANDA_DISTRICTS.map((prov) => (
                            <optgroup key={prov.group} label={prov.group}>
                              {prov.items.map((dist) => (
                                <option key={dist} value={dist}>
                                  {dist}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>

                      {/* Talent Category */}
                      <div className="space-y-1.5 min-w-0">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-primary" />
                          <span>{t("youthProgram.form.talent")} <span className="text-destructive">*</span></span>
                        </label>
                        <select
                          name="talent"
                          required
                          value={formData.talent}
                          onChange={handleChange}
                          className="w-full max-w-full truncate px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm cursor-pointer"
                        >
                          <option value="">{t("youthProgram.form.talentPlaceholder")}</option>
                          <option value="Singer / Vocalist">{t("youthProgram.categories.singer")}</option>
                          <option value="Pianist">{t("youthProgram.categories.pianist")}</option>
                          <option value="Guitarist">{t("youthProgram.categories.guitarist")}</option>
                          <option value="Drummer">{t("youthProgram.categories.drummer")}</option>
                          <option value="Dancer">{t("youthProgram.categories.dancer")}</option>
                          <option value="Comedian">{t("youthProgram.categories.comedian")}</option>
                          <option value="Basketball or Football Player">{t("youthProgram.categories.sports")}</option>
                          <option value="Fashion Model">{t("youthProgram.categories.model")}</option>
                          <option value="Content Creator">{t("youthProgram.categories.content")}</option>
                          <option value="Photographer">{t("youthProgram.categories.photography")}</option>
                          <option value="Designer">{t("youthProgram.categories.designer")}</option>
                          <option value="Tailor">{t("youthProgram.categories.tailor")}</option>
                          <option value="Crafter">{t("youthProgram.categories.crafter")}</option>
                          <option value="Event Decorator">{t("youthProgram.categories.decor")}</option>
                          <option value="Entrepreneur">{t("youthProgram.categories.entrepreneur")}</option>
                          <option value="Other Talent">{t("youthProgram.categories.other")}</option>
                        </select>
                      </div>
                    </div>

                    {/* Dream & Motivation Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          {t("youthProgram.form.dream")}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-normal lowercase">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("youthProgram.form.dreamPlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{t("youthProgram.form.submitting")}</span>
                          </>
                        ) : (
                          <>
                            <span>{t("youthProgram.form.submit")}</span>
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-[11px] text-center text-muted-foreground pt-1">
                      🔒 Your information is saved directly to Amamazanonaha's official program registry.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default YouthProgramSection;
