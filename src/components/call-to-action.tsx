import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className=" mt-20 lg:mt-40 w-full bg-black h-[100px] md:h-[130px]">
      <div className="w-full flex items-center justify-center h-full gap-5 px-[5%]">
        <div className="flex-1 text-gray text-2xl hidden lg:block">
          <p>Our clients offer sweet prices for good eco cars.</p>
          <p>Find a certified car for a good price today!</p>
        </div>
        <Button
          variant="secondary"
          className="w-[45%] sm:w-[40%] lg:w-[20%]  h-[30%] sm:h-[50%] text-[12px] sm:text-xl bg-gray "
        >
          <Link href="/cars"> VIEW ALL SALES</Link>
        </Button>
        <Button
          variant="secondary"
          className="w-[45%]  sm:w-[40%] lg:w-[20%]   h-[30%] sm:h-[50%]  text-[12px] sm:text-xl bg-gray "
        >
          <Link href="/adding"> SELL YOUR CAR</Link>
        </Button>
      </div>
    </section>
  );
}
