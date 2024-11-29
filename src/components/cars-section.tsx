"use client";
import { Car } from "@/lib/types";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Crown } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import FilterCars from "./filter-cars";

export default function CarsSection({ cars }: { cars: Car[] }) {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  // use effect for when cars change, by default it dont put without use effect

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  return (
    <section>
      <div className="flex px-10 pt-5 relative max-md:flex-col">
        <h1 className="text-2xl mx-auto ">All cars</h1>
        <div className="md:absolute md:right-[3%] flex justify-center max-md:mt-5 ">
          <FilterCars
            setFilteredCars={setFilteredCars}
            filteredCars={filteredCars}
          />
        </div>
      </div>

      {filteredCars && filteredCars.length > 0 ? (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 px-10 py-10 ">
          {filteredCars?.map((car: Car) => (
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
              {car.featured && (
                <div className="bg-[#6a13cf] text-white w-fit absolute bottom-0 right-0 px-3 py-2  text-[11px] rounded-br-lg rounded-tl-lg ">
                  <span className="relative">FEATURED</span>
                  <Crown className="absolute top-[2px] z-10 right-[2.5px] size-3 rotate-[30deg]" />
                </div>
              )}
            </div>
          ))}
        </section>
      ) : (
        <h1 className="text-3xl text-center">No cars found</h1>
      )}
    </section>
  );
}
