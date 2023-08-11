
import CarCard from "@/components/CarCard";
import useVehiclesApi from "@/hooks/useVehiclesApi";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { deleteCarApi, getCompanyCreatedVehicles } from "@/services/api/vehicle";
import { Vehicle } from "@/types";
import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";

const CarListings = () => {
  const [loading, setloading] = useState(true)
  const [cars, setcars] = useState<Vehicle[]>([])
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(6)
  const [total, settotal] = useState(0)
  const GetListings = useCallback(async () => {
    setloading(true)
    try {
      const { data } = await getCompanyCreatedVehicles({
        page,
        limit,
      });
      setcars(data.vehicles)
      settotal(data.total)
    } catch (error: any) {

    } finally {
      setloading(false)
    }
  }, [limit, page])
  useEffect(() => {
    GetListings()
  }, [GetListings])
  if (loading) {
    return <div>loading...</div>;
  }
  const handleDelete = async (id: string) => {
    try {
      const result = confirm('Are you sure you want to delete this car.')
      if (result) {
        await deleteCarApi(id)
        toast.success("Deleted successfully!")
        setcars(cars.filter((c)=>c._id!==id))
      }
    } catch (error) {

    }
  }
  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-4 p-6 ">
        {cars?.map((vehicle, index) => (
          <CarCard onClickDelte={handleDelete} view="company" vehicle={vehicle} key={index} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={Math.ceil(total / limit) ?? 1} onPageChange={(page: number) => {
        setpage(page)
      }} />
    </div>
  );
};

export default CarListings;
