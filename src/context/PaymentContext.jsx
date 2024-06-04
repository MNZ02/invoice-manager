import React, { createContext, useState } from 'react'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken'
import { useNavigate } from 'react-router-dom'
const PaymentContext = createContext()

export function PaymentProvider ({ children }) {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [response, setResponse] = useState(false)
  const navigate = useNavigate()

  const userId = getUserIdFromToken()

  const updatePlan = async planId => {
    const response = await api.put(`/api/users/${userId}`, {
      selectedPlan: planId
    })
  }

  const subscribeUser = async (userId, planId) => {
    try {
      const response = await api.post('/api/subscribe', { userId, planId })
      return response.data
    } catch (error) {
      console.error('Error subscribing user:', error)
      throw error
    }
  }

  const createTransaction = async transactionData => {
    try {
      const response = await api.post('/api/transactions', transactionData)
      console.log('Transaction created', response.data)
    } catch (error) {
      console.error('Error creating transaction', error)
    }
  }

  const resetInvoiceCount = async () => {
    try {
    } catch (error) {
      console.error('Error resetting invoice count', error)
    }
    const response = await api.post(`/api/reset-invoice-count/${userId}`)
  }

  const checkoutHandler = async (amount, plan) => {
    try {
      // Fetch the Razorpay key from the server
      const keyResponse = await api.get('/api/payment/getKey')
      const key_id = keyResponse.data.key_id

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
            await updatePlan(plan._id)
            setSelectedPlan(plan)
            setResponse(true)
            const transactionData = {
              userId: userId,
              planId: plan._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: order.amount,
              currency: 'INR',
              status: 'completed',
              createdAt: new Date()
            }
            await createTransaction(transactionData)
            await subscribeUser(userId, plan._id)
            resetInvoiceCount()

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
          color: '#005Cf0'
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
    <PaymentContext.Provider
      value={{ checkoutHandler, selectedPlan, response, updatePlan }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export default PaymentContext
