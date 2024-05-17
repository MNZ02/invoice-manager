import React, { useEffect, useState } from 'react'
import { TablePagination } from '@mui/material'
import InvoiceTable from './InvoiceTable'
import api from '../../api/api'

function History () {
  const [invoices, setInvoices] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5) // Default rows per page

  const fetchData = async () => {
    try {
      const response = await api.get('/api/invoices')
      const data = response.data
      console.log('response: ', response.data)
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <h1>Invoice</h1>
      {invoices
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((invoice, index) => (
          <div key={index}>
            <InvoiceTable invoice={invoice} fetchData={fetchData} />
          </div>
        ))}
      <TablePagination
        component='div'
        count={invoices.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default History
