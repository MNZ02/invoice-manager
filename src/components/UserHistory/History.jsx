import React, { useEffect, useState } from 'react'
import InvoiceTable from './InvoiceTable'
import api from '../../api/api'

function History () {
  const schema = [
    {
      user: 'aaaazzaaabzzaac',
      items: [
        {
          name: 'Item x1',
          quantity: 12,
          price: 10,
          _id: '6644e313929afbfde31b7f7f'
        },
        {
          name: 'Item x2',
          quantity: 11,
          price: 20,
          _id: '6644e313929afbfde31b7f80'
        },
        {
          name: 'Item x3',
          quantity: 11,
          price: 20,
          _id: '6644e313929afbfde31b7f81'
        }
      ],
      totalAmount: 40,
      additionalNotes: 'Optional additional notes',
      invoiceNumber: 'INV0aa0aaaa11aaa1',
      invoiceDate: '2024-04-30T00:00:00.000Z',
      clientName: 'Client Name',
      clientAddress: 'Client Address',
      _id: '6644e313929afbfde31b7f7e',
      __v: 0
    },
    {
      user: 'abcv',
      items: [
        {
          name: 'Item x1',
          quantity: 12,
          price: 10,
          _id: '6644e313929afbfde31b7f7f'
        },
        {
          name: 'Item x2',
          quantity: 11,
          price: 20,
          _id: '6644e313929afbfde31b7f80'
        },
        {
          name: 'Item x3',
          quantity: 11,
          price: 20,
          _id: '6644e313929afbfde31b7f81'
        }
      ],
      totalAmount: 40,
      additionalNotes: 'Optional additional notes',
      invoiceNumber: 'INV0aa0aaaa11aaa1',
      invoiceDate: '2024-04-30T00:00:00.000Z',
      clientName: 'Client Name',
      clientAddress: 'Client Address',
      _id: '6644e313929afbfde31b7f7e',
      __v: 0
    }
  ]
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
