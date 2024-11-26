"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Car } from "@/lib/types";

import { editPost } from "@/app/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewPostSchema } from "@/lib/schemas";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";

export default function EditCarBtn({
  car,
  carId,
}: {
  car: Car;
  carId: string;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addNewPostSchema),
  });
  const onSubmit = async (fieldValues: unknown) => {
    const formData = fieldValues;

    const result = await editPost(formData, carId);
    if (result.success) {
      toast.success("Post has been edited", {
        className: "bg-green-500  text-white border-none",
      });
      setOpen(false);
    }
    if (result.error) {
      toast.error("Something Went Wrong!", {
        className: "bg-red-500",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-lg mt-5">Edit a post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1005px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                defaultValue={car.title}
                className="col-span-3"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.title.message}`}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                defaultValue={car.price}
                className="col-span-3"
                type="number"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.price.message}`}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                defaultValue={car.description}
                className="col-span-3  border border-black/10 rounded-lg text-sm p-3 focus:border-black"
                rows={10}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.description.message}`}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                defaultValue={car.location}
                className="col-span-3"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 absolute bottom-[-20px] text-sm">{`${errors.location.message}`}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </DialogFooter>
          {/*this input is for passing the car id to action*/}
          <input type="text" defaultValue={carId} className="hidden" readOnly />
        </form>
      </DialogContent>
    </Dialog>
  );
}
