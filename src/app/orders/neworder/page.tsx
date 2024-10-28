import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Neworder from '@/components/orders/neworder';

import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
          <Neworder/>
        </DefaultLayout>
      );
}

export default page