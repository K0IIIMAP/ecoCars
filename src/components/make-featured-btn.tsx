"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { makeFeatured } from "@/app/actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function MakeFeaturedBtn({
  userId,
  carId,
}: {
  userId: string;
  carId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          const url = await makeFeatured({ userId, carId });
          if (url) {
            redirect(url);
          } else {
            toast.error("Unexpected error occurred. Please try again later.", {
              className: "bg-red-500",
            });
          }
        });
      }}
      disabled={isPending}
      className="w-full text-lg mt-3"
    >
      Promote
    </Button>
  );
}
