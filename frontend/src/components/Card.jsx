import React from 'react'

const Card = ({childred}) => {
  return (
    <div className='bg-card shadow-card rounder-card p-card'>
        {childred}
    </div>
  )
}

export default Card