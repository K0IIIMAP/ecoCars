import CarsSection from "@/components/cars-section";

import { Car } from "@/lib/types";

import { supabaseServer } from "@/utils/supabase/server";

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const supabase = await supabaseServer();
  let cars: Car[] = [];
  if (query) {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

      if (data) {
        data?.map((car: Car) => {
          cars.push(car);
        });
      }
    } catch (e) {
      // catch dont work
      console.log(e);
      return;
    }
  } else {
    const { data } = await supabase.from("cars").select("*");
    if (data) {
      data?.map((car: Car) => {
        cars.push(car);
      });
    }
  }
  // filted by featured first all the time
  if (cars) {
    cars = cars?.sort((a: Car, b: Car) => {
      if (a.featured && !b.featured) {
        return -1;
      }
      if (!a.featured && b.featured) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <main className="bg-gray">
      <CarsSection cars={cars} />
    </main>
  );
}
