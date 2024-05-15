import React from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import Invoice from '../components/App'
import DefaultusersLayout from '../layout/DefaultusersLayout'
import { State } from '../context/stateContext'
function CreateInvoice () {
  return (
    <State.Provider value={State}>
      <div>
        <DefaultusersLayout>
          <Breadcrumb pageName='Create Invoice' />
          <Invoice />
          <div className='flex flex-col gap-10'></div>
        </DefaultusersLayout>
      </div>
    </State.Provider>
  )
}

export default CreateInvoice
