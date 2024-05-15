import React, { useState, useMemo, useEffect } from 'react'
import editSvg from '../../images/user-table-buttons/edit.svg'
import deleteSvg from '../../images/user-table-buttons/delete.svg'
import addSvg from '../../images/Plans/add.svg'
import './index.css'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import api from '../../api/api'

function SubscriptionPlanManager () {
  const [editRowId, setEditRowId] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/api/plans')
        const data = response.data.map(plan => ({
          id: plan._id,
          name: plan.name,
          description: plan.description,
          price: plan.price
        }))
        console.log(data)
        setData(data)
      } catch (error) {
        console.error('Error fetching plans: ', error.message)
      }
    }
    fetchPlans()
  }, [])

  const handleEdit = row => {
    setEditRowId(row.id)
    console.log(editRowId)
  }
  const handleSave = async row => {
    try {
      // Check if row and row.original are defined
      if (!row || !row.original) {
        console.error('Invalid row data')
        return
      }

      // Find the row in the data array based on its MongoDB ID
      const updatedRow = data.find(item => item.id === row.original.id)

      // Check if updatedRow is defined
      if (!updatedRow) {
        console.error('Row not found in data')
        return
      }

      // Make a request to update the document in MongoDB
      const response = await api.put(`/api/plans/${updatedRow.id}`, updatedRow)

      // Optionally, you can update the local data with the response data from the server
      // In case the server modifies the data (e.g., adds timestamps)
      setData(prevData =>
        prevData.map(item => {
          if (item.id === updatedRow.id) {
            return response.data // Update with server response
          }
          return item
        })
      )

      // Clear the editRowId state to exit edit mode
      setEditRowId(null)
    } catch (error) {
      console.error('Error updating plan:', error.message)
    }
  }

  const handleChange = (e, row) => {
    const { name, value } = e.target
    const updatedData = data.map(item => {
      if (item.id === row.original.id) {
        return { ...item, [name]: value }
      }
      return item
    })
    setData(updatedData)
  }

  const handleDelete = async row => {
    try {
      setData(prevData => prevData.filter(data => data.id !== row.original.id))
      const response = await api.delete(`/api/plans/${row.original.id}`)
      console.log('Response: ', response.data)
    } catch (error) {
      console.error('Error deleting plan: ', error.message)
    }
  }

  const handleAddPlan = async () => {
    try {
      const newPlan = {
        name: 'Enter New plan',
        description: 'Enter Description of new plan',
        price: '0.00'
      }
      setData(prevData => [...prevData, newPlan])
      const response = await api.post('/api/plans', newPlan)
      console.log('Response: ', response.data)
    } catch (error) {
      console.error('Error adding plan: ', error.message)
    }
  }

  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: () => 'Name',
        cell: info => info.getValue(),
        footer: props => props.column.id
      },
      {
        accessorKey: 'description',
        header: () => 'Description',
        footer: props => props.column.id
      },
      {
        accessorKey: 'price',
        header: () => <span>Price</span>,
        footer: props => props.column.id
      }
    ],
    []
  )

  const refreshData = () => setData(() => makeData(1))

  return (
    <>
      <MyTable
        data={data}
        columns={columns}
        editRowId={editRowId}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleAddPlan={handleAddPlan}
      />
      <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </>
  )
}

function MyTable ({
  data,
  columns,
  editRowId,
  handleEdit,
  handleAddPlan,
  handleSave,
  handleChange,
  handleDelete
}) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })

  return (
    <div className='p-2'>
      <div className='h-2' />
      <div className='flex items-center gap-2 justify-end'>
        <button
          onClick={handleAddPlan}
          className='border rounded p-1 flex items-center justify-center mx-2 my-2 px-2 py-1 gap-2 bg-blue-500 text-white'
        >
          Add Plan
          <img className='w-3' src={addSvg} alt='add' />
        </button>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
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
                    <td key={cell.id}>
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
          onClick={() => table.firstPage()}
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
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
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
    </div>
  )
}

export default SubscriptionPlanManager
