import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'

import DefaultusersLayout from '../layout/DefaultusersLayout'
function UserHistory () {
  return (
    <div>
      <DefaultusersLayout>
        <Breadcrumb pageName='History' />

        <div className='flex flex-col gap-10'></div>
      </DefaultusersLayout>
    </div>
  )
}

export default UserHistory
