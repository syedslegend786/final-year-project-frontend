import { AxiosResponse } from "axios";
import httpCommon from "../httpCommon";
import { Vehicle } from "@/types";
export const getVehiclesApi = async (body: any) => {
  return httpCommon.post(`/cars/listings`, body);
};

export const uploadVehicleApi = async (data: any) => {
  return httpCommon.post("/car", data);
};
export const updateVehicleApi = async (data: any, carid: string) => {
  return httpCommon.patch(`/update/car/${carid}`, data);
};
export const getCompanyCreatedVehicles = async (data: any) => {
  return httpCommon.post("/company-vehicles", data);
};

export const getSingleCar = async (
  cid: string
): Promise<AxiosResponse<Vehicle, any>> => {
  return httpCommon.get(`/car/${cid}`);
};

// home initial data...

export const getHomeInitialData = async (): Promise<
  AxiosResponse<{ model: string[]; brand: string[] }, any>
> => {
  return httpCommon.get("/home/initial-data");
};

export const createCheckoutApi = async (
  cid: string,
  start_date: string,
  end_date: string
): Promise<AxiosResponse<string, any>> => {
  return httpCommon.post(
    `/create-checkout/${cid}/${start_date}/${end_date}`,
    {}
  );
};
type updateCarImage = {
  carId: string;
  image: File;
};
export const updateCarImage = async (data: updateCarImage) => {
  const formdata = new FormData();
  formdata.append("image", data.image);
  formdata.append("carId", data.carId);
  return httpCommon.post("/update/car/image", formdata);
};


export const deleteCarApi = async (id: string) => {
  return httpCommon.del(`/delete/car/${id}`)
}