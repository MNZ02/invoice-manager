import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField
} from '@mui/material'
import { styled } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../../../api/api'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

const UserTable = ({ data }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedFields, setEditedFields] = useState({ ...data })

  const navigate = useNavigate()

  const handleCreate = () => {
    navigate('/admin/users/tables/create')
  }

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleFieldChange = (field, value) => {
    setEditedFields({
      ...editedFields,
      [field]: value
    })
  }

  const handleSave = async () => {
    try {
      const userId = data._id
      const response = await api.put(`/api/users/${userId}`, editedFields)
      console.log('Data saved: ', response.data)
    } catch (error) {
      console.error('Error saving data: ', error)
    }
    // Set edit mode to false to exit editing mode
    setEditMode(false)
  }

  const handleDelete = async () => {
    const userId = data._id
    try {
      const response = await api.delete(`/api/users/${userId}`)
      console.log('Data deleted: ', response.data)
    } catch (error) {
      console.error('Error deleting data: ', error)
    }
  }

  return (
    <>
      <div
        style={{ marginBottom: '16px', display: 'flex', justifyContent: 'end' }}
      >
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Create
        </Button>
        <Button
          variant='contained'
          color='primary'
          startIcon={<EditIcon />}
          onClick={handleEdit}
          style={{ marginLeft: '8px' }}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
        {editMode && (
          <Button
            variant='contained'
            color='primary'
            startIcon={<EditIcon />}
            onClick={handleSave}
            style={{ marginLeft: '8px' }}
          >
            Save
          </Button>
        )}
        <Button
          variant='contained'
          color='secondary'
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          style={{ marginLeft: '8px' }}
        >
          Delete
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Field Name</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([fieldName, value], index) => (
              <TableRow key={index}>
                <StyledTableCell>{fieldName}</StyledTableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      value={editedFields[fieldName]}
                      onChange={e =>
                        handleFieldChange(fieldName, e.target.value)
                      }
                    />
                  ) : (
                    value
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

export default UserTable
