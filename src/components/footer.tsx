import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray/50 w-full h-[400px] md:h-[300px] py-14 px-3 md:px-10 flex flex-col items-center">
      <h3 className="text-center text-2xl">EcoCars</h3>
      <p className="max-w-[750px] text-center mx-auto mt-5 text-[14px]">
        Discover online listings for eco-friendly cars – find exactly what
        you're looking for! By clicking on the 'Post an Ad' button, you can
        easily and quickly list an eco car for sale on any topic. With our
        platform, you can buy or sell eco-friendly vehicles with ease, offering
        a wide range of options for those seeking sustainable transportation.
      </p>
      <div className="mt-5">
        <p>You can find us on:</p>
        <div className="flex gap-5 items-center justify-center mt-2">
          <Link href="https://wa.me/0965360759">
            <Instagram />
          </Link>
          <Link href="https://wa.me/0965360759">
            <Twitter />
          </Link>

          <Link href="https://wa.me/0965360759">
            <Youtube />
          </Link>
        </div>
      </div>
    </footer>
  );
}
