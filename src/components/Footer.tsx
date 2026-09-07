import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#020B14] text-white/70 py-12 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Brand Column */}
        <motion.div className="space-y-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt={t("a11y.logo")} className="h-10 w-auto invert brightness-0 invert-[1] opacity-90" />
          </div>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            {t("footer.description")}
          </p>
        </motion.div>

        {/* Company Column */}
        <motion.div className="space-y-6 lg:pl-4">
          <div className="text-xs font-bold text-white uppercase tracking-widest">{t("footer.company")}</div>
          <ul className="space-y-3">
            {[
              { label: t("footer.about"), link: "#" },
              { label: t("footer.services"), link: "#" },
              { label: t("footer.careers"), link: "#" },
              { label: t("footer.blog"), link: "#" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.link} className="text-sm text-white/50 hover:text-primary transition-colors duration-200">{l.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support Column */}
        <motion.div className="space-y-6 lg:pl-4">
          <div className="text-xs font-bold text-white uppercase tracking-widest">{t("footer.support")}</div>
          <ul className="space-y-3">
            {[
              { label: t("footer.helpCenter"), link: "#" },
              { label: t("footer.privacy"), link: "#" },
              { label: t("footer.terms"), link: "#" },
              { label: t("footer.faq"), link: "#faq" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.link} className="text-sm text-white/50 hover:text-primary transition-colors duration-200">{l.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter Column */}
        <motion.div className="space-y-6">
          <div className="text-xs font-bold text-white uppercase tracking-widest">{t("footer.newsletterTitle")}</div>
          <div className="space-y-4">
            <p className="text-sm text-white/50">{t("footer.newsletterDesc")}</p>
            <div className="relative group">
              <input
                type="email"
                placeholder={t("footer.newsletterPlaceholder")}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-primary/50 transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 rounded-md bg-primary hover:bg-primary/90 text-white transition-colors flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="container mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="space-y-4">
          <div className="text-xs text-white/30">
            {t("footer.copyright")}
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/share/1CESE9RUev/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/amamazanonaha.ltd?igsh=MW1hbXM1Y3kyYW93cQ==" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://youtube.com/@amamazanonaha_ltd?si=dfglHCZMn_Zpnl-" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@amamazanonaha.ltd?_r=1&_t=ZS-95aGYHcXCTc" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.05.51-.01 1.03.11 1.53.11.51.34 1.01.69 1.4.35.4.74.74 1.21.97.45.23.95.38 1.46.43.51.05 1.03.04 1.53-.02 1.04-.15 1.98-.82 2.49-1.74.34-.58.5-1.25.5-2.03V.02z" />
              </svg>
            </a>
            <a href="https://www.snapchat.com/add/amamazanonaharw?share_id=fRUspMCks4A&locale=en-GB" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5-3.358-7.5-7.5-7.5zm0 13.5c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm4.5 1.5c-1.242 0-2.25 1.008-2.25 2.25s1.008 2.25 2.25 2.25 2.25-1.008 2.25-2.25-1.008-2.25-2.25-2.25zm-9 0c-1.242 0-2.25 1.008-2.25 2.25s1.008 2.25 2.25 2.25 2.25-1.008 2.25-2.25-1.008-2.25-2.25-2.25z" />
              </svg>
            </a>
            <a href="https://wa.me/message/NFXFK7VWLPSCO1" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.003 12.039a11.818 11.818 0 001.576 6.048L0 24l6.096-1.6a11.805 11.805 0 005.698 1.481l.004 0c6.634 0 12.04-5.404 12.044-12.042a11.82 11.82 0 00-3.414-8.528z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30 group">
          <a href="#" className="hover:text-white transition-colors">{t("footer.privacyPolicy")}</a>
          <a href="#" className="hover:text-white transition-colors">{t("footer.termsOfService")}</a>
          <a href="#" className="hover:text-white transition-colors">{t("footer.cookiesSettings")}</a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
