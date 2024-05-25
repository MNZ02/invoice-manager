import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserRole } from '../../api/getUserRole'

function AdminRoutes ({ element, userRole }) {
  const role = getUserRole()
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/users/dashboard')
    }
  }, [role, navigate])

  return <>{element}</>
}
export default AdminRoutes
