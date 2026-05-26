import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Sun, Moon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import logo from "@/assets/logo.png";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "rw", label: "Kinyarwanda" },
    { code: "fr", label: "Français" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
      >
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Amamazanonaha"
              className="h-12 md:h-14 w-auto dark:invert transition-all hover:scale-105"
            />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}

            <div className="flex items-center gap-4 border-l border-border/50 pl-6 ml-2">
              {mounted && (
                <div className="flex items-center gap-2 mr-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-full p-2 hover:bg-muted/60 transition-colors flex items-center gap-1.5 text-foreground/70">
                        <Languages className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">{i18n.language.slice(0, 2)}</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px] rounded-xl">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className={`cursor-pointer font-medium ${i18n.language === lang.code ? "text-primary bg-primary/5" : ""
                            }`}
                        >
                          {lang.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full p-2 hover:bg-muted/60 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                  </button>
                </div>
              )}
              <a href="#contact">
                <Button size="sm" className="rounded-md px-10 py-5 shadow-sm bg-primary hover:bg-primary/90 text-white border-0">
                  {t("nav.contact")}
                </Button>
              </a>

            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-1">
            {mounted && (
              <>
                {/* Language Switcher — visible on mobile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full p-2 hover:bg-muted/60 transition-colors flex items-center gap-1 text-foreground/70">
                      <Languages className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">{i18n.language.slice(0, 2)}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px] rounded-xl">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`cursor-pointer font-medium ${i18n.language === lang.code ? "text-primary bg-primary/5" : ""}`}
                      >
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme toggle */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full p-2 hover:bg-muted/60 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                </button>
              </>
            )}
            <button
              className="p-2 z-[60] relative"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/90 md:hidden flex flex-col items-center justify-center"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
              className="flex flex-col items-center gap-8 w-full px-10"
            >
              {navLinks.map((l) => (
                <motion.a
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  key={l.href}
                  href={l.href}
                  className="text-3xl font-display font-bold text-foreground hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                href="#contact"
                onClick={() => setOpen(false)}
                className="w-full max-w-[200px] mt-6"
              >
                <Button size="lg" className="rounded-md w-full shadow-lg bg-primary hover:bg-primary/90 text-white">
                  {t("nav.contact")}
                </Button>

              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
