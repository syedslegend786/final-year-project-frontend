import Input from "@/components/Input";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import Logo from "../Home/Logo";
import Button from "@/components/Button";
import Image from "next/image";
import { uploadVehicleApi } from "@/services/api/vehicle";
import { toast } from "react-toastify";
// brand
// model
// color
// licensePlate
// available
// seats
// price
// ratings
const carSchema = Yup.object({
  brand: Yup.string().required("Brand is required."),
  model: Yup.string().required("Model is required."),
  color: Yup.string().required("Color is required."),
  licensePlate: Yup.string().required("License is required."),
  seats: Yup.number().required("Seats are required."),
  price: Yup.number().required("Price is required."),
  image: Yup.mixed()
    .required("Image is required.")
    .test("iscorrectfile", "Incorrect file type.", (file: any) => {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        return false;
      }
      return true;
    }),
});
const initialValues = {
  brand: "",
  model: "",
  color: "",
  licensePlate: "",
  seats: 4,
  price: 5,
  image: null,
};
const AddCarForm = () => {
  const [image, setimage] = useState<File | null>(null);
  const {
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    handleChange,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: carSchema,
    onSubmit: async (submiValues) => {
      const formData = new FormData();
      Object.entries(submiValues).map(([key, value]) => {
        formData.append(key, value as string);
      });
      try {
        await uploadVehicleApi(formData);
        toast("Vehicle Created Successfully.");
      } catch (error: any) {
        toast(error.response.data.msg);
      }
    },
  });
  const imageBase64 = useMemo(() => {
    if (values.image) {
      return URL.createObjectURL(values.image!);
    }
    return null;
  }, [values.image]);
  return (
    <div className="py-5 space-y-10 h-full overflow-auto">
      <Logo className="text-center text-5xl" />
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 w-1/2 gap-5">
          {image && (
            <div className="col-span-2 mx-auto">
              <div className="w-52 h-52 relative">
                <Image
                  fill
                  src={imageBase64!}
                  alt=""
                  className="rounded-full"
                />
              </div>
            </div>
          )}
          <Input
            type="file"
            onChange={(e) => {
              if (!e?.target?.files) {
                return;
              }
              const file = e.target.files[0];
              setValues((prev) => ({
                ...prev,
                image: file as any,
              }));
              setimage(file);
            }}
            name="image"
            onBlur={handleBlur}
            label="Image"
            className="w-full"
            error={errors.image && touched.image ? errors.image : ""}
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
  );
};

export default AddCarForm;
