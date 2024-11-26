"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { User } from "@/lib/types";
import BuyPostsBtn from "./buy-posts-btn";
export default function TokenAlert({ user }: { user: User }) {
  return (
    <AlertDialog open={user.post_tokens === 0}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500 text-center">
            You cannot post a car!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action can&apos;t be done because you have{" "}
            <span className="text-red-500 font-bold">0 </span>post tokens.
            Please buy more tokens in order to post your car.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link
            href="/"
            className="px-5 py-2 bg-black/50 hover:bg-black/70 text-white "
          >
            Main Page
          </Link>
          <BuyPostsBtn userId={user.id} className={"rounded-none"} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
