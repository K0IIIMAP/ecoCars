import Header from "@/components/header";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import EditComponent from "@/components/edit-component";
import { getUserData } from "../actions";
import { supabaseServer } from "@/utils/supabase/server";
import { formatDate, formatMonthYear } from "@/lib/utils";

export default async function AccountPage() {
  const supabase = await supabaseServer();
  const user = await getUserData();

  const { data: posts } = await supabase
    .from("cars")
    .select("*")
    .eq("user_id", user.id);

  return (
    <main>
      <Header />
      <section className="w-full flex justify-center flex-col items-center relative">
        <div className="w-[200px] h-[200px] relative mt-5 ">
          <Image
            src={user?.avatar_url}
            alt="image"
            fill
            className=" w-full h-full rounded-full object-cover"
          />
          <EditComponent />
        </div>

        {user?.name ? (
          <h1 className="text-2xl mt-4">{user.name}</h1>
        ) : (
          <h1>Name is not provided</h1>
        )}
        {user?.phone ? (
          <p className="text-lg mt-1">{user.phone}</p>
        ) : (
          <p className="text-lg mt-1">Phone numbers is not provided</p>
        )}
        <p className="text-slate-400 text-sm mt-1">
          On Eco-Cars since {formatMonthYear(user.created_at)}
        </p>
        <p className="text-xl mt-1">
          <span className="text-green-500 text-xl font-bold">
            {posts?.length}
          </span>{" "}
          active posts
        </p>
        {/**Visible only for user itself */}
        <div className="flex flex-col items-center gap-y-2 mt-5">
          <p>
            You have{" "}
            <span className="text-red-500 font-bold text-lg">
              {user?.post_tokens}
            </span>{" "}
            <span>post token</span>
          </p>
          <Link
            href="/"
            className="px-5 py-2 bg-[#1e9f31] rounded-full text-white flex items-center gap-2 "
          >
            Buy more posts <ShoppingCart size={20} />
          </Link>
        </div>

        <section className="flex flex-col md:flex-row gap-5 w-full px-2 md:px-10 mt-10 ">
          <div className="flex-1 border border-black/30  rounded-lg py-5">
            <p className="text-xl text-center">Posts</p>
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
