import { useContext } from 'react'
import ClientDetails from './ClientDetails'
import Dates from './Dates'
import Footer from './Footer'
import Header from './Header'
import MainDetails from './MainDetails'
import Notes from './Notes'
import Table from './Table'
import TableForm from './TableForm'
import ReactToPrint from 'react-to-print'
import { DonateButton } from '../buttons'
import { State } from '../context/stateContext'

function App () {
  const {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    componentRef
  } = useContext(State)

  return (
    <main className='m-5 p-2 xl:grid grid-cols-2 gap-5 xl:items-start max-w-screen-3xl mx-auto'>
      <section className='w-full'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <div className='flex flex-col justify-center'>
            <article className='md:grid grid-cols-2 gap-8'>
              <div className='flex flex-col mb-4'>
                <label htmlFor='name' className='mb-2 font-semibold'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='text'
                  id='name'
                  placeholder='Enter your name'
                  maxLength={56}
                  autoComplete='off'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='address' className='mb-2 font-semibold'>
                  Address
                </label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Enter your address'
                  autoComplete='off'
                  maxLength={96}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </article>

            <article className='md:grid grid-cols-3 gap-6'>
              <div className='flex flex-col mb-4'>
                <label htmlFor='email' className='mb-2 font-semibold'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Enter your email'
                  maxLength={255}
                  autoComplete='off'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='website' className='mb-2 font-semibold'>
                  Website
                </label>
                <input
                  type='url'
                  name='website'
                  id='website'
                  placeholder='Enter your website'
                  maxLength={96}
                  autoComplete='off'
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='phone' className='mb-2 font-semibold'>
                  Phone
                </label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  placeholder='Enter your phone'
                  maxLength={12}
                  autoComplete='off'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </article>

            <article className='md:grid grid-cols-2 gap-6'>
              <div className='flex flex-col mb-4'>
                <label htmlFor='bankName' className='mb-2 font-semibold'>
                  Bank Name
                </label>
                <input
                  type='text'
                  name='bankName'
                  id='bankName'
                  placeholder='Enter your bank name'
                  maxLength={56}
                  autoComplete='off'
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='bankAccount' className='mb-2 font-semibold'>
                  Bank Account Number
                </label>
                <input
                  type='text'
                  name='bankAccount'
                  id='bankAccount'
                  placeholder='Enter your bank account number'
                  maxLength={20}
                  autoComplete='off'
                  value={bankAccount}
                  onChange={e => setBankAccount(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </article>

            <article className='md:grid grid-cols-2 gap-6 mt-10'>
              <div className='flex flex-col mb-4'>
                <label htmlFor='clientName' className='mb-2 font-semibold'>
                  Client's Name
                </label>
                <input
                  type='text'
                  name='clientName'
                  id='clientName'
                  placeholder="Enter your client's name"
                  maxLength={56}
                  autoComplete='off'
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='clientAddress' className='mb-2 font-semibold'>
                  Client's Address
                </label>
                <input
                  type='text'
                  name='clientAddress'
                  id='clientAddress'
                  placeholder="Enter your client's address"
                  maxLength={96}
                  autoComplete='off'
                  value={clientAddress}
                  onChange={e => setClientAddress(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </article>

            <article className='md:grid grid-cols-3 gap-6'>
              <div className='flex flex-col mb-4'>
                <label htmlFor='invoiceNumber' className='mb-2 font-semibold'>
                  Invoice Number
                </label>
                <input
                  type='text'
                  name='invoiceNumber'
                  id='invoiceNumber'
                  placeholder='Invoice Number'
                  autoComplete='off'
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='invoiceDate' className='mb-2 font-semibold'>
                  Invoice Date
                </label>
                <input
                  type='date'
                  name='invoiceDate'
                  id='invoiceDate'
                  placeholder='Invoice Date'
                  autoComplete='off'
                  value={invoiceDate}
                  onChange={e => setInvoiceDate(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label htmlFor='dueDate' className='mb-2 font-semibold'>
                  Due Date
                </label>
                <input
                  type='date'
                  name='dueDate'
                  id='dueDate'
                  placeholder='Invoice Date'
                  autoComplete='off'
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </article>

            {/* This is our table form */}
            <article className='mb-6'>
              <TableForm />
            </article>

            <div className='flex flex-col mb-6'>
              <label htmlFor='notes' className='mb-2 font-semibold'>
                Additional Notes
              </label>
              <textarea
                name='notes'
                id='notes'
                cols='30'
                rows='5'
                placeholder='Additional notes to the client'
                maxLength={500}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className='p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      {/* Invoice Preview */}
      <div className='invoice__preview bg-white p-6 rounded-lg shadow-lg border-4 border-blue-200'>
        <ReactToPrint
          trigger={() => (
            <button className='bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400'>
              Print / Download
            </button>
          )}
          content={() => componentRef.current}
        />
        <div ref={componentRef} className='p-5'>
          <Header />
          <MainDetails />
          <div className='flex items-start justify-between mb-6'>
            <ClientDetails />
            <Dates />
          </div>
          <Table />
          <Notes />
          <Footer />
        </div>
      </div>
    </main>
  )
}

export default App
