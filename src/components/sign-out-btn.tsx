"use client";
import React from "react";
import { Button } from "./ui/button";
import { supabaseClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function SignOutBtn() {
  return (
    <>
      <Button
        onClick={async () => {
          const supabase = supabaseClient();
          const { error } = await supabase.auth.signOut({});
          console.log(error);
          redirect("/");
        }}
        variant="destructive"
        className="px-14 py-2 rounded-full text-base"
      >
        Sign Out
      </Button>
    </>
  );
}
