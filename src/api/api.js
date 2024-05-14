import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('token')}`
  }
})

export default api
