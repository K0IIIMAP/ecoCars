import Header from "@/components/header";

import React from "react";
import { getUserData } from "../actions";

import AddForm from "@/components/add-form";

export default async function AddingPage() {
  const data = await getUserData();

  return (
    <main>
      <Header />

      <div className="flex max-md:justify-center px-1">
        <div className=" border border-black/30 m-5 rounded-xl p-10  w-full md:w-[70%] ">
          <h1 className="text-3xl mb-5">Post your car</h1>

          <AddForm />
        </div>
      </div>
    </main>
  );
}
