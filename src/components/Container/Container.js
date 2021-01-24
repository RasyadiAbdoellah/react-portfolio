import React from 'react'
import './Container.css'

export default function Container (props) {
  const { fullscreen, className, children, style } = props
  return (
    <section className={`${(fullscreen ? 'fullscreen' : '')} ${className ? className : ''}`} style={style}>
      {children}
    </section>
  )
}