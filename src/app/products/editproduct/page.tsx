import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import EditProduct from '@/components/products/editproduct';

const page = () => {
    return (
        <DefaultLayout>
          <EditProduct />
        </DefaultLayout>
      );
}

export default page