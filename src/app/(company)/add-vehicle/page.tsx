"use client";
import withAuth from "@/hoc/withAuth";
import AddCarForm from "@/layout/add-cars/AddCarForm";
import DashBoard from "@/templates/DashBoard";
import React from "react";

const AddVehicle = () => {
  return (
    <DashBoard>
      <AddCarForm />
    </DashBoard>
  );
};

export default withAuth(AddVehicle);
