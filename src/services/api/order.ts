import { AxiosResponse } from "axios";
import httpCommon from "../httpCommon";
import { IOrder } from "@/types";

export const getCompanyOrdersApi = async (): Promise<
  AxiosResponse<IOrder[], any>
> => {
  return httpCommon.get("/orders");
};

export const getCompanyOrdersLisingsApi = async () => {
  return httpCommon.get("/orders-listing");
};

export const markOrderReadApi = async (oid: string) => {
  return httpCommon.post("/mark-order-read", {
    oid,
  });
};
export const getOrderHistoryFoUserApi = async () => {
  return httpCommon.get("/order-history");
};
