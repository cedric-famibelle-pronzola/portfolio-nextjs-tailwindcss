import {useState, useRef} from 'react'
import {SiMinutemailer} from 'react-icons/si'

import Modal from './projects/modal'

export default function ContactForm() {
  const formRef = useRef()
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isMessageSent, setIsMessageSent] = useState(false)

  const sendForm = data => {
    fetch('/send-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        resetFrom()
        setIsMessageSent(true)
      } else {
        throw new Error('Une erreur s’est produite')
      }
    })
  }

  const handleEmailChange = event => {
    event.preventDefault()
    const value = event.target.value
    setEmail(value)
  }

  const handleSubjectChange = event => {
    event.preventDefault()
    const value = event.target.value
    setSubject(value)
  }

  const handleMessageChange = event => {
    event.preventDefault()
    const value = event.target.value
    setMessage(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = {
      from: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    }
    const checkEmptyFields = Object.values(formData).includes('')

    if (checkEmptyFields) {
      throw new Error('Tous les champs sont requis')
    } else {
      sendForm(formData)
    }
  }

  const resetFrom = () => {
    setEmail('')
    setSubject('')
    setMessage('')
    formRef.current.reset()
  }

  return (
    <div>
      <form ref={formRef} id='contact-form' className='container mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col my-20' onSubmit={handleSubmit}>
        <div className='-mx-3 md:flex mb-6 flex-col'>
          <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-first-name'>
              email
            </label>
            <input
              required
              id='email'
              type='email'
              className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'
              placeholder='nom@exemple.fr'
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className='md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-last-name'>
              Objet
            </label>
            <input
              required
              id='subject'
              type='text'
              className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
              placeholder='Objet de votre message'
              value={subject}
              onChange={handleSubjectChange}
            />
          </div>
        </div>
        <div className='md:w-full'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-password'>
            Message
          </label>
          <textarea
            required
            id='message'
            type='textarea'
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3'
            placeholder='Votre message'
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div>
          <button type='submit' className='bg-white cursor-pointer text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center'>
            <span className='mr-2'>Envoyer</span>
            <SiMinutemailer size={30} />
          </button>
        </div>
      </form>
      {isMessageSent && (
        <Modal
          title='Message envoyé'
          isOpen={isMessageSent}
          setIsOpen={setIsMessageSent}
        />
      )}
    </div>
  )
}
