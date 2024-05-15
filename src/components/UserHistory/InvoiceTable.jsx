import React, { useState } from 'react'
import api from '../../api/api'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  TablePagination
} from '@mui/material'
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const StyledTableContainer = styled(TableContainer)(() => ({
  marginBottom: '20px'
}))

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none'
}))

const InvoiceTable = ({ invoice }) => {
  const {
    user,
    items,
    totalAmount,
    additionalNotes,
    invoiceNumber,
    invoiceDate,
    clientName,
    clientAddress
  } = invoice

  // State to manage editable fields
  const [editMode, setEditMode] = useState(false)
  const [editedFields, setEditedFields] = useState({
    user: user,
    additionalNotes: additionalNotes,
    invoiceNumber: invoiceNumber,
    invoiceDate: invoiceDate,
    clientName: clientName,
    clientAddress: clientAddress,
    items: items.map(item => ({ ...item, isEditing: false })) // Add isEditing flag to each item
  })

  // Pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handler to toggle edit mode
  const handleEdit = () => {
    setEditMode(!editMode)
  }

  // Handler to save edited fields
  const handleSave = async () => {
    // Save edited fields logic here
    setEditMode(false)

    try {
      const invoiceId = invoice._id

      const response = await api.put(`api/invoices/${invoiceId}`, editedFields)
      console.log('Updated data: ', response.data)
    } catch (error) {
      console.error('Error updating data: ', error)
    }
  }

  // Handler to update edited field value
  const handleFieldChange = (field, value) => {
    setEditedFields({ ...editedFields, [field]: value })
  }

  // Handler to update item field value
  const handleItemFieldChange = (index, field, value) => {
    const updatedItems = [...editedFields.items]
    updatedItems[index][field] = value
    setEditedFields({ ...editedFields, items: updatedItems })
  }

  const handleDelete = async () => {
    try {
      const invoiceId = invoice._id
      const response = await api.delete(`api/invoices/${invoiceId}`)
      console.log('Deleted data: ', response.data)
    } catch (error) {
      console.error('Error deleting data: ', error)
    }
  }

  return (
    <>
      <StyledTableContainer component={Paper}>
        <Table aria-label='invoice table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align='right'>Quantity</StyledTableCell>
              <StyledTableCell align='right'>Price</StyledTableCell>
              <StyledTableCell>Additional Notes</StyledTableCell>
              <StyledTableCell>Invoice Number</StyledTableCell>
              <StyledTableCell>Invoice Date</StyledTableCell>
              <StyledTableCell>Client Name</StyledTableCell>
              <StyledTableCell>Client Address</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>
                {editMode ? (
                  <TextField
                    value={editedFields.user}
                    onChange={e => handleFieldChange('user', e.target.value)}
                  />
                ) : (
                  user
                )}
              </StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
              <StyledTableCell>
                {editMode ? (
                  <TextField
                    value={editedFields.additionalNotes}
                    onChange={e =>
                      handleFieldChange('additionalNotes', e.target.value)
                    }
                  />
                ) : (
                  additionalNotes
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode ? (
                  <TextField
                    value={editedFields.invoiceNumber}
                    onChange={e =>
                      handleFieldChange('invoiceNumber', e.target.value)
                    }
                  />
                ) : (
                  invoiceNumber
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode ? (
                  <TextField
                    type='date'
                    value={editedFields.invoiceDate}
                    onChange={e =>
                      handleFieldChange('invoiceDate', e.target.value)
                    }
                  />
                ) : (
                  new Date(invoiceDate).toLocaleDateString()
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode ? (
                  <TextField
                    value={editedFields.clientName}
                    onChange={e =>
                      handleFieldChange('clientName', e.target.value)
                    }
                  />
                ) : (
                  clientName
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode ? (
                  <TextField
                    value={editedFields.clientAddress}
                    onChange={e =>
                      handleFieldChange('clientAddress', e.target.value)
                    }
                  />
                ) : (
                  clientAddress
                )}
              </StyledTableCell>
              <StyledTableCell>
                {editMode ? (
                  <IconButton aria-label='save' onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label='edit' onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton aria-label='delete' onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </TableRow>
            {editedFields.items.map((item, index) => (
              <TableRow key={item._id}>
                <StyledTableCell>
                  {editMode ? (
                    <TextField
                      value={item.name}
                      onChange={e =>
                        handleItemFieldChange(index, 'name', e.target.value)
                      }
                    />
                  ) : (
                    item.name
                  )}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {editMode ? (
                    <TextField
                      type='number'
                      value={item.quantity}
                      onChange={e =>
                        handleItemFieldChange(index, 'quantity', e.target.value)
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {editMode ? (
                    <TextField
                      type='number'
                      value={item.price}
                      onChange={e =>
                        handleItemFieldChange(index, 'price', e.target.value)
                      }
                    />
                  ) : (
                    item.price
                  )}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            ))}
            <TableRow>
              <StyledTableCell colSpan={2}>
                <strong>Total:</strong>
              </StyledTableCell>
              <StyledTableCell align='right' colSpan={2}>
                <strong>{totalAmount}</strong>
              </StyledTableCell>
              <StyledTableCell colSpan={6}></StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  )
}

export default InvoiceTable
