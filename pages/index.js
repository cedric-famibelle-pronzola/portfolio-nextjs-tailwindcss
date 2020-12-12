import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import Projects from '../components/projects/projects'
import {connectToDatabase} from '../lib/mongodb'

import {AppContext} from './_app'
import NavBar from '../components/nav-bar'

export default function IndexPage({projects}) {
  const {setSelectedTab} = useContext(AppContext)

  useEffect(() => {
    setSelectedTab('home')
  }, [setSelectedTab])

  return (
    <div>
      <Head>
        <title>Cédric FAMIBELLE | NextJS & Tailwind CSS</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <NavBar />
      <div className='lg:text-center'>
        <h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black dark:text-white sm:text-4xl sm:leading-10'>
          Liste des projets réalisés
        </h3>
        <p className='mt-4 max-w-2xl text-xl leading-7 text-gray-500 dark:text-gray-200 lg:mx-auto'>
          Pour chacun d’entre eux, il y a une vidéo, la documentation ou le code source.
        </p>
      </div>
      <div className='mt-10 container mx-auto'>
        <ul className='md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-8 md:gap-y-10'>
          {projects.map(project => <Projects key={project._id} project={project} />)}
        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const {db} = await connectToDatabase()

  const projects = await db
    .collection('projects')
    .find({})
    .sort({priority: 1})
    .toArray()

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects))
    }
  }
}

IndexPage.propTypes = {
  projects: PropTypes.array.isRequired
}
