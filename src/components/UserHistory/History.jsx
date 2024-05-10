import React, { useState } from 'react'
import './index.css'
import editSvg from '../../images/user-table-buttons/edit.svg'
import deleteSvg from '../../images/user-table-buttons/delete.svg'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table'
import { makeData } from './makeData'

function History () {
  const invoices = () => {
    return [
      {
        Name: 'John Doe',
        Address: '123 Main St',
        Email: 'abc@abc.com',
        Website: 'www.abc.com',
        Phone: '123-456-7890',
        'Bank name': 'Bank of America',
        'Bank account name': '1234567890',
        'Client Name': 'Jane Doe',
        'Client Address': '123 Main St',
        'Invoice Number': '123456',
        'Invoice Date': '01/01/2021',
        'Due Date': '01/31/2021'
      },
      {
        Name: 'Jane Doe',
        Address: '123 Main St',
        Email: 'xyz@xyz.com',
        Website: 'www.xyz.com',
        Phone: '123-456-7890',
        'Bank name': 'Bank of America',
        'Bank account name': '1234567890',
        'Client Name': 'John Doe',
        'Client Address': '123 Main',
        'Invoice Number': '123456',
        'Invoice Date': '01/01/2021',
        'Due Date': '01/31/2021'
      }
    ]
  }
  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo(
    () => [
      {
        header: 'User',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'Name',
            cell: info => info.getValue(),
            footer: props => props.column.id
          },
          {
            id: 'Address',
            accessorKey: 'Address',
            cell: info => info.getValue(),
            header: () => <span>Address</span>,
            footer: props => props.column.id
          },
          {
            id: 'Email',
            accessorKey: 'Email',
            cell: info => info.getValue(),
            header: () => <span>Email</span>,
            footer: props => props.column.id
          },
          {
            id: 'Website',
            accessorKey: 'Website',
            cell: info => info.getValue(),
            header: () => <span>Website</span>,
            footer: props => props.column.id
          },
          {
            id: 'Phone',
            accessorKey: 'Phone',
            cell: info => info.getValue(),
            header: () => <span>Phone</span>,
            footer: props => props.column.id
          },
          {
            id: 'Bank name',
            accessorKey: 'Bank name',
            cell: info => info.getValue(),
            header: () => <span>Bank Name</span>,
            footer: props => props.column.id
          },
          {
            id: 'Bank account name',
            accessorKey: 'Bank account name',
            cell: info => info.getValue(),
            header: () => <span>Bank account number</span>,
            footer: props => props.column.id
          }
        ]
      },
      {
        header: 'Client',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'Client Name',
            header: () => 'Client Name',
            footer: props => props.column.id
          },
          {
            accessorKey: 'Client Address',
            header: () => <span>Client Address</span>,
            footer: props => props.column.id
          },
          {
            accessorKey: 'Invoice Number',
            header: 'Invoice Number',
            footer: props => props.column.id
          },
          {
            accessorKey: 'Invoice Date',
            header: 'Invoice Date',
            footer: props => props.column.id
          },
          {
            accessorKey: 'Due Date',
            header: 'Due Date',
            footer: props => props.column.id
          }
        ]
      }
    ],
    []
  )

  const [data, setData] = React.useState(invoices())
  const refreshData = () => setData(() => makeData(100000))
  const [editRowId, setEditRowId] = useState(null)

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

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default my-4'>
      <h1 className='font-bold text-xl my-2 px-2'>Invoices History</h1>
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

export default History
