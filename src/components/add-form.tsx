"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addNewPost } from "@/app/actions";
import PhotoDrop from "./photo-drop";

import { useImageStore } from "@/lib/store";
import { Button } from "./ui/button";
import { convertBlobUrlToFile } from "@/lib/utils";

export default function AddForm() {
  const { imageUrls, setImageUrls, removeImageUrl } = useImageStore(); // Zustand hooks

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const filesFromUrls = await Promise.all(
      imageUrls.map((url) => convertBlobUrlToFile(url))
    );

    await addNewPost(formData, filesFromUrls);
  };

  return (
    <form className="flex-col flex" onSubmit={handleSubmit}>
      <fieldset className="space-y-2">
        <Label htmlFor="title" className="text-xl">
          Title
        </Label>
        <Input
          id="title"
          placeholder="For example: Tesla model S Plaid 2021"
          className="mb-5"
          name="title"
        />
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
          name="description"
        />{" "}
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
            name="price"
          />
        </fieldset>
        <fieldset className="space-y-2 mt-5">
          <Label htmlFor="location" className="text-xl">
            Location
          </Label>
          <Input
            placeholder="For Example: New York"
            id="location"
            name="location"
          />
        </fieldset>
        <h4 className="text-2xl py-5">Your personal info</h4>
        <fieldset className="space-y-2">
          <Label htmlFor="name" className="text-xl">
            Name
          </Label>
          <Input placeholder="Your Name" id="name" name="username" />
        </fieldset>

        <fieldset className="space-y-2 mt-5">
          <Label htmlFor="phone" className="text-xl">
            Phone Number
          </Label>
          <Input placeholder="Your Phone Number" id="phone" name="phone" />
        </fieldset>
      </div>
      <Button type="submit" className="px-10 py-5 text-2xl">
        Submit{" "}
      </Button>
    </form>
  );
}
