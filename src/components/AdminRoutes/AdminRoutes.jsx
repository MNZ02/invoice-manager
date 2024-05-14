import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminRoutes ({ element, userRole }) {
  const navigate = useNavigate()
  if (userRole === 'admin') {
    return element
  } else {
    navigate('/auth/signin')
  }
}

export default AdminRoutes
