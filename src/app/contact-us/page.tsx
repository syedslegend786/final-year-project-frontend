'use client'
import ErrorBox from '@/components/ErrorBox'
import { createFeedBackApi } from '@/services/api/feedback'
import { handleApiError } from '@/utils/handleApiError'
import { useFormik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const validationObject = Yup.object({
    email: Yup.string().required("Email is required.").email("Invalid email."),
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    message: Yup.string().required("Message is required."),
    mobileNumber: Yup.string().required("Mobile number is required."),
})
const ContactUS = () => {
    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        validationSchema: validationObject,
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            message: "",
            mobileNumber: ""
        } as Yup.InferType<typeof validationObject>,
        onSubmit: async (submitValues) => {
            try {
                await createFeedBackApi(submitValues)
                toast.success("Feed back submit.")
                resetForm()
            } catch (error: any) {
                const err = handleApiError(error)
                toast.error(err)
            }
        }
    })
    return (
        <>
            <form onSubmit={handleSubmit} className="flex justify-center items-center w-screen h-screen bg-white pt-20">
                <div className="container mx-auto my-4 px-4 lg:px-20">

                    <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            {/* <h1 className="font-bold uppercase text-5xl">Send us a <br /> message</h1> */}
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <div>
                                <input
                                    value={values.firstName}
                                    onChange={handleChange}
                                    name='firstName'
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="First Name*"
                                />
                                {
                                    errors.firstName ? <ErrorBox text={errors.firstName} /> : null
                                }
                            </div>
                            <div>
                                <input
                                    value={values.lastName}
                                    onChange={handleChange}
                                    name='lastName'
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Last Name*" />
                                {
                                    errors.lastName ? <ErrorBox text={errors.lastName} /> : null
                                }
                            </div>
                            <div>
                                <input
                                    value={values.email}
                                    onChange={handleChange}
                                    name='email'
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="email" placeholder="Email*" />
                                {
                                    errors.email ? <ErrorBox text={errors.email} /> : null
                                }
                            </div>
                            <div>
                                <input
                                    value={values.mobileNumber}
                                    onChange={handleChange}
                                    name='mobileNumber'
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="number" placeholder="Phone*" />
                                {
                                    errors.mobileNumber ? <ErrorBox text={errors.mobileNumber} /> : null
                                }
                            </div>
                        </div>
                        <div className="my-4">
                            <textarea
                                value={values.message}
                                onChange={handleChange}
                                name='message'
                                placeholder="Message*" className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                            {
                                errors.message ? <ErrorBox text={errors.message} /> : null
                            }
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button type='submit' className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline">
                                Send Message
                            </button>
                        </div>
                    </div>

                    <div
                        className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
                            <p className="text-gray-400">We are a software company dedicated to delivering innovative solutions that empower businesses. Our expertise spans custom software development, application modernization, and technology consulting. 
                            </p>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Main Office</h2>
                                    <p className="text-gray-400">7000 Chnanb Chock, Near GCUF, Faisalabad</p>
                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Call Us</h2>
                                    <p className="text-gray-400">Tel: +92-341-0411465</p>
                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <a href="https://www.facebook.com/ENLIGHTENEERING/" target="_blank" rel="noreferrer" className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                                    <i className="fab fa-facebook-f text-blue-900" />
                                </a>
                                <a href="https://www.linkedin.com/company/enlighteneering-inc-" target="_blank" rel="noreferrer" className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                                    <i className="fab fa-linkedin-in text-blue-900" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Buy me a pizza" href="https://www.buymeacoffee.com/Dekartmc" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://img.icons8.com/emoji/48/000000/pizza-emoji.png" />
                    </a>
                </div>
            </div>

        </>
    )
}

export default ContactUS