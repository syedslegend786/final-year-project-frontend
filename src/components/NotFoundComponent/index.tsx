import Logo from '@/layout/Home/Logo'
import React from 'react'

const NotFoundComponent = () => {
  return (
    <div className='my-10 space-y-4'>
      <Logo className='mx-auto w-56 h-56'/>
      <h1 className='font-bold text-4xl text-center'>Opps! Nothing found.</h1>
    </div>
  )
}

export default NotFoundComponent