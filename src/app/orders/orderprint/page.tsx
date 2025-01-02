import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Orderprint from '@/components/orders/orderprint';
import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
          <Orderprint/>
        </DefaultLayout>
      );
}

export default page