"use client";

import { redirect } from "next/navigation";

import { toast } from "sonner";

export default function ClientSonnser({ user }: { user: any }) {
  if (user?.error) {
    // Show the toast only once
    toast.error("You are not logged in", {});
  }

  return null;
}
