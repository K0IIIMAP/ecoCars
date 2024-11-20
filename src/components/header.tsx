import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-[70px] flex justify-between items-center px-[5%] bg-white">
      <Link href="/" className="flex items-center text-2xl gap-3  text-logo">
        <Image
          src="/ecocars.png"
          width={60}
          height={60}
          alt="logocar"
          className="w-[55px] h-[50px] mt-[-15px]"
        />
        Eco-Cars
      </Link>

      <nav className="flex items-center gap-10">
        <Link href="/">My Profile</Link>
        <Button className="sm:block hidden">Sell My Car</Button>
      </nav>
    </header>
  );
}
