import React, {useContext, useEffect} from 'react'
import Head from 'next/head'
import useSWR from 'swr'

import Projects from '../components/projects/projects'

import {AppContext} from './_app'
import NavBar from '../components/nav-bar'

const fetcher = url => fetch(url).then(r => r.json())

export default function IndexPage() {
  const {setSelectedTab} = useContext(AppContext)
  const {data, error} = useSWR('/my-projects.json', fetcher)

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
      {error && (
        <div className='text-center container mx-auto'>
          {error.message}
        </div>
      )}
      {data ? (
        <div className='mt-10 container mx-auto'>
          <ul className='md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-8 md:gap-y-10'>
            {data.map(data => <Projects key={data.id} project={data} />)}
          </ul>
        </div>
      ) : (
        <div className='mt-10 container mx-auto w-12 h-12 border-4 border-blue-600 rounded-full loader' />
      )}
    </div>
  )
}
