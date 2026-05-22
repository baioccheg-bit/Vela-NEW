"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function FlameIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 0-2 2-2 5 0 1.5 1 2.5 1 4 0 0-2-1-3-3 0 0-1 2 0 5 1 3 4 4 4 7 0 0 3-2 3-6 0-1.5-.5-2.5-.5-3.5 0 0 1.5 2 1.5 4.5 0 0 2-2 2-5 0-4-3-8-6-8z" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

const navLinks = [
  { label: "Plataforma", href: "/plataforma" },
  { label: "Agentes", href: "/agentes" },
  { label: "Planos", href: "/planos" },
  { label: "Sobre", href: "/sobre" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-2.5 shadow-xl shadow-obsidian/5"
            : "py-4 bg-ivory/90"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-champagne flex items-center justify-center text-obsidian shadow-sm group-hover:shadow-md transition-shadow">
                <FlameIcon className="w-5 h-5" />
              </div>
              <span className="font-cormorant text-xl font-bold tracking-tight text-obsidian">
                VELA
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-obsidian/70 hover:text-obsidian rounded-full hover:bg-obsidian/5 transition-all duration-300"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="/entrar"
                className="px-4 py-2 text-sm text-obsidian/70 hover:text-obsidian rounded-full hover:bg-obsidian/5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Entrar
              </motion.a>
              <motion.a
                href="/solicitar-acesso"
                className="px-5 py-2.5 bg-champagne text-obsidian text-sm font-medium rounded-full hover:bg-amber-gold transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar acesso
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span
                  className={`h-0.5 w-full bg-obsidian transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-[3px]" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-obsidian transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-obsidian transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-xl font-cormorant text-obsidian py-3 px-4 rounded-xl hover:bg-obsidian/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="h-px bg-obsidian/10 my-4" />
              <a
                href="/entrar"
                className="text-base text-obsidian/70 py-3 px-4"
                onClick={() => setMobileOpen(false)}
              >
                Entrar
              </a>
              <a
                href="/solicitar-acesso"
                className="mx-4 mt-2 px-6 py-3.5 bg-champagne text-obsidian text-base font-medium rounded-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Solicitar acesso
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
