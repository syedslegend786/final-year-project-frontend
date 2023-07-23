"use client";
import Button from "@/components/Button";
import {
  getCompanyOrdersLisingsApi,
  markOrderReadApi,
} from "@/services/api/order";
import DashBoard from "@/templates/DashBoard";
import { IOrder } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setorders] = useState<IOrder[]>([]);
  const GetOrders = useCallback(async () => {
    const res = await getCompanyOrdersLisingsApi();
    setorders(res.data);
  }, []);
  useEffect(() => {
    GetOrders();
  }, [GetOrders]);
  const markReadOrders = async (oid: string) => {
    try {
      await markOrderReadApi(oid);
      GetOrders();
    } catch (error) {}
  };
  return (
    <DashBoard>
      <div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Username (Booker)</th>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Start date</th>
                  <th className="px-4 py-3">End date</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders.map((order, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {typeof order.booked_by !== "string" &&
                        order.booked_by?.username}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {typeof order?.car !== "string" && order.car?.brand}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {typeof order?.car !== "string" &&
                        new Date(
                          order.car?.start_date as string
                        ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {typeof order?.car !== "string" &&
                        new Date(
                          order.car?.end_date as string
                        ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {typeof order?.car !== "string" && order.car?.price}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {!order.isRead && (
                        <Button
                          onClick={() => {
                            markReadOrders(order._id);
                          }}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashBoard>
  );
};

export default Orders;
