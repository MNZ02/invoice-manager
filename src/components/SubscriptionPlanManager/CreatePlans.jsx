import React from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import DefaultLayout from '../../layout/DefaultLayout'

const CreatePlans = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    console.log('formData: ', data)
    try {
      const response = await api.post('/api/plans', data)
      console.log('response: ', response)
      if (response) {
        navigate('/admin/plans')
      }
    } catch (error) {
      console.error('Error creating data: ', error)
    }
  }

  return (
    <DefaultLayout>
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
              Create Plan
            </Typography>
            <IconButton
              onClick={() => navigate('/admin/plans')}
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
                  {...register('name', { required: true })}
                  label='Plan Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? 'Plan name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('description', { required: true })}
                  label='Description'
                  variant='outlined'
                  fullWidth
                  error={!!errors.description}
                  helperText={
                    errors.description ? 'Description is required' : ''
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('price', { required: true })}
                  label='Price'
                  variant='outlined'
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price ? 'Price is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('validity', { required: true })}
                  label='Validity'
                  variant='outlined'
                  fullWidth
                  error={!!errors.validity}
                  helperText={errors.validity ? 'Validity is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='frequency-label'>Frequency</InputLabel>
                  <Controller
                    name='frequency'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Frequency is required' }}
                    render={({ field }) => (
                      <Select
                        labelId='frequency-label'
                        label='Frequency'
                        {...field}
                        error={!!errors.frequency}
                      >
                        <MenuItem value='monthly'>Monthly</MenuItem>
                        <MenuItem value='quarterly'>Quarterly</MenuItem>
                        <MenuItem value='annually'>Annually</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.frequency && (
                    <Typography color='error'>
                      {errors.frequency.message}
                    </Typography>
                  )}
                </FormControl>
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
    </DefaultLayout>
  )
}

export default CreatePlans
