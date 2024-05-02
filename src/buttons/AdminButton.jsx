import React from 'react'
import { Link } from 'react-router-dom'

function AdminButton () {
  return (
    <Link to='/admin'>
      <div>
        <button className='bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 hover:ring-4 hover:ring-blue-400 shadow-lg'>
          Admin
        </button>
      </div>
    </Link>
  )
}

export default AdminButton
