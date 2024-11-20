"use server";

import { addNewPostSchema } from "@/lib/schemas";
import { User } from "@/lib/types";
import { supabaseServer } from "@/utils/supabase/server";
import { u } from "framer-motion/client";

export const addNewPost = async (formData: FormData): Promise<object> => {
  const supabase = await supabaseServer();
  getUserData();

  const {
    title,
    description,
    location,
    username,
    phone,
    price: priceString,
  } = Object.fromEntries(formData);
  // converting the price to number and validating
  const price = priceString ? parseInt(priceString) : 0;

  const post = { title, description, location, username, phone, price };
  const { success, error } = addNewPostSchema.safeParse(post);
  if (error) return { error: error.message };
  // get the user data and insert a row in a car table
  const data: User = await getUserData();
  const { id } = data;
  console.log(id);
  const { error: insertError } = await supabase.from("cars").insert({
    title,
    description,
    photos: ["photo1", "photo2"],
    location,
    phone,
    price,
    username,
    user_id: id,
  });
  if (insertError) {
    console.log(insertError.message);
    return { error: insertError.message };
  }
  // after successful submit we gonna -1 from posts_left
  const { error: updateError } = await supabase
    .from("users")
    .update({ posts_left: data.posts_left - 1 })
    .eq("id", id);
  if (updateError) {
    console.log(updateError.message);
    return { error: updateError.message };
  }
  console.log("sucessfully decremented");
};

export const getUserData = async () => {
  const supabase = await supabaseServer();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.log(authError.message);
    return;
  }
  const id = authData.user.id;
  console.log(id);

  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(data[0]);
  return data[0];
};
