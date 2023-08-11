import React from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Button from "../Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { Vehicle } from "@/types";
import { deleteCarApi } from "@/services/api/vehicle";
import { toast } from "react-toastify";
type ViewType = "user" | "company";
type CarCardProps = {
  vehicle: Vehicle;
  view?: ViewType;
  onClickDelte?: (id: string) => void
};
const CarCard = ({ vehicle, view = "user", onClickDelte = () => { } }: CarCardProps) => {
  const searchParams = useSearchParams();
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const router = useRouter();

  return (
    <div className="p-2 bg-white w-max rounded-xl shadow-xl h-auto">
      <div className="w-64 h-36  relative rounded-xl overflow-hidden">
        {vehicle?.ratings && (
          <div className="absolute right-2 top-2 z-10 bg-white px-2 py-1 rounded-xl flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <h1 className="text-xs text-yellow-500 font-semibold">
              {vehicle.ratings}+
            </h1>
          </div>
        )}
        {vehicle.image ? (
          <Image fill className="object-contain z-0" alt="" src={vehicle.image} />
        ) : (
          <Image
            fill
            className="object-cover z-0"
            alt=""
            src={"/assets/cars/1.jpg"}
          />
        )}
      </div>
      <div className="space-y-2 mt-2">
        <h1 className="text-lg font-semibold ">
          {vehicle?.brand && vehicle.brand}
          <span className="text-xs ml-4">{vehicle?.model && vehicle.model}</span>
        </h1>
        <div className="flex items-center gap-x-2 p-2 rounded-lg bg-gray-200 w-max">
          <UsersIcon className="w-5 h-5" />
          <span className="text-sm font-medium">
            {vehicle?.seats && vehicle?.seats}
          </span>
        </div>
        <h1 className="text-lg font-extrabold">{`PKR ${Number(vehicle.price)*287}/day`}</h1>
        {view === "user" && (
          <div className="flex justify-end">
            <Button
              onClick={() => {
                router.push(
                  URLS.VEHICLE_DETAIL(vehicle._id) +
                  `?start_date=${start_date}&&end_date=${end_date}`
                );
              }}
              className=""
            >
              Book Now
            </Button>
          </div>
        )}
        {view === "company" && (
          <div className="flex justify-between">
            <Button
              onClick={() => {
                console.log(URLS.UPDATE_CAR(vehicle._id))
                router.push(URLS.UPDATE_CAR(vehicle._id));
              }}
            >
              Update
            </Button>
            <Button onClick={() => { onClickDelte(vehicle._id) }} className="bg-red-500 ">Delete</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
