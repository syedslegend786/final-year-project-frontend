"use client";
import withAuth from "@/hoc/withAuth";
import httpCommon from "@/services/httpCommon";
import React, { useCallback, useEffect } from "react";

const Redirect = () => {
  const VerifyCompany = useCallback(async () => {
    try {
       await httpCommon.post("/verify-instructor", {});
    } catch (error: any) {
      alert(error.message);
    }
  }, []);
  useEffect(() => {
    VerifyCompany();
  }, [VerifyCompany]);
  return <div>redirect.</div>;
};

export default withAuth(Redirect);
