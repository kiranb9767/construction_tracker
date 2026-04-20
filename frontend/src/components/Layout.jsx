import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='bg-gradient-to-bl from-red-100 via-purple-100 to-gray-200 min-h-screen'>
        <Header />
       <div className='p-page'>
        {children}
       </div>
    </div>
  )
}

export default Layout