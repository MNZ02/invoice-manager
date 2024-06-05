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
  TableCell,
  TablePagination
} from '@mui/material'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken'

function PaymentHistory () {
  const userId = getUserIdFromToken()
  const [paymentHistory, setPaymentHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get(`/api/users/${userId}/transactions`)
      console.log(response.data)
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
              <TableCell>Date & Time</TableCell>
              <TableCell>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(payment => (
                <TableRow key={payment._id}>
                  <TableCell>{payment._id}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    {new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.expiryDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={paymentHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default PaymentHistory
