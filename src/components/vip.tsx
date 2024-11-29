import { Car } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { supabaseServer } from "@/utils/supabase/server";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Vip() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("featured", true);
  const featuredCars = data?.sort(() => Math.random() - 0.5).slice(0, 4);
  return (
    <section className="w-full py-10 bg-gray/50 text-body">
      <h2 className="mb-10 text-center  text-2xl">Featured Sales </h2>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 px-10">
        {featuredCars?.map((car: Car) => (
          <div
            className="bg-[#f2f2f2] flex flex-col rounded-[10px] relative"
            key={car.id}
          >
            <div className="h-[180px]">
              <Link href={`/car/${car.id}`}>
                <Image
                  src={car.photos[0]}
                  width={400}
                  height={300}
                  alt="car"
                  className="w-[100%] rounded-t-[10px]  h-full object-cover "
                />
              </Link>
            </div>
            <div className="p-3 flex flex-col flex-1 ">
              <p className="leading-[20px]">{car.title}</p>
              <p className="text-lg font-bold py-2">
                ${formatPrice(car.price)}
              </p>
              <div className="mt-auto ">
                <p className="text-[13px]">{car.location}</p>
                <p className="text-[13px]  ">
                  {new Date(car.created_at).toLocaleString("en-US", {
                    month: "long", // full name of the month (e.g., "January")
                    day: "numeric", // day of the month as a number (e.g., "1")
                    year: "numeric", // full year as a number (e.g., "2024")
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
