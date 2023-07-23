"use client";
import { getCompanyOrdersApi } from "@/services/api/order";
import { getUserApi, logoutApi } from "@/services/api/user";
import { IOrder, User } from "@/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
type AuthContext = {
  user: User | null;
  loading: boolean;
  logout: () => void;
  orders: IOrder[];
};
const Context = React.createContext({} as AuthContext);
const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setuser] = useState<User | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [orders, setorders] = useState<IOrder[]>([]);

  const GetUser = useCallback(async () => {
    try {
      const res = await getUserApi();
      setuser(res.data);
    } catch (error) {
      setuser(null);
    } finally {
      setloading(false);
    }
  }, []);

  const GetCompanyOrders = useCallback(async () => {
    try {
      const res = await getCompanyOrdersApi();
      setorders(res.data);
    } catch (error: any) {
      console.error(`error while fetching company orders--->`, error.message);
    }
  }, []);
  useEffect(() => {
    GetUser();
  }, [GetUser]);

  useEffect(() => {
    GetCompanyOrders();
  }, [GetCompanyOrders]);
  const logout = useCallback(async () => {
    try {
      // await logoutApi();
      localStorage.removeItem("token");
    } catch (error: any) {
    } finally {
      setuser(null);
      router.refresh();
    }
  }, [router]);
  return (
    <Context.Provider
      value={{
        user,
        loading,
        logout,
        orders,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthContext;

export const useAuth = () => React.useContext(Context);
