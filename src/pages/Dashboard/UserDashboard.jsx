import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultusersLayout from '../../layout/DefaultusersLayout'
import History from '../../components/UserHistory/History'
import penSvg from '../../images/invoice/pen.svg'
function UserDashboard () {
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setIsClicked(!isClicked)
    isClicked ? null : navigate('/users/dashboard/create-invoice')
  }
  return (
    <DefaultusersLayout>
      <div className='flex justify-end mx-2 my-2 px-2 py-1'>
        {isClicked ? (
          <button
            onClick={handleClick}
            className='bg-red-500 text-white px-2 py-2 rounded-md shadow-md flex items-center gap-2'
          >
            Cancel{' '}
          </button>
        ) : (
          <button
            onClick={handleClick}
            className='bg-blue-500 text-white px-2 py-2 rounded-md shadow-md flex items-center gap-2'
          >
            Create new{' '}
            <span>
              <img className='w-3' src={penSvg} alt='pen' />
            </span>
          </button>
        )}
      </div>
      <History />
    </DefaultusersLayout>
  )
}

export default UserDashboard
