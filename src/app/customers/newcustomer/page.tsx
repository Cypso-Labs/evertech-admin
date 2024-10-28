import Newcustomer from '@/components/customers/newcustomer';
import Custnew from '@/components/customers/newcustomer';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
         <Newcustomer/>
        </DefaultLayout>
      );
}

export default page