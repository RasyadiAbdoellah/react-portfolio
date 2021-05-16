import React from 'react'
import {motion as m} from 'framer-motion'

import PageContext from 'PageContext'

const variants = {
  enter: (direction) => {
    return {
      x: direction < 0 ? -200 : 200,
      opacity: 0,
      zIndex: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      zIndex: 0,
    };
  }
};

export default function Container (props) {
  const { state } = React.useContext(PageContext)
  const {  className, children, style } = props
  return (
    <m.section
      custom={state.direction}
      variants={variants}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{
        x: { type: "spring", stiffness: 200, damping: 30 },
        opacity: {duration: 0.2}
      }}
      className={`${ className ? className : ''}`}
      style={style}
    >
      {children}
    </m.section>
  )
}