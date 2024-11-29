import SignUpForm from "@/components/sign-up-form";

import Image from "next/image";

import React from "react";
import { getUserData } from "../actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
};
export default async function SignUpPage() {
  const user = await getUserData();
  if (!user.error) {
    redirect(`/profile/${user.id}`);
  }
  return (
    <main className="w-screen h-screen flex">
      <section className="flex-1 h-full flex items-center justify-center">
        <SignUpForm />
      </section>
      <section className="flex-1 h-full w-full rounded-l-xl hidden lg:block">
        <Image
          src="/signup.jpg"
          width={800}
          height={1000}
          alt="signupimg"
          className="h-full w-full object-cover rounded-l-full translate-x-[100px]"
        />
      </section>
    </main>
  );
}
