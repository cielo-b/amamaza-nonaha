const Footer = () => (
  <footer className="bg-foreground text-background/70 py-12">
    <div className="container grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div className="space-y-3">
        <div className="text-lg font-display font-bold text-background">✦ Amamazanonaha</div>
        <p className="text-sm leading-relaxed">
          Connecting communities and businesses across Rwanda through one powerful digital platform.
        </p>
      </div>
      {[
        { title: "Company", links: ["About", "Services", "Careers", "Blog"] },
        { title: "Support", links: ["Help Center", "Privacy", "Terms", "FAQ"] },
        { title: "Stay Connected", links: ["Twitter", "LinkedIn", "Instagram", "Facebook"] },
      ].map((col) => (
        <div key={col.title} className="space-y-3">
          <div className="text-sm font-semibold text-background uppercase tracking-wider">{col.title}</div>
          <ul className="space-y-2">
            {col.links.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm hover:text-background transition-colors duration-200">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="container mt-10 pt-6 border-t border-background/10 text-center text-xs text-background/40">
      © 2026 Amamazanonaha. All rights reserved.
    </div>
  </footer>
);

export default Footer;
