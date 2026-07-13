"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { sanitizeForStorage, validateEmail } from "@/lib/security";


const contactInfo = [
  {
    icon: Phone,
    label: "Телефон юриста",
    value: "+7 (995) 000-04-17",
    href: "tel:+79950000417",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kardanova.zainab@mail.ru",
    href: "mailto:kardanova.zainab@mail.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "Минеральные Воды, ул. Терешкова, 26",
    href: "#",
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Пн-Пт: 9:00 - 19:00",
    href: "#",
  },
];


export function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });


  const [isSubmitting, setIsSubmitting] = useState(false);

  const [agreed, setAgreed] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    const name = sanitizeForStorage(formData.name);
    const phone = sanitizeForStorage(formData.phone);
    const email = sanitizeForStorage(formData.email);
    const message = sanitizeForStorage(formData.message);



    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;

    if (!phoneRegex.test(phone)) {
      alert("Введите корректный номер телефона");
      return;
    }



    if (!agreed) {
      alert("Необходимо согласиться с политикой конфиденциальности");
      return;
    }



    if (email && !validateEmail(email)) {
      alert("Введите корректный email");
      return;
    }



    const lastSubmit = localStorage.getItem("lastSubmit");


    if (
      lastSubmit &&
      Date.now() - parseInt(lastSubmit) < 60000
    ) {
      alert("Подождите минуту перед отправкой следующей заявки");
      return;
    }



    setIsSubmitting(true);



    try {

      const response = await fetch("/api/applications", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          phone,
          email,
          message,
        }),

      });



      if (response.ok) {

        localStorage.setItem(
          "lastSubmit",
          Date.now().toString()
        );


        alert(
          "Спасибо за заявку! Мы свяжемся с вами в ближайшее время."
        );


        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });


      } else {

        alert(
          "Ошибка при отправке. Попробуйте позже."
        );

      }


    } catch {

      alert(
        "Ошибка при отправке. Попробуйте позже."
      );


    } finally {

      setIsSubmitting(false);

    }

  };



  return (

    <section
      id="contact"
      className="py-12 lg:py-16 relative overflow-hidden scroll-mt-16"
    >

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/4.jpg')",
          backgroundSize: "cover",
        }}
      />


      <div className="absolute inset-0 bg-white/40" />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">


        <div className="text-center mb-12 lg:mb-16">

          <p className="text-amber-700 font-semibold mb-2">
            Контакты
          </p>


          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Контакты юриста в Минеральных Водах
          </h2>


          <p className="text-gray-600 max-w-2xl mx-auto">
            Получите бесплатную консультацию по банкротству,
            списанию долгов и другим юридическим вопросам.
          </p>


        </div>




        <div className="grid lg:grid-cols-2 gap-12 items-start">


          <div>

            <Card className="p-8 h-full">

              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Оставить заявку
              </h3>


              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя
                  </label>


                  <Input
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        name:e.target.value
                      })
                    }
                    required
                  />

                </div>



                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>


                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        phone:e.target.value
                      })
                    }
                    required
                  />

                </div>



                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>


                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        email:e.target.value
                      })
                    }
                  />

                </div>



                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Опишите вашу ситуацию
                  </label>


                  <Textarea
                    placeholder="Кратко опишите вашу проблему..."
                    value={formData.message}
                    onChange={(e)=>
                      setFormData({
                        ...formData,
                        message:e.target.value
                      })
                    }
                  />

                </div>



                <button
                  type="submit"
                  disabled={isSubmitting || !agreed}
                  className="w-full h-12 px-6 py-3 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  {isSubmitting
                    ? "Отправка..."
                    : "Отправить заявку"
                  }

                </button>



                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e)=>
                      setAgreed(e.target.checked)
                    }
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />


                  <span className="text-xs text-gray-500">
                    Я соглашаюсь с политикой конфиденциальности
                    и даю согласие на обработку персональных данных
                  </span>


                </label>



              </form>


            </Card>


          </div>





          <div className="space-y-6 flex flex-col h-full">


            <div className="grid sm:grid-cols-2 gap-4">


              {contactInfo.map((item)=>(

                <Card
                  key={item.label}
                  className="p-6"
                >

                  <div className="flex items-start gap-4">


                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">

                      <item.icon className="w-5 h-5 text-amber-700"/>

                    </div>



                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        {item.label}
                      </p>


                      <a
                        href={item.href}
                        aria-label={item.label}
                        className="font-medium text-gray-900 hover:text-amber-700 transition-colors break-all"
                      >
                        {item.value}
                      </a>


                    </div>


                  </div>


                </Card>

              ))}


            </div>





            <Card className="overflow-hidden p-0 flex-1 min-h-[350px]">


              <iframe

                src="https://yandex.ru/map-widget/v1/?ll=43.122022%2C44.208301&z=15&pt=43.122022,44.208301,pm2rdm"

                width="100%"

                height="100%"

                style={{
                  border:0,
                  minHeight:"350px"
                }}

                allowFullScreen

                loading="lazy"

              />


            </Card>



          </div>



        </div>



      </div>


    </section>

  );

}