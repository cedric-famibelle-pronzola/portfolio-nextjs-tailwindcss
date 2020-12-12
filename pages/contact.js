import React, {useContext, useEffect} from 'react'

import ContactForm from '../components/contact-form'
import NavBar from '../components/nav-bar'

import {AppContext} from './_app'

export default function Contact() {
  const {setSelectedTab} = useContext(AppContext)

  useEffect(() => {
    setSelectedTab('contact')
  }, [setSelectedTab])

  return (
    <>
      <NavBar />
      <ContactForm />
    </>
  )
}
