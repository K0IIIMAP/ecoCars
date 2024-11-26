import Header from "@/components/header";

import { Crown, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import EditComponent from "@/components/edit-component";
import { getUserData } from "../../actions";
import { supabaseServer } from "@/utils/supabase/server";
import { cn, formatMonthYear, formatPrice } from "@/lib/utils";
import { Car, User } from "@/lib/types";

import SignOutBtn from "@/components/sign-out-btn";
import { notFound, redirect } from "next/navigation";
import BuyPostsBtn from "@/components/buy-posts-btn";

export default async function AccountPage({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = await params;

  const supabase = await supabaseServer();
  const userBySession = await getUserData();
  const userId = userBySession.id;
  const isMyProfile = userId == profileId;

  // empty array in case if user not logged in, we dont have to show no favourites
  const favouritesIds = userBySession.favourites ?? [];

  const favourites = await Promise.all(
    favouritesIds.map(async (id: string) => {
      const { data: carData, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      return carData;
    })
  );

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", profileId)
    .single();

  if (!userData || userError) {
    notFound();
  }

  const profileData: User = userData;

  const { data } = await supabase
    .from("cars")
    .select("*")
    .eq("user_id", profileId);
  const posts: Car[] = data ?? [];

  return (
    <main>
      <Header />
      <section className="w-full flex justify-center flex-col items-center relative">
        <div className="w-[200px] h-[200px] relative mt-5 ">
          <Image
            src={profileData?.avatar_url}
            alt="image"
            fill
            className=" w-full h-full rounded-full object-cover"
          />
          {isMyProfile && <EditComponent />}
        </div>

        {profileData?.name ? (
          <h1 className="text-2xl mt-4">{profileData.name}</h1>
        ) : (
          <h1>Name is not provided</h1>
        )}
        {profileData?.phone ? (
          <p className="text-lg mt-1">{profileData.phone}</p>
        ) : (
          <p className="text-lg mt-1">Phone numbers is not provided</p>
        )}
        <p className="text-slate-400 text-sm mt-1">
          On Eco-Cars since {formatMonthYear(profileData.created_at)}
        </p>
        <p className="text-xl mt-1">
          <span className="text-green-500 text-xl font-bold">
            {posts?.length}
          </span>{" "}
          active posts
        </p>
        {/**Visible only for user itself */}
        {isMyProfile && (
          <div className="flex flex-col items-center gap-y-2 mt-5">
            <p>
              You have{" "}
              <span className="text-red-500 font-bold text-lg">
                {userBySession?.post_tokens}
              </span>{" "}
              <span>post token</span>
            </p>
            <BuyPostsBtn userId={userId} />
            <SignOutBtn />
          </div>
        )}

        <section className="flex flex-col md:flex-row gap-5 w-full px-2 md:px-10 mt-10 my-10">
          <div className="flex-1 border border-black/30  rounded-lg py-5">
            <p className="text-xl text-center">Posts</p>
            {posts.length > 0 ? (
              <div className="flex gap-5 flex-wrap mt-5 justify-start px-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] relative "
                  >
                    <div className="h-[150px] relative">
                      <Link href={`/car/${post.id}`}>
                        <Image
                          src={post.photos[0]}
                          fill
                          alt="car"
                          className="w-full rounded-t-[10px] h-full object-cover  "
                        />
                      </Link>
                    </div>
                    <div className="p-3 flex flex-col ">
                      <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                        {post.title}
                      </p>
                      <p className="text-base font-bold py-2">
                        ${formatPrice(post.price)}
                      </p>
                      <p className="text-[11px]">{post.location}</p>
                      <p className="text-[11px]  ">
                        {new Date(post.created_at).toLocaleString("en-US", {
                          month: "long", // full name of the month (e.g., "January")
                          day: "numeric", // day of the month as a number (e.g., "1")
                          year: "numeric", // full year as a number (e.g., "2024")
                        })}
                      </p>
                    </div>
                    {post.featured && (
                      <div className="bg-[#6a13cf] text-white w-fit absolute bottom-0 right-0 px-3 py-1 rounded-br-lg rounded-tl-lg text-[10px]">
                        <span className="relative">FEATURED</span>
                        <Crown className="absolute top-0 z-10 right-[3px] size-2.5 rotate-[30deg]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-lg md:text-2xl mt-5 text-center">No posts</h1>
            )}
          </div>

          {isMyProfile && (
            <div className="flex-1  border border-black/30 rounded-lg py-5 ">
              <p className="text-xl text-center flex  items-center gap-2 justify-self-center ">
                Your Favourites{" "}
                <Heart size={20} className="border-black" fill="red" />
              </p>
              {favourites.length > 0 ? (
                <div className="flex gap-5 flex-wrap mt-5 justify-start px-2">
                  {favourites.map((post: Car, index: number) => (
                    <div
                      key={index}
                      className="bg-[#e0e0e0] flex flex-col rounded-[10px] w-[200px] relative"
                    >
                      <div className="h-[150px] relative">
                        <Link href={`/car/${post.id}`}>
                          <Image
                            src={post.photos[0]}
                            fill
                            alt="car"
                            className="w-[100%] object-cover rounded-t-[10px] "
                          />
                        </Link>
                      </div>
                      <div className="p-3 flex flex-col ">
                        <p className="leading-[20px] text-sm max-w-[180px] text-ellipsis whitespace-nowrap overflow-hidden">
                          {post.title}
                        </p>
                        <p className="text-base font-bold py-2">
                          ${formatPrice(post.price)}
                        </p>
                        <p className="text-[11px]">{post.location}</p>
                        <p className="text-[11px]  ">
                          {new Date(post.created_at).toLocaleString("en-US", {
                            month: "long", // full name of the month (e.g., "January")
                            day: "numeric", // day of the month as a number (e.g., "1")
                            year: "numeric", // full year as a number (e.g., "2024")
                          })}
                        </p>
                      </div>
                      {post.featured && (
                        <div className="bg-[#6a13cf] text-white w-fit absolute bottom-0 right-0 px-3 py-1 rounded-br-lg rounded-tl-lg text-[10px]">
                          <span className="relative">FEATURED</span>
                          <Crown className="absolute top-0 z-10 right-[3px] size-2.5 rotate-[30deg]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-center text-lg md:text-2xl mt-5">
                  No favoured cars
                </h1>
              )}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
