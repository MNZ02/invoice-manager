import React, { useContext } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteModal from './DeleteModal'
import { State } from '../context/stateContext'
import api from '../api/api'
import { getUserIdFromToken } from '../api/userIdFromToken.js'

export default function TableForm () {
  const userId = getUserIdFromToken()
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

  const {
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    list,
    total,
    isEditing,
    showModal,
    setShowModal,
    handleSubmit,
    editRow
  } = useContext(State)

  const handleAddInvoice = async () => {
    try {
      const response = await api.post('/api/invoices', {
        user: userId,
        name: name,
        address,
        email,
        phone,
        website,
        bankName,
        bankAccount,
        clientName,
        clientAddress,
        invoiceNumber,
        invoiceDate,
        dueDate,
        notes,
        totalAmount: total,
        items: list,
        description,
        quantity,
        price,
        amount
      })
      console.log('response: ', response)
    } catch (error) {
      console.error('Error adding invoice: ', error)
    }
  }

  return (
    <>
      <ToastContainer position='top-right' theme='colored' />

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:mt-8'>
          <label htmlFor='description'>Item description</label>
          <input
            type='text'
            name='description'
            id='description'
            placeholder='Item description'
            maxLength={96}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500'
          />
        </div>

        <div className='md:grid grid-cols-3 gap-6 mt-4'>
          <div className='flex flex-col'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='text'
              name='quantity'
              id='quantity'
              placeholder='Quantity'
              maxLength={33}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className='p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              name='price'
              id='price'
              placeholder='Price'
              maxLength={33}
              value={price}
              onChange={e => setPrice(e.target.value)}
              className='p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='amount'>Amount</label>
            <p>{amount}</p>
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400 mt-4'
        >
          {isEditing ? 'Finish Editing' : 'Add Table Item'}
        </button>
      </form>

      {/* Table items */}
      <table className='w-full mt-8'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='py-2 px-4 font-semibold'>Description</th>
            <th className='py-2 px-4 font-semibold'>Quantity</th>
            <th className='py-2 px-4 font-semibold'>Price</th>
            <th className='py-2 px-4 font-semibold'>Amount</th>
            <th className='py-2 px-4 font-semibold'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map(({ id, description, quantity, price, amount }) => (
              <tr key={id} className='border-b border-gray-200'>
                <td className='py-2 px-4'>{description}</td>
                <td className='py-2 px-4'>{quantity}</td>
                <td className='py-2 px-4'>{price}</td>
                <td className='py-2 px-4'>{amount}</td>
                <td className='py-2 px-4 flex justify-around'>
                  <button onClick={() => editRow(id)}>
                    <AiOutlineEdit className='text-green-500 text-lg' />
                  </button>
                  <button onClick={() => setShowModal(true)}>
                    <AiOutlineDelete className='text-red-500 text-lg' />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className='flex justify-end mt-4'>
        <h2 className='text-gray-800 text-xl font-semibold'>
          Total: {total ? total.toLocaleString() : ''}
        </h2>
      </div>
      <button
        onClick={handleAddInvoice}
        className='bg-blue-500 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400 mt-4'
      >
        Add Invoice
      </button>
    </>
  )
}
