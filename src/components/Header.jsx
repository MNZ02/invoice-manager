import { useEffect, useState } from 'react'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken'

export default function Header () {
  const [logo, setLogo] = useState(null)
  const userId = getUserIdFromToken()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}`)
        console.log('response: ', response.data)
        const logoPath = response?.data?.businessLogo
        setLogo(logoPath)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <header className='flex flex-col items-start justify-start mb-5 xl:flex-row xl:justify-start'>
      <div>
        {logo ? (
          <img
            src={import.meta.env.VITE_REACT_API_ENDPOINT + `/${logo}`}
            className='h-auto max-w-full'
            alt='Your Business Logo'
          />
        ) : (
          <img
            src='https://picsum.photos/600/200'
            className='h-auto max-w-full'
            alt=''
          />
        )}
      </div>

      {/* Uncomment and adjust as needed */}
      {/* <div>
        <ul className="flex items-center justify-between flex-wrap">
          <li>
            <button
              onClick={handlePrint}
              className="bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
            >
              Print
            </button>
          </li>
          <li className="mx-2">
            <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
              Download
            </button>
          </li>
          <li>
            <button className="bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300">
              Send
            </button>
          </li>
        </ul>
      </div> */}
    </header>
  )
}
