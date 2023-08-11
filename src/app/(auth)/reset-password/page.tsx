'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Logo from '@/layout/Home/Logo'
import { resetPasswordToken, verifyOTPApi } from '@/services/api/user'
import { URLS } from '@/utils/URLS'
import { handleApiError } from '@/utils/handleApiError'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
const validationSchema = Yup.object({
    password: Yup.string().required("password is required."),
    confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), ""], 'Confirm password must be equal to password.')
})
type Values = Yup.InferType<typeof validationSchema>
const ResetPassword = () => {
    const searchParam = useSearchParams()
    const token = searchParam.get("reset")
    const router = useRouter()
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        validationSchema: validationSchema,
        onSubmit: async ({ confirmPassword, password }) => {
            try {
                await resetPasswordToken({
                    token: token,
                    password: password
                })
                toast.success("Password changed successfully.")
                window.location.href = URLS.LOGIN
            } catch (error: any) {
                const err = handleApiError(error)
                toast.error(err)
            }
        },
        initialValues: { confirmPassword: "", password: "" } as Values
    })
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=' w-[20%] space-y-4'>
                <Logo className='mx-auto w-max cursor-pointer' onClick={() => { router.push(URLS.LOGIN) }} />
                <Input
                    value={values.password}
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Enter your OTP'
                    error={errors.password && touched.password ? errors.password : ""}
                />
                <Input
                    value={values.confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Enter your OTP'
                    error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                />
                <Button type='submit' className='w-full'>Submit</Button>
            </form>

        </div>
    )
}

export default ResetPassword