import React, { useState } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Container,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material'
import 'tailwindcss/tailwind.css'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs'

//custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3C50E0' // Replace this with your desired primary color
    },
    secondary: {
      main: '#f50057' // Optional: Replace this with your desired secondary color
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#3C50E0' // Change this to your desired label color
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#3C50E0' // Change this to your desired outline color
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#1D4ED8',
            '&:hover': {
              backgroundColor: '#1A3DBD'
            }
          }
        }
      }
    }
  }
})

const steps = ['Business Info', 'Bank Details', 'Address & GST']

const Step1 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <TextField
        label='Business Name'
        {...register('businessName', { required: 'Business name is required' })}
        error={!!errors.businessName}
        helperText={errors.businessName?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Email'
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Contact Number'
        {...register('contact', {
          required: 'Contact number is required',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Invalid contact number'
          }
        })}
        error={!!errors.contact}
        helperText={errors.contact?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Password'
        type='password'
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        margin='normal'
      />
    </>
  )
}

const Step2 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <TextField
        label='Bank Name'
        {...register('bankName', {
          pattern: { value: /^[a-zA-Z\s]*$/, message: 'Invalid Bank name' }
        })}
        error={!!errors.bankName}
        helperText={errors.bankName?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Bank Account Number'
        {...register('bankAccountNumber', {
          pattern: { value: /^[0-9]*$/, message: 'Invalid Bank account number' }
        })}
        error={!!errors.bankAccountNumber}
        helperText={errors.bankAccountNumber?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='IFSC Code'
        {...register('ifscCode', {
          pattern: {
            value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
            message: 'Invalid IFSC code'
          }
        })}
        error={!!errors.ifscCode}
        helperText={errors.ifscCode?.message}
        fullWidth
        margin='normal'
      />
    </>
  )
}

const Step3 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <TextField
        label='GST Number'
        {...register('gst', {
          pattern: {
            value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9]{1}$/,
            message: 'Invalid GST number'
          }
        })}
        error={!!errors.gst}
        helperText={errors.gst?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Address'
        {...register('address', {
          pattern: { value: /^[a-zA-Z0-9\s]*$/, message: 'Invalid Address' }
        })}
        error={!!errors.address}
        helperText={errors.address?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Account Holder Name'
        {...register('accountHolderName', {
          pattern: {
            value: /^[a-zA-Z\s]*$/,
            message: 'Invalid Account Holder Name'
          }
        })}
        error={!!errors.accountHolderName}
        helperText={errors.accountHolderName?.message}
        fullWidth
        margin='normal'
      />
    </div>
  )
}

const getStepContent = step => {
  switch (step) {
    case 0:
      return <Step1 />
    case 1:
      return <Step2 />
    case 2:
      return <Step3 />
    default:
      return 'Unknown step'
  }
}

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0)
  const methods = useForm()
  const { handleSubmit } = methods

  const handleNext = data => {
    if (activeStep === steps.length - 1) {
      // Submit final data
      console.log(data)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='xl:flex xl:justify-center'>
        <div className='xl:w-3/4 mx-4 my-2 px-4 py-2'>
          <Breadcrumb pageName='Sign Up' />

          <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='flex flex-wrap items-center'>
              <div className='hidden w-full xl:block xl:w-1/2'>
                <div className='py-17.5 px-26 text-center'>
                  <h1 className=' text-3xl text-center mx-2 my-2 font-bold  px-2 py-1'>
                    Invoice Manager
                  </h1>

                  <p className='2xl:px-20'>Create invoices with ease</p>
                </div>
              </div>

              <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
                <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
                  <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                    Sign Up
                  </h2>
                  <Container component='main' maxWidth='md'>
                    <Stepper activeStep={activeStep} sx={{ py: 5 }}>
                      {steps.map(label => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(handleNext)}>
                        {getStepContent(activeStep)}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3
                          }}
                        >
                          {activeStep !== 0 && (
                            <Button
                              sx={{
                                padding: '10px 20px',
                                backgroundColor: '#3C50E0',
                                color: 'white',
                                '&:hover': { backgroundColor: '#1E40AF' }
                              }}
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                          )}
                          <Button
                            sx={{
                              padding: '10px 20px',
                              backgroundColor: '#3C50E0',
                              color: 'white',
                              '&:hover': { backgroundColor: '#1E40AF' }
                            }}
                            type='submit'
                          >
                            {activeStep === steps.length - 1
                              ? 'Finish'
                              : 'Next'}
                          </Button>
                        </Box>
                      </form>
                      <div className='mt-6 text-center'>
                        <p>
                          Already have an account?{' '}
                          <Link to='/auth/signin' className='text-primary'>
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </FormProvider>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default SignUp
