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
          Connecting communities and businesses across Rwanda through one powerful digital platform.
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
