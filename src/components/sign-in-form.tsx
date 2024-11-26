"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema } from "@/lib/schemas";
import { supabaseClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const [signInError, setSignInError] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (authData: unknown) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const supabase = supabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: authData?.email,
      password: authData?.password,
    });
    if (error) {
      setSignInError(true);
      return;
    }

    redirect(`/profile/${data?.user?.id}`);
  };
  const onChange = () => {
    if (signInError) setSignInError(false);
  };

  return (
    <div className="w-full max-w-[405px] h-[638px] flex flex-col items-center justify-center px-4">
      <h1 className="mb-[78px] font-medium text-[32px]">Sign in</h1>
      <form
        className="flex flex-col w-full px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="relative mb-5">
          <Label htmlFor="email" className="mt-5">
            Email
          </Label>
          <Input
            placeholder="Enter your email"
            id="email"
            className="w-full mt-1"
            {...register("email")}
            onChange={onChange}
          />
          {errors.email && (
            <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.email.message}`}</p>
          )}
        </fieldset>
        <fieldset className="relative ">
          <Label htmlFor="password" className="mt-5 w-full">
            Password
          </Label>
          <Input
            placeholder="Enter your password"
            id="password"
            type="password"
            className="w-full mt-1"
            {...register("password")}
            onChange={onChange}
          />
          {errors.password && (
            <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.password.message}`}</p>
          )}
        </fieldset>

        <Button
          variant="secondary"
          className="w-full mt-10 rounded-xl bg-logo hover:bg-logo/80"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
        {signInError && (
          <p className="text-red-500 pt-2">Invalid Credentials</p>
        )}
      </form>
      <div className="flex items-center mt-10 w-full px-4">
        <div className="inline-block w-[48%] bg-slate-500/30 h-[1px]" />
        <span className="px-2">Or</span>
        <div className="w-[48%] bg-slate-500/30 h-[1px]" />
      </div>
      <Button
        variant="outline"
        onClick={() => {
          const supabase = supabaseClient();
          supabase.auth.signInWithOAuth({
            provider: "google",
          });
        }}
        className="w-[95%]  mt-10 rounded-xl border border-black/60 hover:bg-white/60 flex items-center justify-center gap-2"
      >
        <Image
          src="/google.svg"
          width={25}
          height={25}
          className="w-[25px] h-auto"
          alt="googlesvg"
        />
        Continue with Google
      </Button>
      <p className="text-[14px] text-center mt-10">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#0000EE] underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
