import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Footer = () => (
  <footer className="bg-[#020B14] text-white/70 py-12 overflow-hidden">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
    >
      {/* Brand Column */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Amamazanonaha" className="h-10 w-auto invert brightness-0 invert-[1] opacity-90" />
        </div>
        <p className="text-sm leading-relaxed text-white/60 max-w-xs">
          Empowering digital trade, visibility, and growth through one modern platform connecting Rwanda and Africa to the world.
        </p>
      </motion.div>

      {/* Links Columns */}
      {[
        { title: "Company", links: ["About", "Services", "Careers", "Blog"] },
        { title: "Support", links: ["Help Center", "Privacy", "Terms", "FAQ"] },
      ].map((col) => (
        <motion.div variants={itemVariants} key={col.title} className="space-y-6 lg:pl-4">
          <div className="text-xs font-bold text-white uppercase tracking-widest">{col.title}</div>
          <ul className="space-y-3">
            {col.links.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors duration-200">{l}</a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}

      {/* Newsletter Column */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-xs font-bold text-white uppercase tracking-widest">Stay up to date</div>
        <div className="space-y-4">
          <p className="text-sm text-white/50">Join our newsletter for the latest updates.</p>
          <div className="relative group">
            <input
              type="email"
              placeholder="Your email address"
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
          © 2026 Amamazanonaha. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-white/40 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="text-white/40 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-white/40 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="https://www.tiktok.com/@amamaza_nonaha" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.05.51-.01 1.03.11 1.53.11.51.34 1.01.69 1.4.35.4.74.74 1.21.97.45.23.95.38 1.46.43.51.05 1.03.04 1.53-.02 1.04-.15 1.98-.82 2.49-1.74.34-.58.5-1.25.5-2.03V.02z" />
            </svg>
          </a>

        </div>
      </div>

      <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30 group">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Cookies Settings</a>
      </div>
    </motion.div>
  </footer>
);

export default Footer;
