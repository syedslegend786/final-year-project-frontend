'use client'
import DashBoard from '@/templates/DashBoard'
import { IFeedback } from '@/types'
import React, { useCallback, useState } from 'react'

const FeedBack = () => {
    const [feedbacks, setfeedbacks] = useState<IFeedback[]>([])
    // const GetFeedBacks = useCallback(async () => {
    //     try {
    //         await 
    //     } catch (error: any) {

    //     }
    // }, [])
    return (
        <DashBoard >
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">first name</th>
                                <th className="px-4 py-3">Last name</th>
                                <th className="px-4 py-3">email</th>
                                <th className="px-4 py-3">mobile number</th>
                                <th className="px-4 py-3">feed back</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {/* {orders.map((order, index) => (
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
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashBoard>
    )
}

export default FeedBack