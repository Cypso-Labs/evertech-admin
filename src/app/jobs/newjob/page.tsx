import NewJob from '@/components/Jobs/newJob'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import { DefaultContext } from 'react-icons/lib'

const page = () => {
  return (
  <DefaultLayout>
    <NewJob/>
  </DefaultLayout>
  )
}

export default page
