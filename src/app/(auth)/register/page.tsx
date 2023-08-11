"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorBox from "@/components/ErrorBox";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { registerApi } from "@/services/api/user";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import { handleApiError } from "@/utils/handleApiError";
import { URLS } from "@/utils/URLS";
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
  email: Yup.string().required("Email is required.").email("Invalid email."),
  mobile_number: Yup.string().required("Mobile number is required.")
})
type RegisterValues = Yup.InferType<typeof validationSchema>
const Register = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { loading, user } = useAuth();
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        mobile_number: "+92",
        password: "",
        username: ""
      } as RegisterValues,
      validationSchema: validationSchema,
      onSubmit: async (formData) => {
        try {
          const res = await registerApi(formData);
          toast.success("Token has been send to your mobile number.")
          router.push(`${URLS.VERIFY_OTP}?mobileNumber=${formData.mobile_number}`)
        } catch (error: any) {
          const err = handleApiError(error)
          toast.error(err)
        }
      },
    });
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);
  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10">
      <div className="flex shadow-md">
        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white w-[24rem] ">
          <div className="w-72">
            <h1 className="text-xl font-semibold">Register</h1>
            <small className="text-gray-400">Please enter your details</small>
            <form className="mt-4 space-y-1" onSubmit={handleSubmit}>
              <Input
                label="Username*"
                value={values.username}
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username && touched.username ? errors.username : ""}
              />
              <Input
                label="Email*"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? errors.email : ""}
              />
              <Input
                label="Mobile number"
                value={values.mobile_number}
                name="mobile_number"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mobile_number && touched.mobile_number ? errors.mobile_number : ""}
              />
              <Input
                label="Password"
                value={values.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password ? errors.password : ""}
              />
              <div className="mb-3">
                <Button type="submit" className="w-full mb-1">
                  Register
                </Button>
              </div>
            </form>
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Already have account?
              </span>
              <Link
                href="/login"
                className="text-xs font-semibold text-purple-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap content-center justify-center rounded-r-md w-[24rem] h-[32rem]">
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover object-cover rounded-r-md"
            src="/assets/cars/auth.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
