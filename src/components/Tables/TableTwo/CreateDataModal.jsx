import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

const CreateDataForm = ({ handleCreate }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    contact: ''
    // Add more fields here
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Pass form data to the parent component's handleCreate function
    handleCreate(formData)
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
    >
      <TextField
        name='businessName'
        label='Business Name'
        value={formData.businessName}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        name='email'
        label='Email'
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        name='contact'
        label='Contact'
        value={formData.contact}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      {/* Add more fields here */}
      <Button type='submit' color='primary' variant='contained'>
        Create
      </Button>
    </Box>
  )
}

export default CreateDataForm
