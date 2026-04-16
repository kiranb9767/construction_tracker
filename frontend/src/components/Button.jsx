import React from 'react'

const Button = ({children, onClick, className = ""}) => {
  return (
    <button className={`bg-primary hover:bg-primaryHover rounded-button font-small text-white px-4 py-2 ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button