"use server";

import { addNewPostSchema, Post } from "@/lib/schemas";
import { Car, User } from "@/lib/types";

import { v4 as uuidv4 } from "uuid";

import { supabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addNewPost = async (
  formData: FormData,
  filesFromUrls: Object[]
) => {
  const supabase = await supabaseServer();

  const { title, description, location, price } = formData;

  const post = { title, description, location, price };
  const { success, error } = addNewPostSchema.safeParse(post);
  console.log(success, error);
  post.price = parseInt(post.price);

  if (error) {
    console.log("error parsing zod", error.message);
    return { error: error.message };
  }

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

    price,

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
    .update({ post_tokens: data.post_tokens - 1 })
    .eq("id", id);
  if (updateError) {
    console.log(updateError.message);
    return { error: updateError.message };
  }
  console.log("sucessfully decremented");
  return { success: "Post added successfully" };
};

export const getUserData = async (): Promise<User | { error: string }> => {
  const supabase = await supabaseServer();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    return { error: authError.message };
  }
  const id = authData.user.id;

  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) {
    return { error: error.message };
  }

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
      `https://gnavmfegxthvlkzwlhdf.supabase.co/storage/v1/object/public/${data?.fullPath}`
    );
  }
  return fileUrls;
};

export async function editPost(formData: unknown, carId: string) {
  console.log(formData, carId);

  const supabase = await supabaseServer();
  const post = formData;

  const { error: zodError, data: validatedData } =
    addNewPostSchema.safeParse(post);

  if (zodError) {
    const errorDetails = zodError?.errors.map((issue) => ({
      field: issue.path[0], // Name of the field
      message: issue.message, // Error message
    }));
    console.log(errorDetails);
    return { error: errorDetails };
  }
  validatedData.price = parseInt(validatedData.price);
  const { data: carData, error: carError } = await supabase
    .from("cars")
    .select("*")
    .eq("id", carId);
  if (carError) {
    return { error: carError.message };
  }
  const { error, data } = await supabase
    .from("cars")
    .update(validatedData)
    .eq("id", carId);
  console.log(error, data);
  if (error) {
    return { error: error.message };
  }
  revalidatePath(`/car/${carId}`);

  return { success: "Post updated successfully" };
}
