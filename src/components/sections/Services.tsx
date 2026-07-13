"use client";
import { Card } from "@/components/ui/card";
import { Scale, FileText, Users, Gavel, Building, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/lib/db";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Банкротство физ. лиц": Scale,
  "Работа с судебными приставами": Users,
  "Отмена судебных приказов": Gavel,
  "Отмена судебных решений": Gavel,
  "Составление документов": FileText,
  "Представление в судах": Building,
  "Дистанционная работа": Globe,
};

const defaultServices: Service[] = [
  { id: 1, title: "Банкротство физ. лиц", description: "Полное сопровождение процедуры банкротства граждан, защита от коллекторов и кредиторов", updatedAt: "" },
  { id: 2, title: "Работа с судебными приставами", description: "Снятие арестов, уменьшение удержаний, защита от незаконных действий приставов", updatedAt: "" },
  { id: 3, title: "Отмена судебных решений", description: "Отмена судебных приказов и заочных решений, восстановление сроков для обжалования", updatedAt: "" },
  { id: 4, title: "Составление документов", description: "Исковые заявления, жалобы, претензии любой сложности по всем отраслям права", updatedAt: "" },
  { id: 5, title: "Представление в судах", description: "Первая инстанция, апелляция, кассация, Верховный суд РФ — полная судебная защита", updatedAt: "" },
  { id: 6, title: "Дистанционная работа", description: "Работаем с клиентами по всей России онлайн, без личного присутствия", updatedAt: "" },
];

export function Services() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});

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
    <section ref={sectionRef} id="services" className="py-20 lg:py-32 relative overflow-hidden min-h-screen scroll-mt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/2.webp')", backgroundSize: "cover" }}
      />
      <div className="absolute inset-0 bg-amber-50/50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-amber-700 font-semibold mb-2 text-2xl lg:text-3xl">Наши услуги</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Полный спектр юридических услуг
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Профессиональная правовая поддержка по всем направлениям 
            для частных лиц и бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.title] || Scale;
            return (
              <Card 
                key={service.id} 
                className="group hover:shadow-lg hover:border-amber-200 transition-all duration-300 cursor-pointer hover:-translate-y-2 bg-white/90 backdrop-blur-sm border border-amber-50"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-700 transition-colors">
                  <Icon className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
