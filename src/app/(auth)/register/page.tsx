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
const Register = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { loading, user } = useAuth();
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      initialValues: { username: "", password: "" },
      validationSchema: Yup.object({
        username: Yup.string().required("Username is required."),
        password: Yup.string().required("Password is required."),
      }),
      onSubmit: async (formData) => {
        try {
          const res = await registerApi(formData);
          const token = res.data;
          localStorage.setItem("token", token);
          window.location.href = "/";
        } catch (error: any) {
          if (error.response?.data?.msg) {
            toast.error(error.response.data.msg);
          } else {
            toast.error(error.message);
          }
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
        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white w-[24rem] h-[32rem]">
          <div className="w-72">
            <h1 className="text-xl font-semibold">Register</h1>
            <small className="text-gray-400">Please enter your details</small>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Username
                </label>
                <input
                  value={values.username}
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your username"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
                {errors.username && touched.username ? (
                  <ErrorBox text={errors.username} className="my-1" />
                ) : null}
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <input
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

              {/* <div className="mb-3 flex flex-wrap content-center">
                <a href="#" className="text-xs font-semibold text-purple-700">
                  Forgot password?
                </a>
              </div> */}
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
