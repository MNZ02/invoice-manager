import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import PaymentHistory from '../components/PaymentHistory'
import DefaultusersLayout from '../layout/DefaultusersLayout'
function UserHistory () {
  return (
    <div>
      <DefaultusersLayout>
        <Breadcrumb pageName='History' />

        <div className='flex flex-col gap-10'>
          <PaymentHistory />
        </div>
      </DefaultusersLayout>
    </div>
  )
}

export default UserHistory
