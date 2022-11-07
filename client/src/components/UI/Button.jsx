import React from 'react'

const Button = (props) => {
    const classes = props.primary ? 'border border-primary': 'bg-primary border border-black'
  return (
    <button className={`${classes} px-4 py-1 rounded-full text-white text-xl`}>{props.text}</button>
  )
}

export default Button