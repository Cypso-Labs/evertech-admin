import Editcustomer from '@/components/customers/editcustomer';
import Custnew from '@/components/customers/newcustomer';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'

const page = () => {
    return (
        <DefaultLayout>
         <Editcustomer/>
        </DefaultLayout>
      );
}
export default page