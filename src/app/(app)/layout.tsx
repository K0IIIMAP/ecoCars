import Header from "@/components/header";
import SearchSection from "@/components/search-section";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SearchSection />
      {children}
    </>
  );
}
