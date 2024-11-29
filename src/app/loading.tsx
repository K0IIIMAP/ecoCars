import React from "react";

import Header from "@/components/header";
import Loader from "@/components/loader";
export default function Loading() {
  return (
    <>
      <main className="h-[1000px]">
        <Header />
        <Loader />
      </main>
    </>
  );
}
