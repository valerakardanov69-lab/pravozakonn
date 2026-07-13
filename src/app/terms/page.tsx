import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | ПравоЗакон",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Пользовательское соглашение</h1>
          
          <div className="bg-white rounded-xl p-8 shadow-sm space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящее Пользовательское соглашение регулирует отношения между ИП Куликовой З.Х. 
                и пользователями сайта prawozakon.ru (далее — «Сайт»).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Использование сайта</h2>
              <p className="leading-relaxed">
                Используя Сайт, вы подтверждаете, что ознакомились с настоящим Соглашением и принимаете его условия.
                Сайт предназначен для информирования об услугах и связи с юристами.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Услуги</h2>
              <p className="leading-relaxed">
                Информация на Сайте не является публичной офертой. Стоимость и условия оказания 
                юридических услуг определяются индивидуально после консультации.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Интеллектуальная собственность</h2>
              <p className="leading-relaxed">
                Все материалы Сайта (тексты, изображения, дизайн) являются собственностью 
                правообладателя и защищены законодательством РФ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Ограничение ответственности</h2>
              <p className="leading-relaxed">
                Администрация Сайта не несет ответственности за любой ущерб, возникший 
                в результате использования или невозможности использования Сайта.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Конфиденциальность</h2>
              <p className="leading-relaxed">
                Обработка персональных данных осуществляется в соответствии с{" "}
                <a href="/privacy" className="text-amber-700 hover:underline">Политикой конфиденциальности</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Изменение условий</h2>
              <p className="leading-relaxed">
                Администрация оставляет за собой право изменять условия Соглашения без предварительного уведомления.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Контакты</h2>
              <p className="leading-relaxed">
                По всем вопросам: +7 (995) 000-04-17, kardanova.zainab@mail.ru
              </p>
            </section>

            <p className="text-sm text-gray-500 pt-4">
              Последнее обновление: Январь 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
