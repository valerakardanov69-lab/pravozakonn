"use client";

import { Card } from "@/components/ui/card";
import { Award, Briefcase, GraduationCap } from "lucide-react";

const team = [
  {
    name: "Куликова Зайнаб Хусаиновна",
    role: "Юрист",
    specialization: "Банкротство, судебные споры, работа с приставами",
    experience: "10 лет опыта",
    image: "/images/6.jpg",
  },
];

const achievements = [
  { icon: Award, text: "Более 300 успешно выигранных дел" },
  { icon: Briefcase, text: "Специализация на банкротстве и судебных спорах" },
  { icon: GraduationCap, text: "Постоянное повышение квалификации" },
];

export function Team() {
  return (
    <section
      id="team"
      className="py-16 lg:py-24 min-h-screen scroll-mt-16 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-amber-700 font-bold mb-2 text-2xl lg:text-3xl">
            Наш специалист
          </p>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Профессиональный юрист
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Индивидуальный подход к каждому делу
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center lg:justify-start">
            {team.map((member) => (
              <Card
                key={member.name}
                className="text-center overflow-hidden group max-w-sm w-full shadow-2xl border border-amber-200 bg-white/90 backdrop-blur"
              >
                <div className="relative h-64 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>

                <p className="text-amber-700 text-sm font-medium mb-2">
                  {member.role}
                </p>

                <p className="text-gray-500 text-sm mb-1">
                  {member.specialization}
                </p>

                <p className="text-gray-400 text-xs">
                  {member.experience}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-2xl border border-amber-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Почему клиенты доверяют
            </h3>

            <div className="space-y-4">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-amber-700" />
                  </div>

                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Каждый клиент получает персональное внимание и юридическую
              поддержку на всех этапах. Мы гарантируем конфиденциальность и
              профессиональный подход к решению ваших вопросов.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}