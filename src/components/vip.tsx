import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Vip() {
  return (
    <section className="w-full py-10 bg-[#d8d8d8] text-body">
      <h2 className="mb-10 text-center  text-2xl">Featured Sales </h2>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 px-10">
        <div className="bg-[#f2f2f2] flex flex-col rounded-[10px] ">
          <div>
            <Link href="/">
              <Image
                src="/Tesla-placeholder.jpg"
                width={400}
                height={300}
                alt="car"
                className="w-[100%] rounded-t-[10px] "
              />
            </Link>
          </div>
          <div className="p-3 flex flex-col ">
            <p className="leading-[20px]">
              Tesla Model S Plain 6000 miles blabl albga llb lb
            </p>
            <p className="text-lg font-bold py-2">$45 000</p>
            <p className="text-[13px]">New York</p>
            <p className="text-[13px]  ">
              {new Date().toLocaleString("en-US", {
                month: "long", // full name of the month (e.g., "January")
                day: "numeric", // day of the month as a number (e.g., "1")
                year: "numeric", // full year as a number (e.g., "2024")
              })}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
