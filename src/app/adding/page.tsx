import Header from "@/components/header";

import React from "react";

import AddForm from "@/components/add-form";
import { getUserData } from "../actions";

import ClientSonnser from "@/components/client-sonner";
import { redirect } from "next/navigation";

export default async function AddingPage() {
  const user = await getUserData();
  if (user.error) redirect("signin");
  return (
    <main>
      {/* {user.error && <ClientSonnser user={user} />} */}
      <Header />

      <div className="flex max-md:justify-center px-1">
        <div className=" border border-black/30 m-2 md:m-5 rounded-xl p-5 md:p-10  w-full md:w-[70%] ">
          <h1 className="text-3xl mb-5">Post your car</h1>

          <AddForm />
        </div>
      </div>
    </main>
  );
}
