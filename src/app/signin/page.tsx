import SignInForm from "@/components/sign-in-form";

import Image from "next/image";

import React from "react";
import { getUserData } from "../actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};
export default async function SignInPage() {
  const user = await getUserData();
  if (!user?.error) {
    redirect(`/profile/${user.id}`);
  }
  return (
    <main className="w-screen h-screen flex">
      <section className="flex-1 h-full flex items-center justify-center">
        <SignInForm />
      </section>
      <section className="flex-1 h-full w-full rounded-l-xl hidden lg:block">
        <Image
          src="/signin.jpg"
          width={800}
          height={1000}
          alt="signinimg"
          className="h-full w-full object-cover rounded-l-full translate-x-[100px]"
        />
      </section>
    </main>
  );
}
