import { getVehiclesApi } from "@/services/api/vehicle";
import { Vehicle } from "@/types";
import React, { useCallback, useEffect, useState } from "react";

const useVehiclesApi = () => {
  const [loading, setloading] = useState(true);
  const [vehicles, setvehicles] = useState<Vehicle[]>([]);
  const fetchVehicles = useCallback(async () => {
    try {
      const res = await getVehiclesApi();
      setvehicles(res.data);
      console.log(res.data)
    } catch (error: any) {
    } finally {
      setloading(false);
    }
  }, []);
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);
  return {
    vehicles,
    loading,
  };
};

export default useVehiclesApi;
