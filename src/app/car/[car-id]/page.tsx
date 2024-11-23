import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { supabaseServer } from "@/utils/supabase/server";
import Header from "@/components/header";
import { formatDate } from "@/lib/utils";
import { Heart } from "lucide-react";

export default async function CarPage() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.from("cars").select("*");
  const {
    created_at,
    description,
    email,
    id,
    location,
    username,
    phone,
    photos,
    price,
    title,
    views,
  } = data[0];

  return (
    <>
      <Header />
      <section className="mt-5">
        <main className="grid grid-cols-12 grid-rows-9 md:grid-rows-12 w-screen h-[1800px] md:h-[1200px] gap-5">
          <section className=" col-span-10 col-start-2 md:col-span-7 md:col-start-2 row-span-2 md:row-span-8 flex items-center justify-center relative overflow-hidden">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Image
                    src={photos[0]}
                    alt="car"
                    width={400}
                    height={300}
                    className="w-full h-[100%] object-contain"
                  />
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src={photos[0]}
                    alt="car"
                    width={400}
                    height={300}
                    className="w-full h-[100%] object-contain"
                  />
                </CarouselItem>

                <CarouselItem>
                  <Image
                    src={photos[0]}
                    alt="car"
                    width={400}
                    height={300}
                    className="w-full h-[100%]"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10  opacity-20" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 opacity-20 " />
            </Carousel>
          </section>

          <section className="bg-white rounded-xl p-5 row-start-3 row-span-3 col-span-10 col-start-2 md:row-span-6 md:col-span-7 md:col-start-2 overflow-y-auto">
            <h1 className="py-3 text-xl font-semibold">Description</h1>
            <p>{description}</p>
          </section>
          <section className="bg-white rounded-xl row-start-6 row-span-2 col-start-2 col-span-10 md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-1 px-5 py-7">
            <div className="flex flex-col h-full ">
              <div className="space-y-1">
                <p className="text-[14px]">{formatDate(created_at)}</p>
                <p className="text-[23px] leading-[25px]">{title}</p>
                <p className="text-[30px] font-semibold">${price}</p>
              </div>

              <Button className="w-full text-lg mt-auto">
                Message a seller
              </Button>
              <Button variant="secondary" className="w-full text-lg mt-3">
                Add to favourites <Heart />
              </Button>
            </div>
          </section>
          <section className="bg-white rounded-xl row-start-8 row-span-2 col-start-2 col-span-10 md:row-span-4 md:row-start-5 md:col-span-3 md:col-start-9">
            <div className="space-y-3">
              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[100px] bg-black rounded-full mt-5" />
                <div>
                  <p className="text-[25px] text-center">Tangiers</p>
                  <p>On EcoCars since 2017 nov</p>
                  <p>Last online:yesterday 22:36</p>
                  <Button variant="link" className="text-gray">
                    View all sales of Tangiers
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
