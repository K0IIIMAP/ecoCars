import Header from "@/components/header";

import { Edit, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { supabaseServer } from "@/utils/supabase/server";

export default async function AccountPage() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();
  console.log(data, error);

  return (
    <main>
      <Header />
      <section className="w-full flex justify-center flex-col items-center relative">
        <div className="w-[200px] h-[200px] relative ">
          <Image
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="image"
            fill
            className="rounded-full"
          />
          <button className="absolute bottom-0 right-0">
            <Edit />
          </button>
        </div>

        <h1 className="text-2xl mt-4">Kirill Amirov</h1>
        <p className="text-xl mt-1">+390562342</p>
        <p className="text-slate-400 text-sm mt-1">On Eco-Cars since 2019</p>
        <p className="text-xl mt-1">
          <span className="text-green-500 text-xl font-bold">10</span> active
          posts
        </p>
        {/**Visible only for user itself */}
        <div className="flex flex-col items-center gap-y-2 mt-5">
          <p>
            You have <span className="text-red-500 font-bold text-lg">3</span>{" "}
            posts left
          </p>
          <Link
            href="/"
            className="px-5 py-2 bg-[#1e9f31] rounded-full text-white flex items-center gap-2 "
          >
            Buy more posts <ShoppingCart size={20} />
          </Link>
        </div>

        <section className="flex flex-col md:flex-row gap-5 w-full px-10 mt-10 ">
          <div className="flex-1 border border-black/30  rounded-lg py-5">
            <p className="text-xl text-center">Posts of Kirill Amirov</p>
            <div className="flex gap-5 flex-wrap mt-5 justify-center">
              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1  border border-black/30 rounded-lg py-5 ">
            <p className="text-xl text-center flex  items-center gap-2 justify-self-center ">
              Your Favourites{" "}
              <Heart size={20} className="border-black" fill="red" />
            </p>
            <div className="flex gap-5 flex-wrap mt-5 justify-center">
              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] ">
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
                  <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                    Tesla Model S Plaid
                  </p>
                  <p className="text-base font-bold py-2">$45 000</p>
                  <p className="text-[11px]">New York</p>
                  <p className="text-[11px]  ">
                    {new Date().toLocaleString("en-US", {
                      month: "long", // full name of the month (e.g., "January")
                      day: "numeric", // day of the month as a number (e.g., "1")
                      year: "numeric", // full year as a number (e.g., "2024")
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
