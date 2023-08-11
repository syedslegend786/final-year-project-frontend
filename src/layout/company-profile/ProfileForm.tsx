import Input from '@/components/Input'
import Select from '@/components/Select'
import { TCitiesData, citiesData } from '@/data/cities'
import { updateCompanyProfileApi } from '@/services/api/company'
import { useFormik } from 'formik'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Map from './Map'
import Button from '@/components/Button'
const profileValidation = Yup.object({
    username: Yup.string().required("User name is required."),
    email: Yup.string().required("Email is required.").email("Invalid email."),
    mobile_number: Yup.string().required("Mobile number is required."),
    city: Yup.string().required("City is required."),
    lat: Yup.number().required("Latitude is required."),
    long: Yup.number().required("Longitude is required."),
})

type Values = Yup.InferType<typeof profileValidation>
const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};
interface ProfileFormProps {
    data?: Partial<Values>
}
const ProfileForm = ({ data }: ProfileFormProps) => {
    const [map, setMap] = React.useState(null)
    const { values, errors, touched, handleChange, setValues, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            city: data?.city ?? "",
            email: data?.email ?? "",
            lat: data?.lat ?? 0,
            long: data?.long ?? 0,
            mobile_number: data?.mobile_number ?? 0,
            username: data?.username ?? '',
        } as Values,
        enableReinitialize: true,
        onSubmit: async (submitValues) => {
            try {
                await updateCompanyProfileApi(submitValues)
                toast.success("Profile updated successfully.")
            } catch (error: any) {

            }
        },
        validationSchema: profileValidation
    })
    return (
        <div className='p-6'>
            <div className='w-48 h-48 rounded-full relative mx-auto'>
                <Image fill className='rounded-full' src={'/assets/cars/1.jpg'} alt='' />
            </div>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-10 w-1/2 mx-auto mt-10'>
                <Input
                    label='Email'
                    value={values.email}
                    name='email'
                    onChange={handleChange}
                    error={errors.email && touched.email ? errors.email : ""}
                    onBlur={handleBlur}
                />
                <Input
                    disabled
                    label='Mobile number'
                    value={values.mobile_number}
                    name='mobile_number'
                    onChange={handleChange}
                    error={errors.mobile_number && touched.mobile_number ? errors.mobile_number : ""}
                    onBlur={handleBlur}
                />
                <div className='col-span-2'>
                    <Select
                        value={{ label: values.city, value: values.city }}
                        name="city"
                        label='City'
                        options={citiesData.map((val) => ({ ...val, label: val.name, value: val.name }))}
                        onChange={(data: TCitiesData) => {
                            setValues((prev) => ({ ...prev, city: data.name, lat: Number(data.lat), long: Number(data.lng) }))
                        }}
                        onBlur={handleBlur}
                        error={errors.city && touched.city ? errors.city : ""}
                    />
                </div>
                <Input
                    disabled
                    label='Latitude'
                    value={values.lat}
                    name='lat'
                    onChange={handleChange}
                    error={errors.lat && touched.lat ? errors.lat : ""}
                    onBlur={handleBlur}
                />
                <Input
                    disabled
                    label='Longitude'
                    value={values.long}
                    name='long'
                    onChange={handleChange}
                    error={errors.long && touched.long ? errors.long : ""}
                    onBlur={handleBlur}
                />
                <div className='col-span-2'>
                    <Map setValues={setValues} values={values} />
                </div>
                <Button className='col-span-2 p-3'>Create</Button>
            </form>
        </div>
    )
}

export default ProfileForm