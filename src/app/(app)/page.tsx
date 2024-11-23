"use client";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

import Popular from "@/components/popular";

import Vip from "@/components/vip";
import { supabaseClient } from "@/utils/supabase/client";

export default function Home() {
  const supabase = supabaseClient();
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data, error);
  };
  getUser();
  return (
    <main>
      <Popular />
      <Vip />
      <CallToAction />
      <Footer />
    </main>
  );
}
