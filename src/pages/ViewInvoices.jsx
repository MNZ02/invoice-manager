import React from 'react'
import ViewInvoice from '../components/ViewInvoice/ViewInvoice'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import DefaultusersLayout from '../layout/DefaultusersLayout'

function ViewInvoices () {
  return (
    <DefaultusersLayout>
      <div>
        <Breadcrumb pageName='View Invoice' />

        <ViewInvoice />
      </div>
    </DefaultusersLayout>
  )
}

export default ViewInvoices
