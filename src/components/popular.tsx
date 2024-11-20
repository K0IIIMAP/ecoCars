"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Popular() {
  return (
    <section className="mb-20">
      <h1 className="py-10 text-2xl text-center px-5">
        Most popular car brands on EcoCars
      </h1>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,black,black,black,transparent)]">
        <motion.div
          className="flex gap-5 flex-none pr-5"
          animate={{
            translateX: "-50%",
          }}
          transition={{
            duration: 90,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Image
            src="/assets/Tesla2.svg"
            alt="carlogo"
            height={200}
            width={200}
          />
          <Image src="/assets/BMW.svg" alt="carlogo" height={200} width={200} />
          <Image
            src="/assets/FORD.svg"
            alt="carlogo"
            height={200}
            width={200}
          />
          <Image
            src="/assets/Tesla.svg"
            alt="carlogo"
            height={200}
            width={200}
          />

          <Image
            src="/assets/Hyundai.svg"
            alt="Toyota"
            height={200}
            width={200}
          />
          <Image
            src="/assets/Benz.svg"
            alt="carlogo"
            height={200}
            width={200}
          />
          <Image src="/assets/Kia.svg" alt="carlogo" height={200} width={200} />
          {/*Second set of images */}
          <Image
            src="/assets/Tesla2.svg"
            alt="carlogo"
            height={200}
            width={200}
          />
          <Image src="/assets/BMW.svg" alt="carlogo" height={200} width={200} />
          <Image
            src="/assets/FORD.svg"
            alt="carlogo"
            height={200}
            width={200}
          />
          <Image
            src="/assets/Tesla.svg"
            alt="carlogo"
            height={200}
            width={200}
          />

          <Image
            src="/assets/Hyundai.svg"
            alt="Toyota"
            height={200}
            width={200}
          />
          <Image
            src="/assets/Benz.svg"
            alt="carlogo"
            height={200}
            width={200}
          />
          <Image src="/assets/Kia.svg" alt="carlogo" height={200} width={200} />
        </motion.div>
      </div>
    </section>
  );
}
