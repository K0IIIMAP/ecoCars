"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { getUserData } from "@/app/actions";
import { User } from "@/lib/types";
import { toast } from "sonner";

import { supabaseClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";

export default function CarButtons({ carId }: { carId: string }) {
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<User | { error: string } | null>(null);
  const [isFavoured, setIsFavoured] = useState(false);
  useEffect(() => {
    const getUserAndFavourites = async () => {
      const user = await getUserData();
      setUser(user);
      const favouritesIds = user?.favourites ?? [];

      if (favouritesIds.includes(carId)) {
        setIsFavoured(true);
      }
    };

    getUserAndFavourites();
  }, []);

  return (
    <>
      {" "}
      <Button className="w-full text-lg mt-auto">Message a seller</Button>
      {!isFavoured ? (
        <Button
          variant="secondary"
          disabled={isPending}
          className="w-full text-lg mt-3 bg-logo text-white hover:bg-logo/90"
          onClick={() => {
            startTransition(async () => {
              if (user && "error" in user) {
                toast.error("Log in to add to favourites", {
                  className: "bg-red-500 text-white border-none",
                });
                return;
              }
              if (!user?.id) return;
              const supabase = supabaseClient();
              // fetch favourites first then add them
              const { data, error: fetchError } = await supabase
                .from("users")
                .select("favourites")
                .eq("id", user.id)
                .single();

              const favourites = data?.favourites ?? [];

              const { error } = await supabase
                .from("users")
                .update({ favourites: [...favourites, `${carId}`] })
                .eq("id", user.id);
              if (error) {
                toast.error("Error adding to favourites", {
                  className: "bg-red-500 text-white border-none",
                });
                return;
              }
              toast.success("Added to favourites", {
                className: "bg-green-500 text-white border-none",
              });
              setIsFavoured(true);
            });
          }}
        >
          Add to favourites <Heart />
        </Button>
      ) : (
        <Button
          variant="destructive"
          onClick={async () => {
            const user = await getUserData();

            // make a check if user is typeof user
            if (!user?.id) {
              toast.error("Log in to remove from favourites", {
                className: "bg-red-500 text-white border-none",
              });
              return;
            }

            const supabase = supabaseClient();
            const newFavourites = user?.favourites.filter((id) => id !== carId);
            console.log(newFavourites);

            await supabase
              .from("users")
              .update({ favourites: newFavourites })
              .eq("id", user?.id);
            toast.success("Removed from favourites", {
              className: "bg-[#ffa500] text-white border-none",
            });

            setIsFavoured(false);
          }}
          disabled={isPending}
          className="w-full text-lg mt-3 text-white"
        >
          Remove from favourites
        </Button>
      )}
    </>
  );
}
