import React, { Suspense } from 'react'
import EditJob from '@/components/Jobs/EditJob'
import DefaultLayout from '@/components/Layouts/DefaultLaout'

const Page = () => {
  return (
    <DefaultLayout>
      {/* Wrap EditJob with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <EditJob />
      </Suspense>
    </DefaultLayout>
  )
}

export default Page
