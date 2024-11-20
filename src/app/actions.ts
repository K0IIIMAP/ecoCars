"use server";

import { addNewPostSchema } from "@/lib/schemas";
import { User } from "@/lib/types";

import { v4 as uuidv4 } from "uuid";

import { supabaseServer } from "@/utils/supabase/server";

export const addNewPost = async (
  formData: FormData,
  filesFromUrls: Object[]
): Promise<object> => {
  const supabase = await supabaseServer();

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

  //adding images to basket ( with foled of uuid) then returning them in an array
  const uuid = uuidv4();
  const fileUrls = await addImagesToStorage(filesFromUrls, uuid);

  const { error: insertError } = await supabase.from("cars").insert({
    title,
    description,
    photos: fileUrls,
    location,
    phone,
    price,
    username,
    user_id: id,
    id: uuid,
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

export const addImagesToStorage = async (
  filesFromUrls: Object[],
  uuid: string
) => {
  const fileUrls = [];
  const supabase = await supabaseServer();
  for (const file of filesFromUrls) {
    const fileName = file.name;
    const filePath = `/${uuid}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("car-images")
      .upload(filePath, file);
    fileUrls.push(
      `https://dkymwtifvmfitldsozxr.supabase.co/storage/v1/object/public/${data?.fullPath}`
    );
  }
  return fileUrls;
};
