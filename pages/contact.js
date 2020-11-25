import React, {useContext, useEffect} from 'react'

import ContactForm from '../components/contact-form'
import Layout from '../components/layout'

import {AppContext} from './_app'

export default function Contact() {
  const {setSelectedTab} = useContext(AppContext)

  useEffect(() => {
    setSelectedTab('contact')
  }, [setSelectedTab])

  return (
    <Layout>
      <ContactForm />
    </Layout>
  )
}
