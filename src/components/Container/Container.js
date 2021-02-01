import React from 'react'
import {motion as m} from 'framer-motion'

import PageContext from 'PageContext'
import './Container.css'

export default function Container (props) {
  const { state, dispatch } = React.useContext(PageContext)
  const { fullscreen, className, children, style } = props
  return (
    <m.section className={`${(fullscreen ? 'fullscreen' : '')} ${className ? className : ''}`} style={style}>
      {children}
      {` this is page ${state.page} `}
      <button onClick={() => dispatch({type: 'down'})}>
        go to next page
      </button>
    </m.section>
  )
}