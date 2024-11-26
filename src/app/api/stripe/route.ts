import { stripe } from "@/lib/stripe";
import { supabaseServer } from "@/utils/supabase/server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string; // Await headers()

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SIGNING_SECRET!
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("webhook error", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" &&
    event.data.object.payment_status === "paid"
  ) {
    // getting the metadata that we passed when creating a session
    const metadata = event.data.object.metadata;
    const supabase = await supabaseServer();
    // handling for featured
    if (metadata.productName === "Featured post") {
      const { carId } = metadata;
      await supabase.from("cars").update({ featured: true }).eq("id", carId);
    }
    // handling for posts
    if (metadata.productName === "Posts") {
      const { userId } = metadata;
      const { data, error } = await supabase
        .from("users")
        .select("post_tokens")
        .eq("id", userId);
      if (error) {
        return new NextResponse("error", { status: 500 });
      }
      const prevTokens = data[0].post_tokens;
      await supabase
        .from("users")
        .update({ post_tokens: prevTokens + 2 })
        .eq("id", userId);
    }
  }

  revalidatePath("/", "layout");

  return new NextResponse(null, { status: 200 });
}
