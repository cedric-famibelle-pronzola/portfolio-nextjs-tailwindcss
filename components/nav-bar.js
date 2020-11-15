import {useState} from 'react'
import Link from 'next/link'

const links = [
  {
    href: 'https://github.com/cedric-famibelle-pronzola',
    label: 'GitHub'
  },
  {
    href: 'https://gitlab.com/cedric-famibelle-pronzola',
    label: 'GitLab'
  }
]

export default function NavBar() {
  const [isShown, setIsShown] = useState(false)

  return (
    <div>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='hidden md:block'>
                <div className='flex items-baseline space-x-4'>
                  <Link href='/' >
                    <a className='px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'>Projets</a>
                  </Link>
                  <Link href='/contact'>
                    <a className='px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'>Contact</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className='hidden md:block'>
              <ul className='flex justify-between items-center'>
                <ul className='flex justify-between items-center space-x-4'>
                  {links.map(({href, label}) => (
                    <li key={`${href}${label}`}>
                      <a target='_blank' rel='noreferrer' href={href} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
            <div className='-mr-2 flex md:hidden'>
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white'
                onClick={() => setIsShown(!isShown)}
              >
                <svg className={`${isShown ? 'hidden' : 'block'} h-6 w-6`} stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
                <svg className={`${isShown ? 'block' : 'hidden'} h-6 w-6`} stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`${isShown ? 'block' : 'hidden'} md:hidden`}>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link href='/'>
              <a className='block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'>Projets</a>
            </Link>
            <Link href='/contact'>
              <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'>Contact</a>
            </Link>
          </div>
          <div className='px-2 pt-2 pb-3 border-t border-gray-700'>
            <ul>
              {links.map(({href, label}) => (
                <li key={`${href}${label}`}>
                  <a target='_blank' rel='noreferrer' href={href} className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
