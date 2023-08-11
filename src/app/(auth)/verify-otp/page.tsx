'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Logo from '@/layout/Home/Logo'
import { verifyOTPApi } from '@/services/api/user'
import { URLS } from '@/utils/URLS'
import { handleApiError } from '@/utils/handleApiError'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
const validationSchema = Yup.object({
    token: Yup.string().required("Token is required.")
})
const VerifyOtp = () => {
    const searchParam = useSearchParams()
    let mobileNumber = searchParam.get("mobileNumber")?.trim()
    const router = useRouter()
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        validationSchema: validationSchema,
        onSubmit: async ({ token }) => {
            if (!mobileNumber?.startsWith("+")) {
                mobileNumber = `+${mobileNumber}`.trim()
            }
            try {
                await verifyOTPApi({
                    mobile_number: mobileNumber, otp: token
                })
                toast.success("Verified successfully.")
                window.location.href = URLS.LOGIN
            } catch (error: any) {
                const err = handleApiError(error)
                toast.error(err)
            }
        },
        initialValues: { token: "" }
    })
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=' w-[20%] space-y-4'>
                <Logo className='mx-auto w-max cursor-pointer' onClick={() => { router.push(URLS.LOGIN) }} />
                <Input
                    value={values.token}
                    name='token'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Enter your OTP'
                    error={errors.token && touched.token ? errors.token : ""}
                />
                <Button type='submit' className='w-full'>Verify</Button>
            </form>

        </div>
    )
}

export default VerifyOtp