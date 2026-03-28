import React, { useId } from 'react'

function Select({ options, label, className, ...props }, ref) {

  const id = useId();

  return (
    <div className={`${className}`}>

      {label && <label htmlFor={id}>{label}</label>}

      <select
        {...props}
        id={id}
        ref={ref}
        className="px-3 py-2 rounded-lg bg-white text-black outline-none
        focus:bg-gray-50 duration-200 border border-gray-200 w-full"
      >

        {options?.map((item) => (           // "?" prevents crashing when option array is empty
          <option key={item} value={item}>
            {item}
          </option>
        ))}

      </select>

    </div>
  )
}

export default React.forwardRef(Select)  // Simpler method of forwardRef as in Input.jsx
