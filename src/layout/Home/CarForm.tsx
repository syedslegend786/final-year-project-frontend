import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useAuth } from "@/context/authContext";
import { getHomeInitialData } from "@/services/api/vehicle";
import { URLS } from "@/utils/URLS";
import { cn } from "@/utils/styles";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
interface CarFormProps {
  className?: string;
}
interface InitialValues {
  start_date: Date;
  end_date: Date;
  brand: string;
  model: string;
}
const CarForm = ({ className }: CarFormProps) => {
  const { loading, logout, user } = useAuth();
  const router = useRouter();
  const [initialData, setInitialData] = useState<{
    brand: string[];
    model: string[];
  } | null>(null);
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
    handleSubmit,
  } = useFormik({
    initialValues: {
      start_date: new Date(),
      end_date: new Date(),
      brand: "",
      model: "",
    } as InitialValues,
    validationSchema: Yup.object({
      start_date: Yup.date().required("Start date is required."),
      end_date: Yup.date().required("Start date is required."),
      brand: Yup.string().required("Brand is required."),
      model: Yup.string().required("Model is required."),
    }),
    onSubmit: (submitValues) => {
      const query = `?start_date=${submitValues.start_date.toISOString()}&&end_date=${submitValues.end_date.toISOString()}&&model=${
        submitValues.model
      }&&brand=${submitValues.brand}`;
      router.push(URLS.VEHICLES + query);
    },
  });
  const GetInitialData = useCallback(async () => {
    try {
      const res = await getHomeInitialData();
      console.log(res.data);
      setInitialData(res.data);
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);
  useEffect(() => {
    GetInitialData();
  }, [GetInitialData]);
  return (
    <div
      className={cn("w-96 rounded-xl bg-white ml-auto mr-10  p-5", className)}
    >
      <h1 className="text-center text-xl font-bold mb-5">Book Now</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          error={errors.start_date && touched.start_date && errors.start_date}
          name="start_date"
          value={moment(values.start_date).format("YYYY-MM-DD")}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              start_date: new Date(e.target.value),
            }));
          }}
          type="date"
          label="Start Date"
          onBlur={handleBlur}
        />
        <Input
          onBlur={handleBlur}
          name="end_date"
          value={moment(values.end_date).format("YYYY-MM-DD")}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              end_date: new Date(e.target.value),
            }));
          }}
          error={touched.end_date && errors.end_date ? errors.end_date : ""}
          type="date"
          label="End Date"
        />
        <Select
          onChange={(value) => {
            setValues((prev) => ({
              ...prev,
              brand: String(value?.value),
            }));
          }}
          error={errors.brand && touched.brand ? errors.brand : ""}
          label="Brand"
          options={
            initialData?.brand
              ? initialData.brand.map((val) => ({ label: val, value: val }))
              : []
          }
        />
        <Select
          onChange={(value) => {
            setValues((prev) => ({
              ...prev,
              model: String(value?.value),
            }));
          }}
          error={errors.model && touched.model ? errors.model : ""}
          label="Model"
          options={
            initialData?.model
              ? initialData.model.map((val) => ({ label: val, value: val }))
              : []
          }
        />
        {user ? (
          <Button className="w-full h-12">Search</Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full h-12"
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default CarForm;
