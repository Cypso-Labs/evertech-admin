import Customers from '@/components/customers/customers';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
          <Customers/>
        </DefaultLayout>
      );
}

export default page