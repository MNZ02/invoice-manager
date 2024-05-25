import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import PaymentSuccess from '../components/PaymentSuccess'
import DefaultusersLayout from '../layout/DefaultusersLayout'

function PaymentsSuccessPage () {
  return (
    <div>
      <DefaultusersLayout>
        <Breadcrumb pageName='Payment' />

        <div className='flex flex-col gap-10'>
          <PaymentSuccess />
        </div>
      </DefaultusersLayout>
    </div>
  )
}

export default PaymentsSuccessPage
