import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

import Popular from "@/components/popular";

import Vip from "@/components/vip";

import { getUserData } from "../actions";

export default async function Home() {
  console.log("data from action");
  getUserData();

  return (
    <main>
      <Popular />
      <Vip />
      <CallToAction />
      <Footer />
    </main>
  );
}
