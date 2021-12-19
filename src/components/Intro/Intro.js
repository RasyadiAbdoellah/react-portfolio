import React from 'react'
import {motion as m} from 'framer-motion'

import Container from 'components/Container'
import AnimLink from 'components/AnimLink'

import './Intro.css'


const svgAnim = {
  hidden: {
    pathLength: 0
  },
  visible: {
    pathLength: 1
  }
}

export default function Intro() {

  /*--------------------- JS TYPEWRITER ANIMATION------------------*/
  const text = 'Web Developer & UI/UX Designer'
  const [typedText , setTypedText ] = React.useState('W')

  const updateTypedText = () => {
    const updateStr = typedText + text[typedText.length]
    setTypedText(updateStr)
  }

  React.useEffect(() => {
    if(typedText.length === 0){ 
      setTimeout(updateTypedText, 1000)
    } else if(typedText.length !== text.length){
      setTimeout(updateTypedText, 50)
    }
  })

  return (
    <Container className='intro' id="top">
      <small>Hi there! I am</small>
      <h1 className='title'>
        Rasyadi Abdoellah
      </h1>
      <p className='subtitle'>
        {typedText}<span className="cursor">|</span>
      </p>
      {/* <m.p animate={{width: 'fit-content'}} transition={{delay: .75, duration: 1.25, ease:'linear'}}>
        Fullstack Web Developer & UI/UX Designer
      </m.p> */}
      <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ opacity: {duration: 0.5, delay: 1.75}}} style={{textAlign: 'center'}}>
        {/* onClick handler below sets animation direction. payload is the page index in navList. i.e linking to /me is 3rd in navList array so index = 2 */}
        <p className="blurb">
          Designer turned developer with a love for building thoughtful, intuitive experiences. I'm a <strong style={{color:"#fff"}}>Frontend Developer</strong>, currently building and managing web-based applications with <strong style={{color:"#fff"}}>Jenius</strong>, particularly <AnimLink href="https://www.jenius.com" target="_blank">Jenius.com</AnimLink> and <AnimLink href="https://www.cocreate.id" target="_blank">CoCreate.id</AnimLink>.
        </p>
        <a href='#contact'><m.div className='button' whileHover={{backgroundColor:"#00a8a8", scale:1.1}} transition={{scale: {type:'spring', stiffness: 500, damping: 30}}}>Get in touch</m.div></a>
      </m.div>
      <m.svg className="svg-logo" viewBox="0 0 280 280">
        <title>logo</title>
        <m.path
          d="M91.27 238.29 91.27 51.59 180.49 51.59 92.86 141.25" 
          variants={svgAnim} 
          initial="hidden" 
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", delay: 2},
          }}
        />
        <m.path
          d="M91.27 50.59 187.11 230.79 91.27 230.79" 
          variants={svgAnim} 
          initial="hidden" 
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut", delay:2.8 },

          }}
        />
      </m.svg>
    </Container>

  )
}