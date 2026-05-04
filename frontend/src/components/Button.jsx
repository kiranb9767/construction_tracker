import React from 'react'

const Button = ({children, onClick, className = ""}) => {
  return (
    <button className={`bg-blue-500 rounded-full  text-white px-4 py-2 ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button