import React from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import Invoice from '../components/App'
import DefaultusersLayout from '../layout/DefaultusersLayout'
import StateContext from '../context/stateContext'
function CreateInvoice () {
  return (
    <StateContext>
      <div>
        <DefaultusersLayout>
          <Breadcrumb pageName='Create Invoice' />
          <Invoice />
          <div className='flex flex-col gap-10'></div>
        </DefaultusersLayout>
      </div>
    </StateContext>
  )
}

export default CreateInvoice
