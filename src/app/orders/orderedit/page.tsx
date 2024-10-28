import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Orderedit from '@/components/orders/orderedit';
import Neworder from '@/components/orders/neworder';

import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
          <Orderedit/>
        </DefaultLayout>
      );
}

export default page