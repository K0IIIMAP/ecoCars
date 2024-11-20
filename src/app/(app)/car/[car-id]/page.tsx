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

  console.log(photos);
  return (
    <section className="mt-5">
      <main className="grid grid-cols-12 grid-rows-12 md:grid-rows-12 w-screen h-[1800px] md:h-[1200px] gap-5">
        <section className=" col-span-10 col-start-2 md:col-span-7 md:col-start-2 row-span-5 md:row-span-8 flex items-center justify-center relative overflow-hidden">
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
                  src={photos[1]}
                  alt="car"
                  width={400}
                  height={300}
                  className="w-full h-[100%] object-contain"
                />
              </CarouselItem>

              <CarouselItem>
                <Image
                  src={photos[2]}
                  alt="car"
                  width={400}
                  height={300}
                  className="w-full h-[100%]"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 " />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10  " />
          </Carousel>
        </section>

        <section className="bg-white rounded-xl p-5 row-start-6 row-span-3 col-span-10 col-start-2 md:row-span-6 md:col-span-7 md:col-start-2">
          <h1>Description</h1>
          <p>{description}</p>
        </section>
        <section className="bg-white rounded-xl row-start-9 row-span-2 col-start-2 col-span-10 md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-1 px-5 py-7">
          <div className="space-y-2">
            <p className="text-[14px]">{created_at}</p>
            <p className="text-[20px] leading-[25px]">{title}</p>
            <p className="text-[30px]">${price}</p>

            <Button className="w-full text-lg">Message a seller</Button>
            <Button variant="secondary" className="w-full text-lg">
              Add to favourites
            </Button>
          </div>
        </section>
        <section className="bg-white rounded-xl row-start-11 row-span-2 col-start-2 col-span-10 md:row-span-4 md:row-start-5 md:col-span-3 md:col-start-9">
          <div className="space-y-3">
            <p>USER</p>
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[100px] bg-black rounded-full" />
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
  );
}
