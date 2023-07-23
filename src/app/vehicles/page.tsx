"use client";
import Button from "@/components/Button";
import CarCard from "@/components/CarCard";
import Input from "@/components/Input";
import useVehiclesApi from "@/hooks/useVehiclesApi";
import { getVehiclesApi } from "@/services/api/vehicle";
import Main from "@/templates/Main";
import { Vehicle } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Vehicles = () => {
  const [loading, setloading] = useState(true);
  const [cars, setcars] = useState<Vehicle[]>([]);
  const searchParams = useSearchParams();
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const model = searchParams.get("model");
  const brand = searchParams.get("brand");
  const GetCars = useCallback(async () => {
    if (start_date && end_date && model && brand) {
      console.log("get cars===>");
      try {
        const res = await getVehiclesApi({
          start_date,
          end_date,
          model,
          brand,
        });
        setcars(res.data);
      } catch (error) {
      } finally {
        setloading(false);
      }
    }
  }, [start_date, end_date, model, brand]);
  useEffect(() => {
    GetCars();
  }, [GetCars]);
  return (
    <Main className=" min-h-screen">
      <div className="flex h-full divide-x divide-gray-200">
        <div className="w-96 flex flex-col p-5 shrink-0 relative">
          <div className="bg-white p-5 w-full rounded-xl sticky top-20">
            <h1 className="text-lg font-bold underline text-center">
              Search Cars
            </h1>
            <div className="my-5 space-y-2">
              <Input label="Modal name" />
              <Input label="Modal year" />
              <Input label="Ratings" />
            </div>
            <div className="flex items-center gap-x-3">
              <Button className="w-full">Clear</Button>
              <Button className="w-full">Search</Button>
            </div>
          </div>
        </div>
        <div>
          {loading && <div>loading...</div>}
          <div className="flex-shrink-0 flex flex-wrap items-center gap-5 p-5">
            {!loading && cars.length > 0
              ? cars.map((vahicle, index) => (
                  <CarCard vehicle={vahicle} key={index} />
                ))
              : null}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Vehicles;
