import React, { useState, useMemo, useEffect } from 'react'
import './index.css'
import editSvg from '../../../images/user-table-buttons/edit.svg'
import deleteSvg from '../../../images/user-table-buttons/delete.svg'
import penSvg from '../../../images/invoice/pen.svg'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table'
import { makeData } from './makeData'
import api from '../../../api/api'

function TableTwo () {
  const [data, setData] = React.useState([])
  const [editRowId, setEditRowId] = useState(null)

  const rerender = React.useReducer(() => ({}), {})[1]

  useEffect(() => {
    async function fetchUsers () {
      try {
        const response = await api.get('/api/users')
        const data = response.data.map(user => ({
          id: user._id,
          businessName: user.businessName,
          email: user.email,
          contact: user.contact,
          bankName: user.bankName,
          bankAccountNumber: user.bankAccountNumber,
          ifscCode: user.ifscCode,
          gst: user.gst,
          address: user.address,
          bankAccountHolderName: user.bankAccountHolderName,
          role: user.role
        }))
        setData(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching users: ', error.message)
      }
    }

    fetchUsers()
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'businessName',
        header: () => 'Business Name',
        cell: info => info.getValue(),
        footer: props => props.column.id
      },
      {
        accessorKey: 'email',
        header: () => 'email',
        footer: props => props.column.id
      },

      {
        accessorKey: 'contact',
        header: () => <span>Contact</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'bankName',
        header: () => <span>Bank Name</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'bankAccountNumber',
        header: () => <span>Account Number</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'ifscCode',
        header: () => <span>IFSC code</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'gst',
        header: () => <span>GST</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'address',
        header: () => <span>Address</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'bankAccountHolderName',
        header: () => <span>Account Holder Name</span>,
        footer: props => props.column.id
      },
      {
        accessorKey: 'role',
        header: () => <span>Role</span>,
        footer: props => props.column.id
      }
    ],
    []
  )

  const refreshData = () => setData(() => makeData(100000))

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  })

  const handleAddUser = async () => {
    const newUser = {
      businessName: 'New Business',
      email: 'email@email.com',
      contact: '1234567890',
      bankName: 'Bank Name',
      bankAccountNumber: '123456789',
      ifscCode: 'IFSC123456',
      gst: 'GST123456',
      address: 'Address',
      bankAccountHolderName: 'Account Holder',
      role: 'user'
    }
    try {
      const response = await api.post('/api/users', newUser)
      setData(prevData => [...prevData, newUser])
      console.log('Added data', newUser)
    } catch (error) {
      console.error('Error adding user', error)
    }
  }
  const handleEdit = row => {
    setEditRowId(row.id)
  }

  const handleSave = async row => {
    if (!row || !row.original) {
      console.error('Row not found')
      return
    }

    const updatedRow = data.find(item => item.id === row.original.id)
    if (!updatedRow) {
      console.error('Row not found in data')
      return
    }

    const response = await api.put(`/api/users/${updatedRow.id}`, updatedRow)

    setData(prevData =>
      prevData.map(item => {
        if (item.id === updatedRow.id) {
          return response.data // Update with server response
        }
        return item
      })
    )
    setEditRowId(null)
    console.log('Edited data', editRowId)
  }

  const handleChange = (e, row) => {
    const { name, value } = e.target
    const updatedData = data.map(item => {
      if (item === row.original) {
        return { ...item, [name]: value }
      }
      return item
    })
    setData(updatedData)
  }

  const handleDelete = async row => {
    setData(prevData => prevData.filter(data => data.id !== row.original.id))
    try {
      const response = await api.delete(`/api/users/${row.original.id}`)
    } catch (error) {
      console.error('Error deleting invoice', error)
    }
  }

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default my-4'>
      <h1 className='font-bold text-xl my-2 px-2'>User Table</h1>
      <div className='flex justify-end'>
        <button
          onClick={handleAddUser}
          className='bg-blue-500 text-white px-2 py-2 rounded-md shadow-md flex items-center gap-2'
        >
          Create new
          <span>
            <img className='w-3' src={penSvg} alt='pen' />
          </span>
        </button>
      </div>
      <div className='p-2 block max-w-full overflow-y-hidden'>
        <div className='h-2' />
        <table className='w-full '>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  )
                })}
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className='border p-2 rounded'>
                        {editRowId === row.id ? (
                          <input
                            type='text'
                            name={cell.column.id}
                            value={row.original[cell.column.id]}
                            onChange={e => handleChange(e, row)}
                          />
                        ) : (
                          <div>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        )}
                      </td>
                    )
                  })}
                  <td>
                    {editRowId === row.id ? (
                      <div>
                        <button onClick={() => handleSave(row)}>Save</button>
                      </div>
                    ) : (
                      <div className='flex space-x-4'>
                        <img
                          onClick={() => handleEdit(row)}
                          className='w-5 cursor-pointer'
                          src={editSvg}
                          alt='edit'
                        />
                        <img
                          onClick={() => handleDelete(row)}
                          className='w-5 cursor-pointer'
                          src={deleteSvg}
                          alt='delete'
                        />
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='h-2' />
        <div className='flex items-center gap-2'>
          <button
            className='border rounded p-1'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className='border rounded p-1'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className='border rounded p-1'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className='border rounded p-1'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className='flex items-center gap-1'>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className='flex items-center gap-1'>
            | Go to page:
            <input
              type='number'
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className='border p-1 rounded w-16'
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>{table.getRowModel().rows.length} Rows</div>
      </div>

      {/* <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre> */}
    </div>
  )
}

export default TableTwo
