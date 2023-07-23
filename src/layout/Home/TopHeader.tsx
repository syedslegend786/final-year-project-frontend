"use client";
import React, { useCallback, useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/authContext";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/styles";
import Link from "next/link";
import { ROLES } from "@/types";
import { URLS } from "@/utils/URLS";
import Logo from "./Logo";
const navData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Contact Us",
    url: "/contact-us",
  },
] as { title: string; url: string }[];

const TopHeader = () => {
  const { user, logout, loading } = useAuth();
  const [NavData, setNavData] = useState(navData);
  const pathname = usePathname();
  const router = useRouter();
  const HandleCompanyNavs = useCallback(() => {
    if (!loading && user) {
      if (
        user.role.includes(ROLES.COMPANY) &&
        !NavData.find((link) => link.url === URLS.COMPANY_DASHBOARD)
      ) {
        setNavData((prev) => [
          ...prev,
          { title: "Manage Garage", url: URLS.COMPANY_DASHBOARD },
          {
            title: "Transactions",
            url: URLS.TRANSACTION_HISTORY,
          },
        ]);
      }
      if (
        !user.role.includes(ROLES.COMPANY) &&
        !NavData.find((link) => link.url === URLS.BECOME_PARTNER)
      ) {
        setNavData((prev) => [
          ...prev,
          {
            title: "Become Partner",
            url: URLS.BECOME_PARTNER,
          },
          {
            title: "Transactions",
            url: URLS.TRANSACTION_HISTORY,
          },
        ]);
      }
    }
  }, [NavData, loading, user]);
  useEffect(() => {
    HandleCompanyNavs();
  }, [HandleCompanyNavs]);
  return (
    <div className="sticky top-0 inset-x-0 !z-50">
      <div className="flex items-center justify-between p-3 relative bg-white  ">
        <Logo />
        <div className="flex items-center gap-x-5 absolute left-[50%] translate-x-[-50%]">
          {NavData.map((el, index) => (
            <Link
              href={el.url}
              className={cn("text-sm !cursor-pointer", {
                "text-primary-500 underline underline-offset-4 font-medium":
                  pathname === el.url,
              })}
              key={index}
            >
              {el.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          {user ? (
            <h1 className={cn("text-sm")}>{user.username.split(" ")[0]}</h1>
          ) : null}
          <UserCircleIcon className="w-8 h-8 text-black" />
          {user ? (
            <Button
              onClick={logout}
              className="w-20 shrink-0 bg-transparent font-semibold text-primary-500 border-2 border-primary-500"
            >
              Log out
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="w-20 shrink-0 bg-transparent font-semibold text-primary-500 border-2 border-primary-500"
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
