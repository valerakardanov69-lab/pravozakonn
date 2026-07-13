"use client";
import { Award, Clock, Users, FileCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: Clock, value: "10+", label: "лет опыта" },
  { icon: FileCheck, value: "300+", label: "выигранных дел" },
  { icon: Users, value: "500+", label: "клиентов" },
  { icon: Award, value: "95%", label: "успешных дел" },
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 lg:py-24 relative overflow-hidden min-h-screen scroll-mt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/3.webp')", backgroundSize: "cover" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100">
            <p className="text-amber-700 font-semibold mb-2">О компании</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Надежный партнер в решении правовых вопросов
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Профессиональная юридическая помощь гражданам по всей России. 
              Специализируемся на банкротстве, защите от судебных приставов, 
              отмене судебных решений и представительстве в судах всех инстанций.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Работаем дистанционно — вам не нужно приезжать в офис. 
              Все вопросы решаем онлайн: от консультации до полного сопровождения 
              в суде.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="flex items-center gap-3 bg-amber-50/80 rounded-xl p-3 transition-all duration-500 hover:scale-105 hover:bg-amber-100"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${index * 0.15}s`
                  }}
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6">Почему выбирают нас?</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p className="leading-relaxed">Бесплатная первичная консультация с анализом ситуации</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p className="leading-relaxed">Прозрачное ценообразование без скрытых платежей</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p className="leading-relaxed">Гарантия результата или возврат средств</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p className="leading-relaxed">Оперативное решение вопросов в кратчайшие сроки</p>
                </li>
              </ul>
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-200 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
