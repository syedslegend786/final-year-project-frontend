import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import ArrowLeftCircleIcon from "@heroicons/react/24/outline/ArrowLeftCircleIcon";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/styles";
import { URLS } from "@/utils/URLS";
import { useAuth } from "@/context/authContext";
const navData = [
  {
    title: "My Listings",
    url: URLS.COMPANY_DASHBOARD,
  },
  {
    title: "Add Cars",
    url: URLS.ADD_CAR,
  },
  {
    title: "Orders",
    url: URLS.ORDERS,
    badge: true,
  },
] as { title: string; url: string; badge?: boolean }[];
const DashBoardSideBar = () => {
  const {orders}=useAuth()
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex-[0.2] flex flex-col items-center border-r py-5">
      <Button
        onClick={() => {
          router.push(URLS.HOME);
        }}
        className="bg-transparent text-primary-500 border border-primary-500"
        leftIcon={<ArrowLeftCircleIcon className="w-6 h-6 text-primary-500" />}
      >
        Go Back Home
      </Button>
      {navData.map((el, index) => (
        <Link
          key={index}
          href={el.url}
          className={cn(
            "bg-gray-200 p-2 w-full text-center text-sm hover:bg-primary-500 hover:text-white  mt-3 flex items-center justify-between px-6",
            {
              "bg-primary-500 text-white": pathname === el.url,
            }
          )}
        >
          <h1>{el.title}</h1>
          {el.badge && (
            <div className="rounded-full h-8 w-8 bg-white text-primary-500 text-center flex items-center justify-center">
              <h1>{orders.length}</h1>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default DashBoardSideBar;
