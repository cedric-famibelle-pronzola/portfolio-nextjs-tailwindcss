import React, {useEffect, useState} from 'react'

import '../styles/index.css'

export const AppContext = React.createContext()

function MyApp({ Component, pageProps }) {
  const [isDarkOn, setIsDarkOn] = useState(false)
  const [selectedTab, setSelectedTab] = useState(null)

  useEffect(() => {
    if (isDarkOn) {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }
  }, [isDarkOn])

  return (
    <AppContext.Provider value={{
      selectedTab,
      setSelectedTab,
      isDarkOn,
      setIsDarkOn
    }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>

  ) 
}

export default MyApp
