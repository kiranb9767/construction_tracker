import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='bg-[#E9EDF2] min-h-screen'>
        <Header />
       <div className='p-page'>
        {children}
       </div>
    </div>
  )
}

export default Layout