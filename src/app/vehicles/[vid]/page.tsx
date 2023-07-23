"use client";
import Button from "@/components/Button";
import { createCheckoutApi, getSingleCar } from "@/services/api/vehicle";
import Main from "@/templates/Main";
import Image from "next/image";
import {
  usePathname,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Vehicle } from "@/types";
import { useAuth } from "@/context/authContext";
import { URLS } from "@/utils/URLS";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const CarDetails = () => {
  const searchParams = useSearchParams();
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setloading] = useState(true);
  const [car, setcar] = useState<null | Vehicle>(null);
  const { vid } = useParams() as { vid: string };
  const fetchCar = useCallback(async () => {
    const res = await getSingleCar(vid);
    setcar(res.data);
  }, [vid]);
  console.log(vid);
  console.log(vid);
  useEffect(() => {
    fetchCar();
  }, [fetchCar]);
  const CreateCheckout = useCallback(async (cid: string) => {
    try {
      if (!start_date || !end_date) {
        router.push("/");
      }
      const res = await createCheckoutApi(cid, start_date, end_date);
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string
      );
      stripe?.redirectToCheckout({ sessionId: res.data });
    } catch (error: any) {
      toast(error.response.data.msg);
    }
  }, [end_date, router, start_date]);
  return (
    <Main className="h-screen overflow-auto bg-white">
      {!car ? (
        <div>No dat...</div>
      ) : (
        <div className="grid grid-cols-2 divide-x divide-gray-300 mt-10">
          <div className="flex items-center justify-center">
            <Image
              src={car.image!}
              alt=""
              width={500}
              height={500}
              className="object-contain"
              quality={1}
            />
          </div>
          <div className="space-y-4 px-5">
            <h1 className="text-5xl font-bold">{car.brand}</h1>
            <h1 className="text-sm font-bold">{car.model}</h1>
            <div className="flex items-center gap-x-3">
              <h1 className="text-sm font-bold">Color:</h1>
              <div
                style={{
                  backgroundColor: car.color,
                }}
                className={`w-7 h-7 rounded-full`}
              />
            </div>
            <div className="flex items-center gap-x-3">
              <h1 className="text-sm font-bold">License Plate:</h1>
              <h1 className="text-sm font-medium">{car.licensePlate}</h1>
            </div>
            <div className="flex items-center gap-x-3">
              <h1 className="text-sm font-bold">Price:</h1>
              <h1 className="text-4xl font-bold">${car.price}/day</h1>
            </div>
            <div>
              <Button
                className="mt-10"
                onClick={() => {
                  let authUrl =
                    URLS.LOGIN +
                    `?from=${encodeURIComponent(
                      pathname +
                        encodeURIComponent(
                          `?start_date=${start_date}&end_date=${end_date}`
                        )
                    )}`;
                  if (!user) {
                    router.push(authUrl);
                  } else {
                    CreateCheckout(vid);
                  }
                }}
              >
                Checkout Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default CarDetails;
