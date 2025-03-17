import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import Jobs_table from "@/components/Jobs/Jobs_table"
const page = () => {
  return (
    <DefaultLayout>
        <Jobs_table />
    </DefaultLayout>
  )
}

export default page
