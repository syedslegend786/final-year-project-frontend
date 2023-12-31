"use client";
import Input from "@/components/Input";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import Button from "@/components/Button";
import Image from "next/image";
import {
  getSingleCar,
  updateCarImage,
  updateVehicleApi,
  uploadVehicleApi,
} from "@/services/api/vehicle";
import { toast } from "react-toastify";
import { Vehicle } from "@/types";
import DashBoard from "@/templates/DashBoard";
import Logo from "@/layout/Home/Logo";
import { useParams } from "next/navigation";

const carSchema = Yup.object({
  brand: Yup.string().required("Brand is required."),
  model: Yup.string().required("Model is required."),
  color: Yup.string().required("Color is required."),
  licensePlate: Yup.string().required("License is required."),
  seats: Yup.number().required("Seats are required."),
  price: Yup.number().required("Price is required."),
});
const initialValues = {
  brand: "",
  model: "",
  color: "",
  licensePlate: "",
  seats: 4,
  price: 5,
};

type InitialValues = Yup.InferType<typeof carSchema>;

const AddCarForm = () => {
  const [isUploadingImage, setisUploadingImage] = useState(false);
  const [car, setcar] = useState<Vehicle | null>(null);
  const params = useParams();
  const {
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    handleChange,
    setValues,
  } = useFormik({
    initialValues: {
      brand: car?.brand,
      color: car?.color,
      licensePlate: car?.licensePlate,
      model: car?.model,
      price: car?.price,
      seats: car?.seats,
    } as InitialValues,
    enableReinitialize: true,
    validationSchema: carSchema,
    onSubmit: async (submiValues) => {
      try {
        await updateVehicleApi(submiValues, params.id);
        toast.success("Car Updated Successfully.")
      } catch (error) {}
    },
  });
  const GetSingleCar = useCallback(async () => {
    if (params?.id) {
      const res = await getSingleCar(params?.id);
      setcar(res.data);
    }
  }, [params?.id]);
  useEffect(() => {
    GetSingleCar();
  }, [GetSingleCar]);
  const handleUpdateCarImage = async (file: File) => {
    try {
      if (!params?.id) {
        return;
      }
      setisUploadingImage(true);
      const res = await updateCarImage({
        carId: params?.id,
        image: file,
      });
      setcar({ ...car!, image: res.data });
    } catch (error: any) {
    } finally {
      setisUploadingImage(false);
    }
  };
  return (
    <DashBoard>
      <div className="py-5 space-y-10 h-full overflow-auto">
        <Logo className="text-center text-5xl" />
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 w-1/2 gap-5"
          >
            {car?.image && (
              <div className="col-span-2 mx-auto">
                <div className="w-52 h-52 relative">
                  <Image fill src={car.image} alt="" className="rounded-full" />
                </div>
              </div>
            )}
            <Input
              disabled={isUploadingImage}
              label="Change Car Photo"
              type="file"
              onChange={(e) => {
                if (!e.target.files) {
                  return;
                }
                const file = e.target.files[0];
                handleUpdateCarImage(file);
              }}
            />
            <Input
              label="Model"
              name="model"
              value={values.model}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.model && touched.model ? errors.model : ""}
              className="w-full"
            />
            <Input
              label="Brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.brand && touched.brand ? errors.brand : ""}
              className="w-full"
            />
            <Input
              label="License Plate"
              name="licensePlate"
              value={values.licensePlate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.licensePlate && touched.licensePlate
                  ? errors.licensePlate
                  : ""
              }
              className="w-full"
            />
            <Input
              label="Seats"
              name="seats"
              value={values.seats}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.seats && touched.seats ? errors.seats : ""}
              className="w-full"
            />
            <Input
              label="Color"
              name="color"
              type="color"
              value={values.color}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.color && touched.color ? errors.color : ""}
              className="w-full"
            />
            <Input
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.price && touched.price ? errors.price : ""}
              className="w-full"
            />
            <Button type="submit" className="col-span-2">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </DashBoard>
  );
};

export default AddCarForm;
