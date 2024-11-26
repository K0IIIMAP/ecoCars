"use client";
import { buyPosts } from "@/app/actions";
import { ShoppingCart } from "lucide-react";

import { redirect } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function BuyPostsBtn({
  userId,
  className,
}: {
  userId: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          const url = await buyPosts({ userId });
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
      className={cn(
        `text-base px-5 py-2 bg-[#1e9f31] hover:bg-[#1e9f31]/90 transition rounded-full text-white flex items-center gap-2 ${className}`
      )}
    >
      Buy more posts <ShoppingCart size={20} />
    </Button>
  );
}
