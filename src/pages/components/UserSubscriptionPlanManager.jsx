import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material'
import api from '../../api/api'
import PaymentContext from '../../context/PaymentContext'
import { getUserIdFromToken } from '../../api/userIdFromToken'

function UserSubscriptionPlanManager () {
  const userId = getUserIdFromToken()
  const [plans, setPlans] = useState([])
  const [subscription, setSubscription] = useState(null)
  const [userSelectedPlan, setUserSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [frequency, setFrequency] = useState('monthly') // Default frequency
  const { checkoutHandler } = useContext(PaymentContext)

  const fetchData = async () => {
    try {
      const response = await api.get('/api/plans')
      setPlans(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  const fetchPlan = async () => {
    try {
      const response = await api.get(`/api/users/${userId}`)
      setUserSelectedPlan(response.data.selectedPlan)
    } catch (error) {
      console.error('Error fetching user plan: ', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubscription = async () => {
    try {
      const response = await api.get(`/api/subscriptions/${userId}`)
      setSubscription(response.data)
    } catch (error) {
      console.error('Error fetching subscription', error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchPlan()
    fetchSubscription()
  }, [])

  const handleFrequencyChange = (event, newFrequency) => {
    if (newFrequency !== null) {
      setFrequency(newFrequency)
    }
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

  // Filter plans by selected frequency
  const filteredPlans = plans.filter(plan => plan.frequency === frequency)

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

        <ToggleButtonGroup
          value={frequency}
          exclusive
          onChange={handleFrequencyChange}
          sx={{ mb: 4 }}
        >
          <ToggleButton value='quarterly'>Quarterly</ToggleButton>
          <ToggleButton value='monthly'>Monthly</ToggleButton>
          <ToggleButton value='annually'>Annually</ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={4}>
          {filteredPlans.map(plan => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
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
                    subscription?.isActive &&
                    subscription?.plan?._id === plan._id
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
                    ></Box>
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
                  <Typography
                    variant='h5'
                    sx={{ color: '#00153B', fontWeight: 'semi-bold', mb: 2 }}
                  >
                    {plan.validity} days
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                </Box>
                <Box sx={{ mt: 'auto', p: 3 }}>
                  <Button
                    fullWidth
                    variant='contained'
                    sx={{
                      backgroundColor:
                        subscription?.isActive &&
                        subscription?.plan?._id === plan._id
                          ? '#FFFFFF'
                          : '#006EF5',
                      color:
                        subscription?.isActive &&
                        subscription?.plan?._id === plan._id
                          ? '#006EF5'
                          : '#FFFFFF',
                      '&:hover': {
                        backgroundColor:
                          subscription?.isActive &&
                          subscription?.plan?._id === plan._id
                            ? '#FFFFFF'
                            : '#0056C2',
                        cursor:
                          subscription?.isActive &&
                          subscription?.plan?._id === plan._id
                            ? 'default'
                            : 'pointer'
                      },
                      pointerEvents:
                        subscription?.plan?._id === plan._id ? 'none' : 'auto'
                    }}
                    onClick={() => checkoutHandler(plan.price, plan)}
                  >
                    {subscription?.isActive &&
                    subscription?.plan?._id === plan._id
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
