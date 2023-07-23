"use client";
import Button from "@/components/Button";
import { becomeCompanyApi } from "@/services/api/company";
import React from "react";

const BecomePartner = () => {
  //   const res = await becomeCompanyApi();
  const becomeCompany = async () => {
    try {
      const res = await becomeCompanyApi();
      window.open(res.data, "_blank");
    } catch (error: any) {}
  };
  return (
    <div>
      <Button onClick={becomeCompany}>Become a Company</Button>
    </div>
  );
};

export default BecomePartner;
