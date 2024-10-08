import React from 'react'
import api from '../api/api'
import { Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Payments () {
  const navigate = useNavigate()
  const amount = 5000

  const checkoutHandler = async () => {
    try {
      // Fetch the Razorpay key from the server
      const keyResponse = await api.get('/api/payment/getKey')
      const key_id = keyResponse.data.key_id
      console.log('key_id:', key_id)
      if (!key_id) {
        console.error('Error: Missing key_id from server response')
        return
      }
      // Create an order on your server
      const {
        data: { order }
      } = await api.post('/api/payment/orders', { amount })

      // Options for Razorpay checkout
      const options = {
        key: key_id,
        amount: order.amount,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Payment for services',
        order_id: order.id,
        handler: async function (response) {
          const verifyResponse = await api.post('/api/payment/verification', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })

          if (verifyResponse.data.status === 'success') {
            navigate(
              `/users/dashboard/payment/success?reference=${verifyResponse.data.payment_id}`
            )
          } else {
            alert('Payment failed')
          }
        },

        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      }

      // Open Razorpay checkout
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        // Handle payment failure
        console.error(response.error)
        alert('Payment failed')
      })
      rzp.open()
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return (
    <div>
      <Card>
        <p>Amount: {amount}</p>
      </Card>
      <button onClick={checkoutHandler}>Submit</button>
    </div>
  )
}

export default Payments
