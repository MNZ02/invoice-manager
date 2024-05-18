import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs'
import DefaultusersLayout from '../layout/DefaultusersLayout'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken'

const Settings = () => {
  const userId = getUserIdFromToken()

  const [userData, setUserData] = useState({
    fullName: '',
    contact: '',
    email: '',
    businessName: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    gst: '',
    address: '',
    bankAccountHolderName: ''
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
  }, [])
  function handleChange (e) {
    const { name, value } = e.target

    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  async function handleSave (e) {
    e.preventDefault()
    console.log('Save button clicked')
    try {
      const response = await api.put(`/api/users/${userId}`, userData)
      console.log('Updated user data: ', response.data)
    } catch (error) {
      console.error('Error updating user data: ', error)
    }
  }
  return (
    <DefaultusersLayout>
      <div className='mx-auto max-w-270'>
        <Breadcrumb pageName='Settings' />

        <div className='grid grid-cols-5 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>
                  Personal Information
                </h3>
              </div>
              <div className='p-7'>
                <form action='#'>
                  <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                    <div className='w-full sm:w-1/2'>
                      <label
                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                        htmlFor='fullName'
                      >
                        Full Name
                      </label>
                      <div className='relative'>
                        <input
                          className='w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                          type='text'
                          name='fullName'
                          id='fullName'
                          value={userData.fullName}
                          onChange={handleChange}
                          placeholder='Full Name'
                        />
                      </div>
                    </div>

                    <div className='w-full sm:w-1/2'>
                      <label
                        className='mb-3 block text-sm font-medium text-black dark:text-white'
                        htmlFor='phoneNumber'
                      >
                        Phone Number
                      </label>
                      <input
                        className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                        type='text'
                        name='contact'
                        id='contact'
                        value={userData.contact}
                        onChange={handleChange}
                        placeholder='Phone Number'
                      />
                    </div>
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='emailAddress'
                    >
                      Email Address
                    </label>
                    <div className='relative'>
                      <input
                        className='w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                        type='email'
                        name='email'
                        id='email'
                        value={userData.email}
                        onChange={handleChange}
                        placeholder='Email Address'
                      />
                    </div>
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='businessName'
                    >
                      Business Name
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='businessName'
                      id='businessName'
                      value={userData.businessName}
                      onChange={handleChange}
                      placeholder='Your Business Name'
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='bankName'
                    >
                      Bank Name
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='bankName'
                      id='bankName'
                      value={userData.bankName}
                      onChange={handleChange}
                      placeholder='Your Bank Name'
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='bankAccountNumber'
                    >
                      Bank Account Number
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='bankAccountNumber'
                      id='bankAccountNumber'
                      value={userData.bankAccountNumber}
                      onChange={handleChange}
                      placeholder='Your Bank Account Number'
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='ifscCode'
                    >
                      IFSC Code
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='ifscCode'
                      id='ifscCode'
                      value={userData.ifscCode}
                      onChange={handleChange}
                      placeholder='IFSC Code'
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='gst'
                    >
                      GST
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='gst'
                      id='gst'
                      value={userData.gst}
                      onChange={handleChange}
                      placeholder='Your GST Number'
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='address'
                    >
                      Address
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='address'
                      id='address'
                      value={userData.address}
                      onChange={handleChange}
                      placeholder='Your Business Address'
                    />
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className='mb-3 block text-sm font-medium text-black dark:text-white'
                      htmlFor='bankAccountHolderName'
                    >
                      Bank Account Holder Name
                    </label>
                    <input
                      className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                      type='text'
                      name='bankAccountHolderName'
                      id='bankAccountHolderName'
                      value={userData.bankAccountHolderName}
                      onChange={handleChange}
                      placeholder='Your Bank Account Holder Name'
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className='w-full bg-primary py-3 rounded text-white font-semibold transition-all duration-150 ease-in-out hover:bg-primary-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-primary dark:hover:bg-primary-2 dark:focus:ring-primary-2'
                    type='submit'
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultusersLayout>
  )
}

export default Settings
