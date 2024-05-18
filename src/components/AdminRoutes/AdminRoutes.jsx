import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminRoutes ({ element, userRole }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (userRole === 'admin') {
      navigate('/admin/*')
    }
  }, [userRole, navigate])

  if (userRole !== 'admin') {
    navigate('/auth/signin')
  }

  return element
}

export default AdminRoutes
