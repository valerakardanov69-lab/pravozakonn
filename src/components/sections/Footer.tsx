"use client";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Банкротство физ. лиц", href: "#services" },
    { label: "Работа с приставами", href: "#services" },
    { label: "Отмена судебных решений", href: "#services" },
    { label: "Составление документов", href: "#services" },
  ],
  company: [
    { label: "О компании", href: "#about" },
    { label: "Команда", href: "#team" },
    { label: "Контакты", href: "#contact" },
  ],
};

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-stone-900 to-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">П</span>
              </div>
              <span className="font-bold text-xl">ПравоЗакон</span>
            </div>
            <p className="text-stone-400 text-sm mb-6">
              Профессиональные юридические услуги. Работаем дистанционно по всей России.
            </p>
            <div className="space-y-3">
              <a href="tel:+79950000417" className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+7 (995) 000-04-17</span>
              </a>
              <a href="mailto:kardanova.zainab@mail.ru" className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">kardanova.zainab@mail.ru</span>
              </a>
              <div className="flex items-center gap-2 text-stone-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">ул. Терешкова, 26, Минеральные Воды</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-stone-400 hover:text-amber-400 text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-stone-400 hover:text-amber-400 text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-400">Режим работы</h4>
            <div className="space-y-2 text-sm text-stone-400">
              <p>Пн - Пт: 9:00 - 19:00</p>
              <p>Сб: 10:00 - 15:00</p>
              <p>Вс: выходной</p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-stone-400 mb-2">Мы в соцсетях</p>
              <div className="flex gap-3">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-700 rounded-lg flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <span className="text-sm font-medium">VK</span>
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-700 rounded-lg flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <span className="text-sm font-medium">TG</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-400">
              © 2026 ПравоЗакон. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-sm text-stone-400 hover:text-amber-400 transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="text-sm text-stone-400 hover:text-amber-400 transition-colors">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
