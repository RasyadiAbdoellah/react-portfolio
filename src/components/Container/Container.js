import React from 'react'
import {motion as m, useAnimation} from 'framer-motion'
import {useInView} from 'react-intersection-observer'
import { useHistory } from 'react-router-dom'

import './Container.css'

const containerAnim = {
  enter: {
    opacity: 0,
    zIndex: 0,
  },
  center: {
    opacity: 1,
    zIndex: 1,
    transition: {
      y: { 
        type: "spring",
        stiffness: 500,
        damping: 75,
        mass: 5
      },
      delayChildren: .05,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    zIndex: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.07,
      staggerDirection: -1,
      opacity: {duration: 0.2}
    }
  }
};

export default function Container (props) {
  const controls = useAnimation()
  const history = useHistory()
  const [ ref, inView ] = useInView({
    threshold: 0.2
  })

  const {  className, children, id } = props
  
  React.useEffect(() => {
    if(inView) {
      controls.start('center') 
      history.push(`/#${id}`)
    }
  }, [controls, inView, history, id])

  return (
    <>
      <m.section
        id={id}
        ref={ref}
        variants={containerAnim}
        initial='enter'
        animate={controls}
        exit='exit'
        className={`${ className ? className : ''}`}
      >
        {children}
      </m.section>
    </>
  )
}