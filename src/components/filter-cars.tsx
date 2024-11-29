"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
export default function FilterCars({
  setFilteredCars,
  filteredCars,
}: {
  setFilteredCars: React.Dispatch<React.SetStateAction<Car[]>>;
  filteredCars: Car[];
}) {
  const router = useRouter(); // use router to manipulate URL
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState("");

  useEffect(() => {
    // on mount to set the filter from the url ( for someone who will share link)
    const initialFilter = searchParams.get("filter") || "";
    setFilter(initialFilter);
    console.log("blablabla");
  }, []);
  useEffect(() => {
    let updatedCars = [...filteredCars];
    console.log(updatedCars);
    if (filter === "newest") {
      updatedCars = updatedCars.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setFilteredCars(updatedCars);
    } else if (filter === "price") {
      updatedCars = updatedCars.sort((a, b) => a.price - b.price);
      setFilteredCars(updatedCars);
    }

    // update the url only if the filter state changes
  }, [filter]); // as it has to be no change

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Filtered by {filter ? filter : "default"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
