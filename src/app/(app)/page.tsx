import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

import Popular from "@/components/popular";

import Vip from "@/components/vip";

export default async function Home() {
  return (
    <main>
      <Popular />
      <Vip />
      <CallToAction />
      <Footer />
    </main>
  );
}
