import PropTypes from 'prop-types'
import ReactPlayer from 'react-player/vimeo'
import {VscChromeClose} from 'react-icons/vsc'
import {Transition} from '@headlessui/react'

export default function Modal({title, isOpen, setIsOpen, vimeoUrl}) {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <Transition
          show={isOpen}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {ref => (
            <div ref={ref} className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75' />
            </div>
          )}
        </Transition>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' />&#8203;

        <Transition
          show={isOpen}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        >
          {ref => (
            <div ref={ref} className='inline-block align-bottom bg-white overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
              <div className='bg-black px-2 py-2 sm:flex sm:flex-row sm:justify-between'>
                <strong className='text-white font-bold ml-5'>
                  {title}
                </strong>
                <VscChromeClose title='Fermer' size={35} className='cursor-pointer bg-black text-white border-transparent hover:bg-blue-500' onClick={() => setIsOpen(false)} />
              </div>
              {vimeoUrl && (
                <div className='h-full w-full'>
                  <ReactPlayer url={vimeoUrl} />
                </div>
              )}
            </div>
          )}
        </Transition>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  vimeoUrl: PropTypes.string
}

Modal.defaultProps = {
  vimeoUrl: null
}
