import React, { useState, useEffect } from 'react'
import PlanTable from './PlanTable'
import api from '../../api/api'

const SubscriptionPlanManager = () => {
  const [plans, setPlans] = useState([])

  const fetchData = async () => {
    try {
      const response = await api.get('/api/plans')
      const data = response.data
      setPlans(data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PlanTable plans={plans} fetchData={fetchData} />
    </div>
  )
}

export default SubscriptionPlanManager
