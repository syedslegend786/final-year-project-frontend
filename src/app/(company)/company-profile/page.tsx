'use client'
import Input from '@/components/Input'
import Select, { OptionType } from '@/components/Select'
import { useAuth } from '@/context/authContext'
import { TCitiesData, citiesData } from '@/data/cities'
import ProfileForm from '@/layout/company-profile/ProfileForm'
import DashBoard from '@/templates/DashBoard'
import Image from 'next/image'
import React from 'react'
import { SingleValue } from 'react-select'

const CompanyProfile = () => {
    const { user } = useAuth()
console.log(user)
    const obj = {
        city: user?.city,
        email: user?.email,
        lat: user?.lat,
        long: user?.long,
        mobile_number: user?.mobile_number,
        username: user?.username,
    }
    return (
        <DashBoard className='min-h-screen overflow-auto'>
            {
                obj &&
                <ProfileForm data={obj} />
            }
        </DashBoard>
    )
}

export default CompanyProfile