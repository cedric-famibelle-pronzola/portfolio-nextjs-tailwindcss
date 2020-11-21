import {useState} from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import {MdOndemandVideo} from 'react-icons/md'

import Modal from './modal'

const siIconsList = {
  SiHtml5: dynamic(() => import('react-icons/si').then(icon => icon.SiHtml5)),
  SiCss3: dynamic(() => import('react-icons/si').then(icon => icon.SiCss3)),
  SiJavascript: dynamic(() => import('react-icons/si').then(icon => icon.SiJavascript)),
  SiJquery: dynamic(() => import('react-icons/si').then(icon => icon.SiJquery)),
  SiPhp: dynamic(() => import('react-icons/si').then(icon => icon.SiPhp)),
  SiMysql: dynamic(() => import('react-icons/si').then(icon => icon.SiMysql)),
  SiBootstrap: dynamic(() => import('react-icons/si').then(icon => icon.SiBootstrap)),
  SiAngular: dynamic(() => import('react-icons/si').then(icon => icon.SiAngular)),
  SiTypescript: dynamic(() => import('react-icons/si').then(icon => icon.SiTypescript)),
  SiFirebase: dynamic(() => import('react-icons/si').then(icon => icon.SiFirebase))
}

export default function Projects({project}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {title, subtitle, tools, documentation, code, demo} = project
  const icons = tools.map(tool => {
    const Component = siIconsList[tool.icon]
    const title = tool.title
    return {Component, title}
  })

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <li className='mb-5 rounded-md border p-5'>
      {isModalOpen && (
        <Modal title={title} isOpen={isModalOpen} setIsOpen={setIsModalOpen} vimeoUrl={demo} />
      )}
      <div className='flex'>
        <div className='flex-shrink-0'>
          <div className='flex cursor-pointer items-center justify-center h-12 w-12 rounded bg-blue-500 hover:bg-blue-700 text-white' onClick={handleClick}>
            <MdOndemandVideo size={30} title='Démonstration vidéo' />
          </div>
        </div>
        <div className='ml-4'>
          <h4 className='text-lg leading-6 font-medium text-white font-bold'>{title}</h4>
          <p className='mt-2 text-base leading-6 text-gray-500'>
            {subtitle}
          </p>
        </div>
      </div>
      <div className='text-white text-center'>
        <h4 className='my-5'>Technos utilisées</h4>
        <ul className='flex justify-center'>
          {icons.map(({Component, title}) => {
            return (
              <li key={title} className='mx-1'>
                <Component size={30} title={title} />
              </li>
            )
          })}
        </ul>
      </div>
      <div className='text-center'>
        <h4 className='my-5 text-white'>{code ? 'Code source' : 'Documentation'}</h4>
        {documentation.map(({title, url}) => {
          return (
            <a key={title} href={url} target='_blank' rel='noreferrer' className='mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-700 rounded'>
              {title}
            </a>
          )
        })}
      </div>
    </li>
  )
}

Projects.propTypes = {
  project: PropTypes.object.isRequired
}
