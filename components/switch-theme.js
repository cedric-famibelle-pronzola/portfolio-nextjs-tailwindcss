import React, {useContext} from 'react'
import {RiSunLine, RiMoonFill} from 'react-icons/ri'
import {AppContext} from '../pages/_app'

export default function SwitchTheme() {
  const {isDarkOn, setIsDarkOn} = useContext(AppContext)

  return (
    <div className='flex justify-between items-center space-x-4'>
      <RiSunLine size={30} color={`${isDarkOn ? 'white' : 'black'}`} />
      <div
        role='checkbox'
        aria-checked={isDarkOn}
        tabIndex='0'
        className={`${isDarkOn ? 'bg-blue-500' : 'bg-gray-200'} relative inline-block flex-shrink-0 h-6 w-11 border-2 border-black rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
        onClick={() => setIsDarkOn(!isDarkOn)}
      >
        <div
          aria-hidden='true'
          className={`${isDarkOn ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
        />
      </div>
      <RiMoonFill size={30} color={`${isDarkOn ? 'white' : 'black'}`} />
    </div>
  )
}
