
import CarCard from "@/components/CarCard";
import useVehiclesApi from "@/hooks/useVehiclesApi";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompanyCreatedVehicles } from "@/services/api/vehicle";

const CarListings = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const res = await getCompanyCreatedVehicles();
      return res.data;
    },
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="flex gap-5 p-5 flex-wrap">
      {data?.map((vehicle, index) => (
        <CarCard view="company" vehicle={vehicle} key={index} />
      ))}
    </div>
  );
};

export default CarListings;
