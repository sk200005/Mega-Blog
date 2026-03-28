// Same UI Different Button

import React from 'react'

export default function Button({
    ButtonText,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    clasName = '',               
    ...props                  //represent additional properties like placeholder etc...

}) {
  return (
    <button className= {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${clasName}`} {...props}>
        {ButtonText}
    </button>
  )
}


// ****Interview Question on forwardRef Hook
// forwardRef is used to pass a ref from a parent component to a child component.