import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ChartOne from '../components/Charts/ChartOne'
import ChartThree from '../components/Charts/ChartThree'
import ChartTwo from '../components/Charts/ChartTwo'

const Chart = () => {
  return (
    <div>
      <Breadcrumbs pageName='Chart' />

      <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </div>
  )
}

export default Chart
