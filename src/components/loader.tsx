"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-screen h-screen relative">
      <DotLottieReact
        src="/load.lottie"
        loop
        autoplay
        className="absolute left-1/2  transofrm -translate-x-1/2 top-[20%] max-md:w-[250px] max-md:h-[250px]"
      />
    </div>
  );
}
