import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#home" className="text-xl font-display font-bold text-primary tracking-tight">
          ✦ Amamazanonaha
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="rounded-full px-6">
            Contact
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border py-4 px-6 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm font-medium text-foreground/70 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="rounded-full w-full mt-2">Contact</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
