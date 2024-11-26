import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import { supabaseServer } from "@/utils/supabase/server";
import Header from "@/components/header";
import { formatDate, formatMonthYear, formatPrice } from "@/lib/utils";

import { Car } from "@/lib/types";
import Link from "next/link";
import CarButtons from "@/components/car-buttons";
import { getUserData } from "@/app/actions";
import { notFound } from "next/navigation";

import CarProfileBtns from "@/components/car-profile-btns";
import { Crown } from "lucide-react";

export default async function CarPage({
  params,
}: {
  params: { carId: string };
}) {
  const { carId } = await params;

  const user = await getUserData();
  const favouredIds = user.favourites;
  const carIsFavoured = favouredIds?.includes(carId);

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", carId)
    .single();
  if (error) notFound();
  const userId = user?.id;
  const isMyCar = userId === data.user_id;

  const car: Car = data;
  const { created_at, description, photos, price, title, user_id } = car;
  const { data: creatorData, error: creatorError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user_id)
    .single();
  if (creatorError) notFound();
  return (
    <>
      <Header />
      <section className="mt-5">
        <main className="grid grid-cols-12 grid-rows-9 md:grid-rows-12 w-screen h-[1800px] md:h-[1200px] gap-5">
          <section className=" bg-white rounded-xl col-span-10 col-start-2 md:col-span-7 md:col-start-2 row-span-2 md:row-span-8 flex items-center justify-center relative overflow-hidden">
            <Carousel>
              <CarouselContent>
                {photos.map((photo) => (
                  <CarouselItem key={photo}>
                    <Image
                      src={photo}
                      alt="car"
                      width={400}
                      height={300}
                      className="w-full h-[100%] object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10  opacity-20" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 opacity-20 " />
            </Carousel>
          </section>

          <section className="bg-white rounded-xl p-5 row-start-3 row-span-3 col-span-10 col-start-2 md:row-span-6 md:col-span-7 md:col-start-2 overflow-y-auto">
            <h1 className="py-3 text-xl font-semibold">Description</h1>
            <p>{description}</p>
          </section>
          <section className="relative bg-white rounded-xl row-start-6 row-span-2 col-start-2 col-span-10 md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-1 px-5 py-7">
            {car.featured && (
              <div className="bg-[#6a13cf] text-white w-fit absolute top-0 right-0 px-5 py-2 rounded-tr-xl rounded-bl-xl text-sm">
                <span className="relative">FEATURED</span>
                <Crown className="absolute top-0 z-10 right-[12px] size-3.5 rotate-[30deg]" />
              </div>
            )}
            <div className="flex flex-col h-full ">
              <div className="space-y-1">
                <p className="text-[12px]">{formatDate(created_at)}</p>
                <p className="text-[23px] leading-[25px]">{title}</p>
                <p className="text-[30px] font-semibold">
                  ${formatPrice(price)}
                </p>
                <p className="text-base">{car.location}</p>
              </div>

              <CarButtons carId={carId} carIsFavoured={carIsFavoured} />
            </div>
          </section>
          <section className="bg-white rounded-xl row-start-8 row-span-2 col-start-2 col-span-10 md:row-span-4 md:row-start-5 md:col-span-3 md:col-start-9">
            <div className="space-y-3">
              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[100px]  rounded-full mt-5 relative">
                  <Image
                    src={creatorData.avatar_url}
                    fill
                    alt="user img"
                    className="rounded-full object-cover"
                  />{" "}
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[25px] text-center">
                    {" "}
                    {creatorData?.name ? (
                      <span>{creatorData?.name}</span>
                    ) : (
                      <span>User</span>
                    )}
                  </p>
                  <p className="text-black/50 text-center">
                    User since {formatMonthYear(creatorData.created_at)}
                  </p>
                  {/* <p>Last online:yesterday 22:36</p> */}
                  <Link
                    href={`/profile/${creatorData.id}`}
                    className="text-blue-500 underline text-center mb-3"
                  >
                    View all sales
                    {creatorData.name ? (
                      <span> of {creatorData?.name}</span>
                    ) : (
                      <span> of User</span>
                    )}
                  </Link>
                </div>

                {isMyCar && (
                  <div className="w-full flex flex-col gap-3 px-5">
                    <CarProfileBtns carId={carId} userId={userId} car={car} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
