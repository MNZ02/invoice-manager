import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import { getUserIdFromToken } from '../../api/userIdFromToken'
import ReactToPrint from 'react-to-print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './index.css'
import printSvg from '../../images/invoice/print.svg'
import shareSvg from '../../images/invoice/share.svg'

function ViewInvoice () {
  const componentRef = useRef()
  const { id } = useParams()

  const userId = getUserIdFromToken()

  const [invoiceData, setInvoiceData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [pdfUrl, setPdfUrl] = useState('')

  const fetchInvoice = async () => {
    try {
      const response = await api.get(`/api/invoice/${id}`)
      setInvoiceData(response.data)
      console.log('Invoice data', response.data)
    } catch (error) {
      console.error('Error fetching invoice', error)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/api/users/${userId}`)
      console.log(response.data)
      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data', error)
    }
  }

  useEffect(() => {
    fetchInvoice()
    fetchUserData()
  }, [id])

  const generatePdf = async () => {
    const input = componentRef.current
    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    pdf.addImage(imgData, 'PNG', 0, 0)
    const pdfBlob = pdf.output('blob')

    const blobUrl = URL.createObjectURL(pdfBlob)
    setPdfUrl(blobUrl)

    return blobUrl
  }

  const handleEmailClick = async () => {
    const url = await generatePdf()
    const emailSubject = encodeURIComponent(
      `Invoice ${invoiceData?.invoiceNumber}`
    )
    const emailBody = encodeURIComponent(`
      Hi,

      Please find the invoice details attached.
      You can download the invoice from the link below:
      ${url}

      Best regards,
      ${userData?.name}
    `)
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`
  }

  const handleWhatsAppClick = async () => {
    const url = await generatePdf()
    const whatsappText = encodeURIComponent(`
      Hi,

      Please find the invoice details attached.
      You can download the invoice from the link below:
      ${url}

      Best regards,
      ${userData?.name}
    `)
    window.open(`https://api.whatsapp.com/send?text=${whatsappText}`, '_blank')
  }

  return (
    <div>
      <div className='flex justify-end mx-1 my-2 px-1 py-2 gap-3'>
        <ReactToPrint
          trigger={() => (
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2'>
              Print{' '}
              <span>
                <img className='w-3' src={printSvg} alt='print' />
              </span>
            </button>
          )}
          content={() => componentRef.current}
        />
        <button
          onClick={handleEmailClick}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2'
        >
          Share{' '}
          <span>
            <img className='w-3' src={shareSvg} alt='share' />
          </span>
        </button>
      </div>
      <div className='a4-page'>
        <div ref={componentRef} className='p-5'>
          <header className='flex flex-col items-start justify-start mb-5 xl:flex-row xl:justify-start'>
            <div>
              {userData?.businessLogo ? (
                <img
                  src={
                    import.meta.env.VITE_REACT_API_ENDPOINT +
                    `/${userData?.businessLogo}`
                  }
                  className='h-auto max-w-full'
                  alt='Logo'
                />
              ) : (
                <img
                  src='https://picsum.photos/600/200'
                  className='h-auto max-w-full'
                  alt=''
                />
              )}
            </div>
          </header>
          <section className='flex flex-col items-end justify-end'>
            <h2 className='font-bold text-3xl uppercase '>
              {invoiceData?.name}
            </h2>
            <p>{invoiceData?.address}</p>
          </section>
          <div className='flex items-start justify-between mb-6'>
            <section className='mt-10'>
              <h2 className='text-2xl uppercase font-bold mb-1'>
                {invoiceData?.clientName}
              </h2>
              <p>{invoiceData?.clientAddress}</p>
            </section>
            <article className='mt-10 mb-14 flex items-end justify-end'>
              <ul>
                <li className='p-1 '>
                  <span className='font-bold'>Invoicer number:</span>{' '}
                  {invoiceData?.invoiceNumber}
                </li>
                <li className='p-1 bg-gray-100'>
                  <span className='font-bold'>Invoice date:</span>{' '}
                  {new Date(invoiceData?.invoiceDate).toLocaleDateString()}
                </li>
              </ul>
            </article>
          </div>
          <table width='100%' className='mb-10'>
            <thead>
              <tr className='bg-gray-100 p-1'>
                <td className='font-bold'>Description</td>
                <td className='font-bold'>Quantity</td>
                <td className='font-bold'>Price</td>
                <td className='font-bold'>Amount</td>
              </tr>
            </thead>
            {invoiceData?.items &&
              invoiceData?.items.map(({ id, name, quantity, price }) => (
                <React.Fragment key={id}>
                  <tbody>
                    <tr className='h-10'>
                      <td>{name}</td>
                      <td>{quantity}</td>
                      <td>{price}</td>
                      <td>Rs. {quantity * price}</td>
                    </tr>
                  </tbody>
                </React.Fragment>
              ))}
          </table>

          <div>
            <h2 className='flex items-end justify-end text-gray-800 text-4xl font-bold'>
              Total : Rs. {invoiceData?.totalAmount}
            </h2>
          </div>

          <section className='mt-10 mb-5'>
            <h3>Additional notes</h3>
            <p className='lg:w-1/2 text-justify'>
              {invoiceData?.additionalNotes}
            </p>
          </section>
          <footer className='footer border-t-2 border-gray-300 pt-5'>
            <ul className='flex flex-wrap items-center justify-center'>
              <li>
                <span className='font-bold'>Your name:</span> {userData?.name}
              </li>
              <li>
                <span className='font-bold'>Your email:</span> {userData?.email}
              </li>
              <li>
                <span className='font-bold'>Phone number:</span>{' '}
                {userData?.contact}
              </li>
              <li>
                <span className='font-bold'>Bank:</span> {userData?.bankName}
              </li>
              <li>
                <span className='font-bold'>Account holder:</span>{' '}
                {userData?.bankAccountHolderName}
              </li>
              <li>
                <span className='font-bold'>Account number:</span>{' '}
                {userData?.bankAccountNumber}
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default ViewInvoice
