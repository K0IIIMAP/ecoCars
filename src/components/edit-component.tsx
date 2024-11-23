"use client";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseClient } from "@/utils/supabase/client";
import { getUserData } from "@/app/actions";
import { User } from "@/lib/types";
import { revalidatePath } from "next/cache";

export default function EditComponent() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState<string>("");
  useEffect(() => {
    const someFunction = async () => {
      const supabase = supabaseClient();
      const { data: userData } = await supabase.auth.getUser();
      console.log(userData);
      const data: User = await getUserData();
      // might need also to add favourites to use state or something
      const { name, phone } = data;
      if (name) setUsername(name);
      if (phone) setPhone(phone);
    };
    someFunction();
  }, []);
  const [image, setImage] = useState<File | null>(null);
  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setImage(files[0]);
  };

  const handleAddImageToBucket = async () => {
    const supabase = supabaseClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const id = data.user.id;

    if (image) {
      try {
        // try findin if file already exists
        const { data: imageData } = await supabase.storage
          .from("avatars")
          .list("", {
            search: `${id}`,
            limit: 1,
          });

        // if exists delete
        if (imageData?.length) {
          await supabase.storage.from("avatars").remove([`${id}`]);
          console.log("deleted file");
        }
        // upload new file regardlessly
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`${id}`, image);
        console.log(data);
        const imgUrl = `https://gnavmfegxthvlkzwlhdf.supabase.co/storage/v1/object/public/${data?.fullPath}`;
        return imgUrl;
      } catch (error) {
        console.log("unepxected error", error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild autoFocus={false}>
        <button className="absolute bottom-0 right-0">
          <Edit />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              onChange={handleImageInputChange}
              type="file"
              id="image"
              className="col-span-3"
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={async () => {
              const supabase = supabaseClient();
              const { data: authData } = await supabase.auth.getUser();
              if (!authData.user) return;
              const id = authData.user.id;

              const imageUrl = await handleAddImageToBucket();
              console.log(imageUrl);
              await supabase
                .from("users")
                .update({ name: username, phone, avatar_url: imageUrl })
                .eq("id", id);
              location.reload();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
