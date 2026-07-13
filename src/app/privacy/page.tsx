import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | ПравоЗакон",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>
          
          <div className="bg-white rounded-xl p-8 shadow-sm space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей сайта prawozakon.ru (далее — «Сайт»), принадлежащего ИП Куликовой З.Х.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Сбор персональных данных</h2>
              <p className="leading-relaxed mb-3">
                Мы собираем следующие персональные данные:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ФИО</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Содержание сообщений через форму обратной связи</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Цели обработки данных</h2>
              <p className="leading-relaxed mb-3">
                Персональные данные обрабатываются в следующих целях:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Связь с клиентами для оказания юридических услуг</li>
                <li>Ответы на запросы и обращения</li>
                <li>Информирование об услугах</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Защита данных</h2>
              <p className="leading-relaxed">
                Мы принимаем все необходимые меры для защиты персональных данных пользователей 
                от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Передача данных третьим лицам</h2>
              <p className="leading-relaxed">
                Персональные данные не передаются третьим лицам, за исключением случаев, 
                предусмотренных законодательством РФ или с согласия пользователя.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Права пользователя</h2>
              <p className="leading-relaxed mb-3">
                Пользователь имеет право:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Получить информацию об обработке своих данных</li>
                <li>Требовать уточнения или удаления данных</li>
                <li>Отозвать согласие на обработку данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Контакты</h2>
              <p className="leading-relaxed">
                По всем вопросам, связанным с обработкой персональных данных, 
                обращайтесь: +7 (995) 000-04-17, kardanova.zainab@mail.ru
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
