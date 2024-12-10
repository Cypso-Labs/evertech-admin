import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Orders from '@/components/orders/orders';
import React from 'react'
import Products from '@/components/products/products';

const page = () => {
    return (
        <DefaultLayout>
          <Products />
        </DefaultLayout>
      );
}

export default page