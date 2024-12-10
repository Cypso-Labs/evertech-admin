import Technician from '@/components/Technicians/Technician';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
         <Technician/>
        </DefaultLayout>
      );
}

export default page