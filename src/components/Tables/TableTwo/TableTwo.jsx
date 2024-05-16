import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material'
import { styled } from '@mui/system'
import UserTable from './UserTable'
import api from '../../../api/api'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

const TableTwo = () => {
  const [data, setData] = useState([])

  async function fetchData () {
    try {
      const response = await api.get('/api/users')
      const data = response.data
      setData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const rowsPerPage = 1

  const pageCount = Math.ceil(data.length / rowsPerPage)

  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <div>
      <h2>Business Information</h2>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data, index) => (
          <UserTable key={index} data={data} fetchData={fetchData} />
        ))}
      <TablePagination
        component='div'
        count={pageCount}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  )
}

export default TableTwo
