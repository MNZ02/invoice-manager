import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs'
import DefaultusersLayout from '../../layout/DefaultusersLayout'
import History from '../../components/UserHistory/History'
import penSvg from '../../images/invoice/pen.svg'
import api from '../../api/api'
import { getUserIdFromToken } from '../../api/userIdFromToken'

function UserDashboard () {
  const userId = getUserIdFromToken()
  const [isClicked, setIsClicked] = useState(false)
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)

  const fetchSubscription = async () => {
    try {
      const response = await api.get(`/api/subscriptions/${userId}`)
      setIsSubscriptionActive(response.data.isActive)
    } catch (error) {
      console.error('Error fetching subscription', error)
    }
  }

  const navigate = useNavigate()

  const handleClick = () => {
    if (isSubscriptionActive) {
      setIsClicked(!isClicked)
      isClicked ? null : navigate('/users/dashboard/create-invoice')
    } else {
      navigate('/users/dashboard/plans')
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])
  return (
    <DefaultusersLayout>
      <Breadcrumb pageName='Dashboard' />

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
