import { jwtDecode } from 'jwt-decode'

// Function to retrieve the JWT token from local storage
const getToken = () => {
  return localStorage.getItem('token')
}

// Function to decode the JWT token and extract the user's role
export const getUserRole = () => {
  const token = getToken()
  if (token) {
    const decodedToken = jwtDecode(token)
    return decodedToken.role
  }
  return null // Handle case where token is not available
}
