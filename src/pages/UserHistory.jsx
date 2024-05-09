import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import History from '../components/UserHistory/History'
import DefaultusersLayout from '../layout/DefaultusersLayout'
function UserHistory () {
  return (
    <div>
      <DefaultusersLayout>
        <Breadcrumb pageName='History' />

        <div className='flex flex-col gap-10'>
          <History />
        </div>
      </DefaultusersLayout>
    </div>
  )
}

export default UserHistory
