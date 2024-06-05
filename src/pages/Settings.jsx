import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClipLoader } from 'react-spinners'
import DefaultusersLayout from '../layout/DefaultusersLayout'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken'

const Settings = () => {
  const userId = getUserIdFromToken()

  const [subscription, setSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    businessName: '',
    email: '',
    contact: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    gst: '',
    address: '',
    bankAccountHolderName: '',
    logo: null
  })

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await api.get(`/api/users/${userId}`)
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await api.get(`/api/subscriptions/${userId}`)
        setSubscription(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching subscription', error)
      } finally {
        setIsLoading(false) // Set loading status to false regardless of success or failure
      }
    }

    fetchSubscription()
  }, [userId])

  if (isLoading) {
    return (
      <div className='spinner-container flex justify-center items-center h-screen'>
        <ClipLoader color={'#123abc'} loading={isLoading} size={50} />
      </div>
    )
  }

  function handleChange (e) {
    const { name, value, files } = e.target

    if (name === 'logo') {
      setUserData(prevData => ({
        ...prevData,
        logo: files[0]
      }))
    } else {
      setUserData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }
  }

  async function handleSave (e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      if (userData.logo) {
        formData.append('logo', userData.logo) // Append logo file to FormData
      }
      // Append other user data fields to FormData
      Object.keys(userData).forEach(key => {
        if (key !== 'logo') {
          formData.append(key, userData[key])
        }
      })

      const response = await api.put(`/api/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set proper content type for FormData
        }
      })

      if (response) {
        toast.success('User data updated successfully')
        // Optionally fetch the updated user data here if needed
      }
    } catch (error) {
      console.error('Error updating user data: ', error)
      toast.error('Error updating user data')
    }
  }

  return (
    <DefaultusersLayout>
      <ToastContainer position='top-right' theme='colored' />
      <div className='mx-auto max-w-4xl p-6'>
        <Breadcrumb pageName='Settings' />

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
          <div className='col-span-1 xl:col-span-2'>
            <div className='bg-white dark:bg-boxdark rounded shadow-md p-6'>
              <h3 className='font-medium text-xl text-black dark:text-white mb-4'>
                Personal Information
              </h3>

              <form onSubmit={handleSave}>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='businessName'
                    >
                      Business Name
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='businessName'
                      id='businessName'
                      value={userData.businessName}
                      onChange={handleChange}
                      placeholder='Your Business Name'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='contact'
                    >
                      Phone Number
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='contact'
                      id='contact'
                      value={userData.contact}
                      onChange={handleChange}
                      placeholder='Phone Number'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='email'
                    >
                      Email Address
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='email'
                      name='email'
                      id='email'
                      value={userData.email}
                      onChange={handleChange}
                      placeholder='Email Address'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='bankName'
                    >
                      Bank Name
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='bankName'
                      id='bankName'
                      value={userData.bankName}
                      onChange={handleChange}
                      placeholder='Your Bank Name'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='bankAccountNumber'
                    >
                      Bank Account Number
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='bankAccountNumber'
                      id='bankAccountNumber'
                      value={userData.bankAccountNumber}
                      onChange={handleChange}
                      placeholder='Your Bank Account Number'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='ifscCode'
                    >
                      IFSC Code
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='ifscCode'
                      id='ifscCode'
                      value={userData.ifscCode}
                      onChange={handleChange}
                      placeholder='IFSC Code'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='gst'
                    >
                      GST
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='gst'
                      id='gst'
                      value={userData.gst}
                      onChange={handleChange}
                      placeholder='Your GST Number'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='address'
                    >
                      Address
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='address'
                      id='address'
                      value={userData.address}
                      onChange={handleChange}
                      placeholder='Your Business Address'
                    />
                  </div>

                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='bankAccountHolderName'
                    >
                      Bank Account Holder Name
                    </label>
                    <input
                      className='w-full rounded-md border border-gray-300 dark:border-strokedark py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white'
                      type='text'
                      name='bankAccountHolderName'
                      id='bankAccountHolderName'
                      value={userData.bankAccountHolderName}
                      onChange={handleChange}
                      placeholder='Your Bank Account Holder Name'
                    />
                  </div>
                  <div className='col-span-1'>
                    <label
                      className='block text-sm font-medium text-gray-700 dark:text-white mb-2'
                      htmlFor='logo'
                    >
                      Logo
                    </label>
                    <input
                      type='file'
                      name='logo'
                      id='logo'
                      accept='image/*'
                      onChange={handleChange}
                      className='w-full'
                    />
                  </div>
                </div>

                <button
                  className='mt-6 w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                  type='submit'
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>

          <div className='col-span-1'>
            <div className='bg-white dark:bg-boxdark rounded shadow-md p-6'>
              <h3 className='font-medium text-xl text-black dark:text-white mb-4'>
                Subscription Status
              </h3>
              <div className='text-gray-700 dark:text-gray-300'>
                {subscription?.isActive ? (
                  <p className='text-green-600 dark:text-green-400'>
                    Your subscription is active until{' '}
                    {new Date(subscription.endDate).toLocaleDateString()}.
                  </p>
                ) : (
                  <p className='text-red-600 dark:text-red-400'>
                    Your subscription has expired. Please renew to continue
                    enjoying our services.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultusersLayout>
  )
}

export default Settings
