import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const token = localStorage.getItem('token')

  return token ? <Outlet /> : <Navigate to='/auth/signin' />
}

export default ProtectedRoutes
