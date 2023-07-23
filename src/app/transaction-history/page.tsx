'use client'
import Logo from "@/layout/Home/Logo";
import { getOrderHistoryFoUserApi } from "@/services/api/order";
import Main from "@/templates/Main";
import { IOrder } from "@/types";
import React, { useCallback, useEffect, useState } from "react";

const TransactionsHistory = () => {
  const [orders, setorders] = useState<IOrder[]>([]);
  const GetOrderHistory = useCallback(async () => {
    try {
      const res = await getOrderHistoryFoUserApi();
      setorders(res.data);
    } catch (error) {}
  }, []);
  useEffect(() => {
    GetOrderHistory();
  }, [GetOrderHistory]);
  return (
    <Main>
      <div className="p-5">
        <h1 className="font-bold text-2xl text-center">Transaction History</h1>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg mt-10">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Start date</th>
                  <th className="px-4 py-3">End date</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders.map((order, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {order._id}
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
                      {typeof order?.car !== "string" && `$${order.car?.price}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default TransactionsHistory;
