"use client";
import withAuth from "@/hoc/withAuth";
import httpCommon from "@/services/httpCommon";
import { URLS } from "@/utils/URLS";
import React, { useCallback, useEffect } from "react";

const Redirect = () => {
  const VerifyCompany = useCallback(async () => {
    try {
       await httpCommon.post("/verify-instructor", {});
    } catch (error: any) {
      alert(error.message);
    }finally{
      window.location.href=URLS.HOME
    }
  }, []);
  useEffect(() => {
    VerifyCompany();
  }, [VerifyCompany]);
  return <div>redirecting.</div>;
};

export default withAuth(Redirect);
