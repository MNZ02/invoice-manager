import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import TableOne from '../components/Tables/TableOne'
import TableTwo from '../components/Tables/TableTwo/TableTwo'
import DefaultLayout from '../layout/DefaultLayout'

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Tables' />

      <div className='flex flex-col gap-10'>
        <TableOne />
        <TableTwo />
      </div>
    </DefaultLayout>
  )
}

export default Tables
