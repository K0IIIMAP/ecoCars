"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Cross, CrosshairIcon, CrossIcon, Trash2 } from "lucide-react";

export default function PhotoDrop() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  console.log(imageUrls);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      console.log(newImageUrls);

      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  return (
    <div className="w-full min-h-[200px]">
      <input type="file" multiple onChange={handleImageChange} />
      <div className="flex gap-4 flex-wrap mt-4">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="w-[150px] h-[150px] border border-gray-300 rounded overflow-hidden"
          >
            <div className="relative w-full h-full">
              <button
                type="reset"
                className="w-[28px] h-[28px] bg-red-500 z-10 absolute flex items-center justify-center right-0"
                onClick={() => {
                  const newImageUrls = imageUrls.filter((_, i) => i !== index);
                  setImageUrls(newImageUrls);
                }}
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
