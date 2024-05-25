import React from 'react'
import { TextField, Typography, Box, Button } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
function PaymentSuccess () {
  const searchQuery = useSearchParams()[0]

  const referenceNumber = searchQuery.get('reference')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Typography variant='h4' gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant='h6' gutterBottom>
        Reference ID: {referenceNumber}
      </Typography>
      <Link to='/users/dashboard'>
        <Button variant='contained' color='success'>
          Go to Dashboard
        </Button>
      </Link>
    </Box>
  )
}

export default PaymentSuccess
