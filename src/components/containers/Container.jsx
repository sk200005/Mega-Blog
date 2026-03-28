import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'> 
    {/* // add the above tailwind to every children inside container  */}
        {children}
    </div>
  )
}
