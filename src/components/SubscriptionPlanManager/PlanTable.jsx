import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  TextField
} from '@mui/material'
import { Edit, Delete, Add, Save } from '@mui/icons-material'
import api from '../../api/api'

const PlanTable = ({ plans, fetchData }) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(null)
  const [editedFields, setEditedFields] = useState({})

  const handleChange = (e, index) => {
    const { name, value } = e.target
    setEditedFields(prevFields => ({
      ...prevFields,
      [index]: {
        ...prevFields[index],
        [name]: value
      }
    }))
  }

  const handleEdit = index => {
    setEditMode(index)
    setEditedFields({ ...editedFields, [index]: { ...plans[index] } })
  }

  const handleSave = async (plan, index) => {
    try {
      const planId = plan._id
      const response = await api.put(
        `/api/plans/${planId}`,
        editedFields[index]
      )
      console.log('Data saved: ', response.data)
      setEditMode(null)
      setEditedFields({})
      fetchData()
    } catch (error) {
      console.error('Error saving data: ', error)
    }
  }

  const handleDelete = async plan => {
    try {
      const planId = plan._id
      await api.delete(`/api/plans/${planId}`)
      console.log('Plan deleted:', plan)
      fetchData()
      // Refresh the plans list here if needed
    } catch (error) {
      console.error('Error deleting plan: ', error)
    }
  }

  const handleCreate = () => {
    navigate('/admin/plans/create')
    console.log('Create new plan')
  }

  useEffect(() => {
    console.log(plans)
  }, [plans])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          sx={{ width: 120 }}
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price (INR)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='text'
                      name='name'
                      value={editedFields[index]?.name || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    plan.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='text'
                      name='description'
                      value={editedFields[index]?.description || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    plan.description
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='price'
                      value={editedFields[index]?.price || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    plan.price.toFixed(2)
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <IconButton
                      aria-label='save'
                      onClick={() => handleSave(plan, index)}
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        aria-label='edit'
                        onClick={() => handleEdit(index)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDelete(plan)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PlanTable
