import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import SubscriptionPlanManager from '../components/SubscriptionPlanManager/SubscriptionPlanManager'
import DefaultLayout from '../layout/DefaultLayout'

function Plans () {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName='Plans' />

        <div className='flex flex-col gap-10'>
          <SubscriptionPlanManager />
        </div>
      </DefaultLayout>
    </div>
  )
}

export default Plans
