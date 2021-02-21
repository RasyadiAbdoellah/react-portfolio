import React from 'react'
import Container from 'components/Container'
import { motion as m } from 'framer-motion'

import './Intro.css'


export default function Intro() {

  /*--------------------- JS TYPEWRITER ANIMATION------------------
  const text = 'Fullstack Web Developer & UI/UX Designer'
  const [typedText , setTypedText ] = React.useState('')

  function updateTypedText () {
    const updateStr = typedText + text[typedText.length]
    setTypedText(updateStr)
  }

  React.useEffect(() => {
    if(typedText.length === 0){ 
      setTimeout(updateTypedText, 750)
    } else if(typedText.length !== text.length){
      setTimeout(updateTypedText, 40)
    }
  }, [typedText])
  */

  return (
    <Container className={'intro'}>
      <m.h1 >
        Hi there! I'm Ras
      </m.h1>
      <m.p animate={{width: 'fit-content'}} transition={{delay: .75, duration: 1.25, ease:'linear'}}>
        {'Fullstack Web Developer & UI/UX Designer'} 
      </m.p>
    </Container>
  )
}