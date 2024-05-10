import React from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import App from '../components/App'
import DefaultusersLayout from '../layout/DefaultusersLayout'
function CreateInvoice () {
  return (
    <div>
      <DefaultusersLayout>
        <Breadcrumb pageName='Create Invoice' />
        <App />
        <div className='flex flex-col gap-10'></div>
      </DefaultusersLayout>
    </div>
  )
}

export default CreateInvoice
