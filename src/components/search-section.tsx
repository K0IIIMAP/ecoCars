"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function SearchSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchInput, setSearchInput] = useState(query || "");

  return (
    <section className="bg-gray/50 w-full  h-[210px] flex items-center">
      <div className="w-full  h-[60px] lg:h-[85px]  mx-[5%] flex ">
        <Form
          action="/cars"
          scroll={false}
          className="w-full flex"
          onSubmit={(e) => {
            if (searchInput.length < 3) e.preventDefault();
          }}
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="What are you looking for? (model of car)"
            maxLength={50}
            minLength={3}
            name="query"
            className={cn(
              `h-full border-r border-black/10 w-full flex-[3] rounded-bl-lg rounded-tl-lg p-5  outline-none relative  `,
              {
                // "border-b-[3px]": active === "first",
              }
            )}
          />

          {/* <input
            type="text"
            placeholder="Which area?"
            className={cn(
              `h-full flex-[1] p-5 hidden md:block outline-none border-black  `,
              {
                // "border-b-[3px]": active == "second",
              }
            )}
          /> */}
          <Button className="h-full  text-lg  flex-[1.5] md:flex-1 lg:flex-[0.5] rounded-bl-none rounded-tl-none p-0 m-0">
            Search
          </Button>
        </Form>
      </div>
    </section>
  );
}
