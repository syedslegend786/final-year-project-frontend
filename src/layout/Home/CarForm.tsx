import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useAuth } from "@/context/authContext";
import { TCitiesData, citiesData } from "@/data/cities";
import { useAppDispatch } from "@/redux/hooks";
import { addCarFormStateAction } from "@/redux/slices/car.slice";
import { getHomeInitialData } from "@/services/api/vehicle";
import { URLS } from "@/utils/URLS";
import { cn } from "@/utils/styles";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
interface CarFormProps {
  className?: string;
  isSearchPage?: boolean
}
interface InitialValues {
  start_date: Date;
  end_date: Date;
  brand: string;
  model: string;
  city: string
}
const CarForm = ({ className, isSearchPage = false }: CarFormProps) => {
  const dispatch = useAppDispatch()
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
      city: ""
    } as InitialValues,
    validationSchema: Yup.object({
      start_date: Yup.date().required("Start date is required."),
      end_date: Yup.date().required("Start date is required."),
      brand: Yup.string().required("Brand is required."),
      model: Yup.string().required("Model is required."),
      city: Yup.string().required("City is required.")
    }),
    onSubmit: ({ brand, end_date, model, start_date, city }) => {
      const sDate=new Date(start_date)
      const eDate=new Date(end_date)
      if(sDate>=end_date){
        toast.error("Start date must be greater than end date")
        return;
      }
      dispatch(addCarFormStateAction({
        brand,
        end_date: new Date(end_date),
        model,
        start_date: new Date(start_date),
        city,
      }))
      router.push(URLS.VEHICLES);
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
      className={cn("w-1/2 overflow-hidden rounded-xl bg-white  mr-10 ml-auto p-5",
        className,
        {
          'w-full mr-0 ml-0 p-0 overflow-auto h-auto': isSearchPage,

        },
      )
      }
    >
      <h1 className="text-center text-xl font-bold mb-5">Book Now</h1>
      <form onSubmit={handleSubmit} className={cn({
        'space-y-3': isSearchPage,
        "grid grid-cols-3 gap-5 overflow-auto": !isSearchPage
      })}>
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
          value={{ label: values.city, value: values.city }}
          name="city"
          label='City'
          options={citiesData.map((val) => ({ ...val, label: val.name, value: val.name }))}
          onChange={(data: TCitiesData) => {
            setValues((prev) => ({ ...prev, city: data.name }))
          }}
          onBlur={handleBlur}
          error={errors.city && touched.city ? errors.city : ""}
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
        <div className={cn("col-span-2", {
          'col-span-1': isSearchPage
        })}>
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

        </div>
        {user ? (
          <Button className="w-full h-12 col-span-3">Search</Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full h-12 col-span-3"
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default CarForm;
