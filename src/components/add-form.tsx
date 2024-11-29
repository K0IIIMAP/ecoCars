"use client";
import React, { useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addNewPost, getUserData } from "@/app/actions";
import PhotoDrop from "./photo-drop";

import { useImageStore } from "@/lib/store";
import { Button } from "./ui/button";
import { convertBlobUrlToFile } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewPostSchema } from "@/lib/schemas";

import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function AddForm() {
  const { imageUrls, setImageUrls, removeImageUrl } = useImageStore(); // Zustand hooks

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addNewPostSchema),
  });

  const onSubmit = async (formData: FormData) => {
    const user = await getUserData();
    if (user.post_tokens === 0) {
      toast.error("Error", {
        className: "bg-red-500 text-white border-none",
        description:
          "Not enough tokens. Please buy more tokens in order to post your car.",
      });
      return;
    }
    const filesFromUrls = await Promise.all(
      imageUrls.map((url) => convertBlobUrlToFile(url))
    );

    const response = await addNewPost(formData, filesFromUrls);
    if (response.success) {
      toast.success("Congratulations!", {
        className: "bg-green-500 text-white border-none",
        description: "Your car has been successfully uploaded",
      });
      redirect(`/profile/${user.id}`);
    }
    if (response.error) {
      toast.error("Error", {
        className: "bg-red-500 text-white border-none",
        description: "Unexpected error occured, please try again later",
      });
    }
  };

  return (
    <form className="flex-col flex" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="space-y-2">
        <Label htmlFor="title" className="text-xl">
          Title
        </Label>
        <Input
          id="title"
          placeholder="For example: Tesla model S Plaid 2021"
          className="mb-5"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-lg ">{`${errors.title.message}`}</p>
        )}
      </fieldset>

      <fieldset className="space-y-2 mt-5">
        <h3 className="text-xl">Photo</h3>
        <p className="text-[14px]">
          First chosen photo will be on the cover of your post.
        </p>

        <PhotoDrop />
      </fieldset>

      <fieldset className="mt-4 space-y-3">
        <Label htmlFor="description" className="text-xl">
          Description
        </Label>
        <textarea
          id="description"
          placeholder="Describe all important details about your car (year,model,milage and so on)"
          className="block w-full outline-none p-5 resize-none rounded-lg mb-5"
          rows={15}
          {...register("description")}
        />{" "}
        {errors.description && (
          <p className="text-red-500 text-lg ">{`${errors.description.message}`}</p>
        )}
      </fieldset>

      <div className="w-full md:w-[60%] mt-5">
        <fieldset className="space-y-2">
          <Label htmlFor="price" className="text-xl">
            Price ($)
          </Label>
          <Input
            placeholder="For Example: 30000"
            id="price"
            type="number"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-lg ">{`${errors.price.message}`}</p>
          )}
        </fieldset>
        <fieldset className="space-y-2 mt-5">
          <Label htmlFor="location" className="text-xl">
            Location
          </Label>
          <Input
            placeholder="For Example: New York"
            id="location"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-red-500 text-lg ">{`${errors.location.message}`}</p>
          )}
        </fieldset>
      </div>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="px-10 py-5 text-2xl mt-10 self-end"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
