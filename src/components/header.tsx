import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { getUserData } from "@/app/actions";

export default async function Header() {
  const user = await getUserData();

  return (
    <header className="w-full h-[70px] flex justify-between items-center px-[5%] bg-white">
      <Link
        href="/"
        className="flex items-center text-2xl gap-3  text-logo max-sm:scale-[0.85]"
      >
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
        <Link href={!user?.error ? `/profile/${user.id}` : "/signup"}>
          My Profile
        </Link>

        <Link href="/adding">
          <Button className="sm:block hidden">Sell My Car</Button>
        </Link>
      </nav>
    </header>
  );
}
