import React, { useState, useMemo } from 'react'
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
import { makeData } from './makeData'

function SubscriptionPlanManager () {
  const Plans = () => {
    return {
      Name: 'Basic Plan',
      Description: 'Pricing Plan',
      Price: '$10'
    }
  }
  const [editRowId, setEditRowId] = useState(null)
  const [data, setData] = useState([
    {
      Name: Plans().Name,
      Description: Plans().Description,
      Price: Plans().Price
    }
  ])

  const handleEdit = row => {
    setEditRowId(row.id)
  }

  const handleSave = () => {
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

  const handleDelete = row => {
    setData(prevData => prevData.filter(data => data !== row.original))
  }

  const handleAddPlan = () => {
    const newPlan = {
      id: data.length + 1,
      Name: 'New Plan',
      Description: 'Description',
      Price: '$0.00'
    }
    setData(prevData => [...prevData, newPlan])
  }

  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        cell: info => info.getValue(),
        footer: props => props.column.id
      },
      {
        accessorKey: 'Description',
        header: () => 'Description',
        footer: props => props.column.id
      },
      {
        accessorKey: 'Price',
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
                      <button onClick={handleSave}>Save</button>
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
