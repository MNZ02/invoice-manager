import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken'

function PaymentHistory () {
  const userId = getUserIdFromToken()
  const [paymentHistory, setPaymentHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get(`/api/users/${userId}/transactions`)
      setPaymentHistory(response.data)
    } catch (error) {
      console.error('Error fetching payment history: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPaymentHistory()
  }, [])

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#F9FAFB'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        pt: 4,
        px: 5,
        bgcolor: '#F9FAFB',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        sx={{ color: '#00153B', fontWeight: 'bold' }}
      >
        Payment History
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              {/* Add more table headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentHistory.map(payment => (
              <TableRow key={payment._id}>
                <TableCell>{payment._id}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                {/* Add more table cells for other payment details */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default PaymentHistory
