import React from 'react'
import {motion as m} from 'framer-motion'

import PageContext from 'PageContext'

import './Container.css'

const containerAnim = {
  enter: () => ({
    x: -200,
    opacity: 0,
    zIndex: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    transition: {
      delayChildren: .3,
      staggerChildren: 0.07
    }
  },
  exit: () => ({
    x:200,
    opacity: 0,
    zIndex: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.07,
      staggerDirection: -1,
      opacity: {duration: 0.2}
    }
  })
};

export default function Container (props) {
  const { state } = React.useContext(PageContext)
  const {  className, children, id } = props
  return (
    <m.section
      id={id}
      custom={state.direction}
      variants={containerAnim}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{
        x: { type: "spring", stiffness: 500, damping: 25 }
      }}
      className={`${ className ? className : ''}`}
    >
      {children}
    </m.section>
  )
}