import React, { useEffect, useState, useCallback } from 'react'
import { TablePagination } from '@mui/material'
import InvoiceTable from './InvoiceTable'
import api from '../../api/api'
import { ClipLoader } from 'react-spinners'
import { getUserIdFromToken } from '../../api/userIdFromToken'

function History () {
  const userId = getUserIdFromToken()

  const [invoices, setInvoices] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get(`/api/invoices/${userId}`)
      setInvoices(response.data)
    } catch (err) {
      setError('Error fetching data')
      console.error('Error fetching data: ', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
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
