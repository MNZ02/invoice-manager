import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import TableOne from '../components/Tables/TableOne'
import TableTwo from '../components/Tables/TableTwo/TableTwo'
import DefaultLayout from '../layout/DefaultLayout'

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Tables' />

      <TableTwo />
    </DefaultLayout>
  )
}

export default Tables
