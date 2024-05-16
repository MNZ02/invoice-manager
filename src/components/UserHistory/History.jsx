import React, { useEffect, useState } from 'react'
import InvoiceTable from './InvoiceTable'
import api from '../../api/api'

function History () {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
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
    fetchData()
  }, [])

  return (
    <div>
      <h1>Invoice</h1>
      {invoices.map((invoice, index) => (
        <div key={index}>
          <InvoiceTable invoice={invoice} />
        </div>
      ))}
    </div>
  )
}

export default History
