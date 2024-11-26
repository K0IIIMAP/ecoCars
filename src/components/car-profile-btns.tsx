"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabaseClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Car } from "@/lib/types";

import EditCarBtn from "./ui/edit-car-btn";

export default function CarProfileBtns({
  carId,
  userId,
  car,
}: {
  carId: string;
  userId: string;
  car: Car;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <EditCarBtn car={car} carId={carId} />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full text-lg ">
            Delete post
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Are you sure?</DialogTitle>
            <DialogDescription className="text-center">
              This action cannot be undone. This will permanently delete your
              post. Token is not gonna be returned.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="destructive"
            className="w-full text-lg "
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                // TODO optionally we can check if user is the owner of the post, but we dont display buttons in case if user is not
                const supabase = supabaseClient();

                const response = await supabase
                  .from("cars")
                  .delete()
                  .eq("id", carId);

                if (response?.error) {
                  toast.error("Something Went Wrong!", {
                    className: "bg-red-500",
                  });
                  return;
                }
                toast.success("Post has been removed", {
                  className: "bg-green-500 border-none",
                });
                // get all the files from folder of storage and then delete

                const { data: listData, error: listError } =
                  await supabase.storage.from("car-images").list(`${carId}`);

                if (listData) {
                  const pathsToDelete = listData.map(
                    (item) => `${carId}/${item.name}`
                  );

                  const { error } = await supabase.storage
                    .from("car-images")
                    .remove(pathsToDelete);
                  if (error) {
                    console.log(error);
                    return;
                  }
                }

                redirect(`/profile/${userId}`);
              });
            }}
          >
            Delete anyway
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
