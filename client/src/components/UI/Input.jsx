import React from 'react'

const Input = (props) => {
  return (
    <div className="py-2 flex flex-col">
        <label className="text-lg font-semibold ml-4 mb-1">{props.name}</label>
        <input className="border border-primary rounded-full py-2 px-4 w-full focus:border-2 focus:border-primary outline-none" placeholder={props.placeholder} />
    </div>
  )
}

export default Input