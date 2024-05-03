import React from 'react'
import CardDataStats from '../../components/CardDataStats'
import ChartOne from '../../components/Charts/ChartOne'
import ChartThree from '../../components/Charts/ChartThree'
import ChartTwo from '../../components/Charts/ChartTwo'
import TableOne from '../../components/Tables/TableOne'
import eyeSvg from '../../images/card-images/eye.svg'
import cartSvg from '../../images/card-images/cart.svg'
import productSvg from '../../images/card-images/product.svg'
import usersSvg from '../../images/card-images/users.svg'
import DefaultLayout from '../../layout/DefaultLayout'

const ECommerce = () => {
  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardDataStats title='Total views' total='$3.456K' rate='0.43%' levelUp>
          <img className='w-6' src={eyeSvg} alt='eye-icon' />
        </CardDataStats>
        <CardDataStats title='Total Profit' total='$45,2K' rate='4.35%' levelUp>
          <img className='w-6' src={cartSvg} alt='cart-icon' />
        </CardDataStats>
        <CardDataStats title='Total Product' total='2.450' rate='2.59%' levelUp>
          <img className='w-6' src={productSvg} alt='product-icon' />
        </CardDataStats>
        <CardDataStats title='Total Users' total='3.456' rate='0.95%' levelDown>
          <img className='w-6' src={usersSvg} alt='users-icon' />
        </CardDataStats>
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default ECommerce
