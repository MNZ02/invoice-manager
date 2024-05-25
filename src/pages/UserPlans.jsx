import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import UserSubscriptionPlanManager from './components/UserSubscriptionPlanManager'
import DefaultusersLayout from '../layout/DefaultusersLayout'
function Plans () {
  return (
    <div>
      <DefaultusersLayout>
        <Breadcrumb pageName='Plans' />

        <div className='flex flex-col gap-10'>
          <UserSubscriptionPlanManager />
        </div>
      </DefaultusersLayout>
    </div>
  )
}

export default Plans
