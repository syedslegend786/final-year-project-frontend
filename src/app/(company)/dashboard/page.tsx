"use client";
import withAuth from "@/hoc/withAuth";
import CarListings from "@/layout/dashboard/CarListings/CarListings";
import DashBoard from "@/templates/DashBoard";
import React from "react";

const Page = () => {
  return (
    <DashBoard className="min-h-screen overflow-auto">
      <CarListings />
    </DashBoard>
  );
};

export default withAuth(Page);
