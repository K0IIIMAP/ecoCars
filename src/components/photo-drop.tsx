"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FolderUp, Trash2 } from "lucide-react";

import { useImageStore } from "@/lib/store";
import { Button } from "./ui/button";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export default function PhotoDrop() {
  const { imageUrls, setImageUrls, removeImageUrl } = useImageStore(); // Zustand hooks
  const [filesLength, setFilesLength] = useState(0);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    setFilesLength((prev) => prev + files.length);

    const filesArray = Array.from(files);
    const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

    setImageUrls([...newImageUrls]);
    console.log("Image Urls", imageUrls);
    if (imageUrls.length > 8) {
      console.log(imageUrls);
      setImageUrls(imageUrls.slice(0, 8));
    } // slice if >8 images
  };

  return (
    <div className="w-full min-h-[200px]">
      <Button
        type="button"
        className="relative "
        disabled={imageUrls.length >= 8}
      >
        Upload images <FolderUp />
        <input
          type="file"
          onChange={handleImageChange}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          accept="image/png, image/jpg, image/jpeg"
          className="opacity-0 z-10 absolute inset-0 cursor-pointer"
          disabled={imageUrls.length >= 8}
          required
        />
      </Button>
      <p className="text-sm">
        {" "}
        <span className="text-slate-400"> (**png jpg jpeg) </span>
      </p>

      <div className="flex gap-4 flex-wrap mt-4 ">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="w-[150px] h-[150px] border border-gray-300 rounded overflow-hidden"
          >
            <div className="relative w-full h-full ">
              <button
                type="reset"
                className="w-[28px] h-[28px] bg-red-500 z-10 absolute flex items-center justify-center right-0"
                onClick={() => removeImageUrl(index)} // Remove from global store
              >
                <Trash2 className=" text-black z-10 size-5" />
              </button>

              <Image
                src={url}
                fill
                objectFit="cover"
                className="w-full h-full"
                alt={`img-${index}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
