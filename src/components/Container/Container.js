import React from 'react'
import {motion as m} from 'framer-motion'

import PageContext from 'PageContext'
import './Container.css'

const variants = {
  enter: (direction) => {
    return {
      y: direction < 0 ? -1000 : 1000,
    };
  },
  center: {
    y: 0
  },
  exit: (direction) => {
    return {
      y: direction > 0 ? -1000 : 1000,
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