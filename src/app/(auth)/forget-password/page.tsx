'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Logo from '@/layout/Home/Logo'
import { forgetPasswordApi, resetPasswordToken, verifyOTPApi } from '@/services/api/user'
import { URLS } from '@/utils/URLS'
import { handleApiError } from '@/utils/handleApiError'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
const validationSchema = Yup.object({
    mobileNumber: Yup.string().required("Mobile number is required.")
})
type Values = Yup.InferType<typeof validationSchema>
const ForgetPassword = () => {
    const searchParam = useSearchParams()
    const token = searchParam.get("reset")
    const router = useRouter()
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        validationSchema: validationSchema,
        onSubmit: async ({ mobileNumber }) => {
            try {
                await forgetPasswordApi({
                    mobileNumber,
                })
                toast.success("Reset password link has been sent to you mobile number.")
            } catch (error: any) {
                const err = handleApiError(error)
                toast.error(err)
            }
        },
        initialValues: { mobileNumber: "" } as Values
    })
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=' w-[20%] space-y-4'>
                <Logo className='mx-auto w-max cursor-pointer' onClick={() => { router.push(URLS.LOGIN) }} />
                <Input
                    value={values.mobileNumber}
                    name='mobileNumber'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Enter your mobile number'
                    error={errors.mobileNumber && touched.mobileNumber ? errors.mobileNumber : ""}
                />
                <Button type='submit' className='w-full'>Submit</Button>
            </form>

        </div>
    )
}

export default ForgetPassword