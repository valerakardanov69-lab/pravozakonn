"use client";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "services", label: "Услуги" },
  { href: "about", label: "О нас" },
  { href: "team", label: "Команда" },
  { href: "contact", label: "Контакты" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-stone-900/95 via-stone-800/95 to-stone-900/95 backdrop-blur border-b border-amber-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center shadow-lg" style={{ flexShrink: 0 }}>
              <span className="text-white font-bold text-xl">П</span>
            </div>
            <span className="font-bold text-xl text-white">ПравоЗакон</span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-stone-300 hover:text-amber-400 font-medium transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+79950000417" className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-medium">+7 (995) 000-04-17</span>
            </a>
            <Button onClick={() => scrollToSection("contact")}>Консультация</Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-stone-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-stone-700">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-stone-300 hover:text-amber-400 font-medium py-2 text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a href="tel:+79950000417" className="flex items-center gap-2 text-stone-300 py-2">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+7 (995) 000-04-17</span>
              </a>
              <Button className="w-full" onClick={() => scrollToSection("contact")}>Консультация</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
