import React, { useState } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton
} from '@mui/material'
import { useForm } from 'react-hook-form'
import api from '../../../api/api'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

const CreateDataForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    contact: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    gst: '',
    address: '',
    bankAccountHolderName: '',
    logo: null
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData({
      ...formData,
      logo: file
    })
  }

  const onSubmit = async () => {
    console.log('formData: ', formData)
    try {
      const response = await api.post('/api/users', formData)
      console.log('response: ', response)
      if (response) {
        navigate('/admin/users/tables')
      }
    } catch (error) {
      console.error('Error creating data: ', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          width: '100%',
          maxWidth: '900px',
          borderRadius: '10px'
        }}
      >
        <div className='flex justify-between items-center'>
          <Typography variant='h5' gutterBottom>
            Create User
          </Typography>
          <IconButton
            onClick={() => navigate('/admin/users/tables')}
            aria-label='Close'
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          className='my-2 mx-2 py-2 px-1'
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            '& .MuiTextField-root': { marginBottom: '20px' }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('businessName', { required: true })}
                label='Business Name'
                variant='outlined'
                fullWidth
                error={!!errors.businessName}
                helperText={
                  errors.businessName ? 'Business name is required' : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('email', { required: true })}
                label='Email'
                type='email'
                variant='outlined'
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? 'Email is required' : ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 16
                })}
                label='Password'
                type='password'
                variant='outlined'
                fullWidth
                error={!!errors.password}
                helperText={
                  errors.password
                    ? 'Password is required and must be between 6 and 16 characters'
                    : ''
                }
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('contact', { required: true })}
                label='Contact'
                variant='outlined'
                fullWidth
                error={!!errors.contact}
                helperText={errors.contact ? 'Contact is required' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('bankName', { required: true })}
                label='Bank Name'
                variant='outlined'
                fullWidth
                error={!!errors.bankName}
                helperText={errors.bankName ? 'Bank name is required' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('bankAccountNumber', { required: true })}
                label='Bank Account Number'
                variant='outlined'
                fullWidth
                error={!!errors.bankAccountNumber}
                helperText={
                  errors.bankAccountNumber
                    ? 'Bank account number is required'
                    : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('ifscCode', { required: true })}
                label='IFSC Code'
                variant='outlined'
                fullWidth
                error={!!errors.ifscCode}
                helperText={errors.ifscCode ? 'IFSC code is required' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('gst')}
                label='GST'
                variant='outlined'
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('address', { required: true })}
                label='Address'
                variant='outlined'
                fullWidth
                error={!!errors.address}
                helperText={errors.address ? 'Address is required' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('bankAccountHolderName', { required: true })}
                label='Bank Account Holder Name'
                variant='outlined'
                fullWidth
                error={!!errors.bankAccountHolderName}
                helperText={
                  errors.bankAccountHolderName
                    ? 'Account holder name is required'
                    : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant='body1'
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                gutterBottom
              >
                Logo
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </Typography>
            </Grid>
          </Grid>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            sx={{ alignSelf: 'flex-end', mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default CreateDataForm
