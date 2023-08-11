"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorBox from "@/components/ErrorBox";
import { loginApi } from "@/services/api/user";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TopHeader from "@/layout/Home/TopHeader";
import Input from "@/components/Input";
import { URLS } from "@/utils/URLS";
const validationSchema = Yup.object({
  mobile: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
})
type Values = Yup.InferType<typeof validationSchema>
const Login = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();
  const { loading, user } = useAuth();
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      initialValues: { mobile: "", password: "" } as Values,
      validationSchema: validationSchema,
      onSubmit: async ({ mobile, password }) => {
        try {
          const { data } = await loginApi({
            mobile_number: mobile,
            password
          });
          if (data.token) {
            toast.success("Verification token sent to you email")
            window.location.href = `${URLS.VERIFY_OTP}?mobileNumber=${mobile}`
          } else {
            console.log(data);
            localStorage.setItem("token", data);
            window.open("/", "_self");
          }
        } catch (error: any) {
          toast.error("Incorrect credentials.");
        }
      },
    });
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);
  return (
    <>
      <TopHeader />
      <div className="flex flex-wrap min-h-screen w-full content-center justify-center  py-10">
        <div className="flex shadow-md">
          <div className="relative flex flex-wrap content-center justify-center rounded-l-md bg-white w-[24rem] h-[32rem]">
            <div className="w-72">
              <h1 className="text-xl font-semibold">Welcome back</h1>
              <small className="text-gray-400">
                Welcome back! Please enter your details
              </small>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Input
                    label="Mobile number"
                    value={values.mobile}
                    name="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your username"
                    error={errors.mobile && touched.mobile ? errors.mobile : ""}
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                </div>

                <div className="mb-3">
                  <Input
                    label="Password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="*****"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  {errors.password && touched.password ? (
                    <ErrorBox text={errors.password} className="my-1" />
                  ) : null}
                </div>

                <div className="mb-3 flex flex-wrap content-center">
                  <Link href={URLS.FORGET_PASSWORD} className="text-xs font-semibold text-purple-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="mb-3">
                  <Button type="submit" className="w-full mb-1">
                    Sign in
                  </Button>
                </div>
              </form>

              <div className="text-center">
                <span className="text-xs text-gray-400 font-semibold">
                  Dont have account?
                </span>
                <Link
                  href="/register"
                  className="text-xs font-semibold text-purple-700"
                >
                  Sign up
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
    </>
  );
};

export default Login;
