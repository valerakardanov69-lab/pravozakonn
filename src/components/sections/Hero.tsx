"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";


const advantages = [
  "Работаем в Минеральных Водах и по всей России",
  "Бесплатная консультация юриста",
  "Дистанционное сопровождение дел",
];


export function Hero() {

  return (

    <section
      className="relative pt-28 lg:pt-40 pb-24 lg:pb-36 overflow-hidden min-h-screen scroll-mt-16"
    >


      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/1.png')",
          backgroundSize: "cover",
        }}
      />


      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-amber-50/80 to-white/60" />


      <div className="absolute inset-0 opacity-5">

        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl" />

        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />

      </div>





      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">


        <div className="grid lg:grid-cols-2 gap-12 items-center">



          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100">


            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">

              <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />

              Бесплатная консультация

            </div>





            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6">

              Юридическая помощь в Минеральных Водах
              <span className="text-amber-700">
                {" "}и по всей России
              </span>

            </h1>





            <p className="text-lg lg:text-xl text-gray-700 mb-8 max-w-lg">

              Банкротство физических лиц, списание долгов,
              судебная защита и юридические консультации.
              Работаем дистанционно с клиентами из любых регионов России.

            </p>





            <div className="flex flex-wrap gap-3 mb-8">


              {advantages.map((item)=>(

                <div
                  key={item}
                  className="flex items-center gap-2 text-gray-800"
                >

                  <CheckCircle className="w-5 h-5 text-amber-600" />


                  <span className="text-sm font-medium">
                    {item}
                  </span>


                </div>

              ))}


            </div>






            <div className="flex flex-wrap gap-4">


              <Button

                size="lg"

                className="gap-2 animate-pulse bg-amber-600 hover:bg-amber-700"

                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior:"smooth",
                    })
                }

              >

                Получить консультацию

                <ArrowRight className="w-5 h-5"/>

              </Button>





              <Button

                variant="outline"

                size="lg"

                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({
                      behavior:"smooth",
                    })
                }

              >

                Узнать больше

              </Button>



            </div>



          </div>








          <div className="relative hidden lg:block">


            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-amber-100">



              <div className="flex items-center gap-4 mb-6">


                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">

                  <CheckCircle className="w-6 h-6 text-amber-700"/>

                </div>



                <div>

                  <p className="font-semibold text-gray-900">
                    Юридическая помощь
                  </p>


                  <p className="text-sm text-gray-500">
                    Минеральные Воды и вся Россия
                  </p>


                </div>


              </div>





              <div className="space-y-3">

                <div className="h-3 bg-amber-50 rounded-full w-full" />

                <div className="h-3 bg-amber-50 rounded-full w-4/5" />

                <div className="h-3 bg-amber-50 rounded-full w-3/4" />

              </div>





              <div className="mt-6 pt-6 border-t border-amber-100 flex justify-between items-center">


                <span className="text-gray-500">
                  Списано долгов
                </span>


                <span className="text-2xl font-bold text-amber-700">
                  2.5 млн ₽
                </span>


              </div>


            </div>




            <div className="absolute -top-4 -right-4 w-full h-full bg-amber-200 rounded-2xl -z-10" />



          </div>



        </div>



      </div>



    </section>

  );

}