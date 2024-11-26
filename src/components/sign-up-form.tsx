"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema } from "@/lib/schemas";
import { supabaseClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SignUpForm() {
  const [open, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (authData: unknown) => {
    const supabase = supabaseClient();

    // sign up user

    const { data, error } = await supabase.auth.signUp({
      email: authData?.email,
      password: authData?.password,
    });
    if (error) {
      toast.error("something went wrong");
      return;
    }
    setIsOpen(true);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogContent className=" max-sm:w-[310px] text-green-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl ">
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg text-green-500 leading-6">
              You&apos;ve successfully created an account. Now check your email
              to verify your account.
            </AlertDialogDescription>
            <AlertDialogDescription className="text-center text-sm">
              (make sure to check you spam folder, if you don&apos;t see the
              email, once you see the email click the link to verify your
              account. if you dont see the email, it means that you already have
              an account under this email.)
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-full max-w-[405px] h-[638px] flex flex-col items-center justify-center px-4">
        <h1 className="mb-[78px] font-medium text-[32px]">Get Started Now</h1>
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
            />
            {errors.email && (
              <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.email.message}`}</p>
            )}
          </fieldset>
          <fieldset className="relative mb-5">
            <Label htmlFor="password" className="mt-5 w-full">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              id="password"
              type="password"
              className="w-full mt-1"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.password.message}`}</p>
            )}
          </fieldset>
          <fieldset className="relative mb-5">
            <Label htmlFor="confirmPassword" className="mt-5 w-full">
              Confirm Password
            </Label>
            <Input
              placeholder="Confirm your password"
              id="confirmPassword"
              type="password"
              className="w-full mt-1"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.confirmPassword.message}`}</p>
            )}
          </fieldset>
          <Button
            variant="secondary"
            className="w-full mt-10 rounded-xl bg-logo hover:bg-logo/80"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>

        <div className="flex items-center mt-10 w-full px-4">
          <div className="inline-block w-[48%] bg-slate-500/30 h-[1px]" />
          <span className="px-2">Or</span>
          <div className="w-[48%] bg-slate-500/30 h-[1px]" />
        </div>
        <Button
          variant="outline"
          className="w-[95%] mt-10 rounded-xl border border-black/60 hover:bg-white/60 flex items-center justify-center gap-2"
          onClick={async () => {
            const supabase = supabaseClient();
            await supabase.auth.signInWithOAuth({
              provider: "google",
            });
          }}
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
          Already have an account?{" "}
          <Link href="/signin" className="text-[#0000EE] underline">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
