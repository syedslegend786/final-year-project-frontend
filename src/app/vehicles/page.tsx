"use client";
import Button from "@/components/Button";
import CarCard from "@/components/CarCard";
import Input from "@/components/Input";
import NotFoundComponent from "@/components/NotFoundComponent";
import Pagination from "@/components/Pagination";
import useVehiclesApi from "@/hooks/useVehiclesApi";
import CarForm from "@/layout/Home/CarForm";
import { dispatch } from "@/redux";
import { useAppSelector } from "@/redux/hooks";
import { addCarFormStateAction } from "@/redux/slices/car.slice";
import { getVehiclesApi } from "@/services/api/vehicle";
import Main from "@/templates/Main";
import { Vehicle } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Vehicles = () => {
  const carState = useAppSelector((s) => s.car)
  const [loading, setloading] = useState(true);
  const [cars, setcars] = useState<Vehicle[]>([]);
  const [totalDocs, settotalDocs] = useState(0)
  const GetCars = useCallback(async () => {
    const { brand, end_date, model, start_date, city, limit, page } = carState.search
    if (start_date && end_date && model && brand && city) {
      console.log("get cars===>");
      try {
        setloading(true)
        const res = await getVehiclesApi({
          start_date,
          end_date,
          model,
          brand,
          city,
          limit,
          page
        });
        setcars(res.data.cars);
        settotalDocs(res.data.total)
      } catch (error) {
      } finally {
        setloading(false);
      }
    }
  }, [carState.search]);
  useEffect(() => {
    GetCars();
  }, [GetCars]);
  return (
    <Main className="">
      <div className="flex h-full divide-x divide-gray-200">
        <div className="w-96 flex flex-col p-5 shrink-0 relative">
          <div className="bg-white p-5 w-full rounded-xl sticky top-20">
            <h1 className="text-lg font-bold underline text-center">
              Search Cars
            </h1>
            <CarForm isSearchPage={true} />
            {/* <div className="my-5 space-y-2">
              <Input label="Modal name" />
              <Input label="Modal year" />
              <Input label="Ratings" />
            </div>
            <div className="flex items-center gap-x-3">
              <Button className="w-full">Clear</Button>
              <Button className="w-full">Search</Button>
            </div> */}
          </div>
        </div>
        <div className=" w-full">
          {loading && <div>loading...</div>}
          {
            !loading && cars.length === 0 ?
              <NotFoundComponent />
              :
              null
          }
          <div className="flex-shrink-0 flex flex-wrap items-center gap-5 p-5">
            {!loading && cars.length > 0
              ? cars.map((vahicle, index) => (
                <CarCard vehicle={vahicle} key={index} />
              ))
              : null}
          </div>
          <div className="flex items-center justify-center flex-row !w-full shrink-0">
            {
              cars.length ?
                <Pagination currentPage={carState.search.page ?? 1} totalPages={Math.ceil(totalDocs / 6) ?? 1} onPageChange={(page: number) => {
                  dispatch(addCarFormStateAction({
                    ...carState.search,
                    page: page
                  }))
                }} />
                :
                null
            }
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Vehicles;
