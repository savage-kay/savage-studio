import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  const { data: config } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_config").select("*").eq("id", 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: `hsla(0, 0%, 4%, ${bgOpacity.get()})` }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 z-[-1] h-[72px] backdrop-blur-md border-b border-gold/10"
        style={{ opacity: bgOpacity }}
      />
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display font-black text-xl text-gradient-gold tracking-tight"
        >
          SAVAGE
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-body text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                active === link.href.slice(1)
                  ? "text-gold"
                  : "text-muted-foreground hover:text-gold"
              }`}
            >
              {link.label}
            </button>
          ))}
          {config?.cv_url && (
            <a
              href={config.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-gold/30 text-gold font-body text-xs tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-gold"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-gold"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-gold"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-body text-sm tracking-[0.3em] uppercase transition-colors duration-300 ${
                active === link.href.slice(1)
                  ? "text-gold"
                  : "text-muted-foreground hover:text-gold"
              }`}
            >
              {link.label}
            </button>
          ))}
          {config?.cv_url && (
            <a
              href={config.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gold/30 text-gold font-body text-sm tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors mt-2"
            >
              Resume PDF
            </a>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
