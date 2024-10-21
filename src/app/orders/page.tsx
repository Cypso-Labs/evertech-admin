import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Orders from '@/components/orders/orders';
import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
          <Orders />
        </DefaultLayout>
      );
}

export default page