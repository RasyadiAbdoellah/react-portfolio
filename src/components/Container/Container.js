import React from 'react'
import {motion as m} from 'framer-motion'

import PageContext from 'PageContext'
import './Container.css'

const variants = {
  enter: (direction) => {
    return {
      y: direction < 0 ? -200 : 200,
      opacity: 0,
      zIndex: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction) => {
    return {
      y: direction > 0 ? -200 : 200,
      opacity: 0,
      zIndex: 0,
    };
  }
};

export default function Container (props) {
  const { state, dispatch } = React.useContext(PageContext)
  const {  className, children, style } = props
  return (
    <m.section
      custom={state.direction}
      variants={variants}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{
        y: { type: "spring", stiffness: 200, damping: 30 },
        opacity: {duration: 0.2}
      }}
      className={className ? className : null}
      style={style}
    >
      {children}
      {` this is page ${state.page} `}
      <button onClick={() => dispatch({type: 'down'})}>
        go to next page
      </button>
    </m.section>
  )
}