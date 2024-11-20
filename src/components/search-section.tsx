"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SearchSection() {
  const [active, setIsActive] = useState<string | null>(null);
  return (
    <section className="bg-gray w-full  h-[210px] flex items-center">
      <div className="w-full  h-[60px] lg:h-[85px]  mx-[5%] flex  ">
        <input
          type="text"
          placeholder="What are you looking for?"
          onClick={() => setIsActive("first")}
          className={cn(
            `h-full border-r border-black/10 w-full flex-[3] rounded-bl-lg rounded-tl-lg p-5  outline-none relative  `,
            {
              // "border-b-[3px]": active === "first",
            }
          )}
        />

        <input
          type="text"
          placeholder="Which area?"
          onClick={() => setIsActive("second")}
          className={cn(
            `h-full flex-[1] p-5 hidden md:block outline-none border-black  `,
            {
              // "border-b-[3px]": active == "second",
            }
          )}
        />
        <Button className="h-full  flex-[1.5] md:flex-1 lg:flex-[0.5] rounded-bl-none rounded-tl-none p-0 m-0 ">
          Search
        </Button>
      </div>
    </section>
  );
}
