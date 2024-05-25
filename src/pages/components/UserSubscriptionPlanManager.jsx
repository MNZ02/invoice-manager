import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Typography, Paper, Grid, Divider } from '@mui/material'
import api from '../../api/api'
import PaymentContext from '../../context/PaymentContext'

function UserSubscriptionPlanManager () {
  const [plans, setPlans] = useState([])
  const { checkoutHandler, selectedPlan } = useContext(PaymentContext)

  const fetchData = async () => {
    try {
      const response = await api.get('/api/plans')
      setPlans(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    console.log('selectedPlan:', selectedPlan)
  }, [selectedPlan])

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
      <Box
        sx={{
          width: '100%',
          maxWidth: '1000px',
          textAlign: 'center',
          height: 'auto',
          paddingBottom: '50px'
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{ color: '#00153B', fontWeight: 'bold' }}
        >
          Your Subscription
        </Typography>

        <Typography variant='body1' sx={{ color: '#717F87', mb: 3 }}>
          Choose the plan that suits you best and enjoy our premium services.
        </Typography>

        <Grid container spacing={4}>
          {plans.map(plan => (
            <Grid item xs={12} sm={6} md={4} key={plan.name}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '350px',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                  },
                  border:
                    selectedPlan?.name === plan.name
                      ? '2px solid #006EF5'
                      : 'none'
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#F6F6F7',
                        borderRadius: 10,
                        px: 1.5,
                        py: 0.5
                      }}
                    >
                      <Typography
                        variant='caption'
                        sx={{ color: '#00153B', fontWeight: 'bold' }}
                      >
                        {plan.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant='h6'
                    sx={{ color: '#00153B', fontWeight: 'bold' }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography
                    variant='h3'
                    sx={{ color: '#00153B', fontWeight: 'bold', mb: 2 }}
                  >
                    Rs. {plan.price}
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#717F87', mb: 2 }}>
                    {plan.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {plan.features &&
                    plan.features.map((feature, index) => (
                      <Typography
                        key={index}
                        variant='body2'
                        sx={{ color: '#717F87' }}
                      >
                        {feature}
                      </Typography>
                    ))}
                </Box>
                <Box sx={{ mt: 'auto', p: 3 }}>
                  <Button
                    fullWidth
                    variant='contained'
                    sx={{
                      backgroundColor: '#006EF5',
                      '&:hover': {
                        backgroundColor: '#0056C2'
                      }
                    }}
                    onClick={() => checkoutHandler(plan.price, plan)}
                  >
                    {selectedPlan?.name === plan.name
                      ? 'Selected'
                      : 'Select Plan'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default UserSubscriptionPlanManager
