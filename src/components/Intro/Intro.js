import React from 'react'
import { Link } from 'react-router-dom'
import {motion as m} from 'framer-motion'

import PageContext from 'PageContext'
import Container from 'components/Container'
import './Intro.css'

const AnimLink = (props) => {
  return (
    <m.a whileHover={{textDecorationThickness: '7px'}} transition={{type:'tween'}} className="inline-link" {...props}>{props.children}</m.a>)
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

  const { dispatch } = React.useContext(PageContext)

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
        <a href='#me' onClick={(e) => { /*dispatch({type: 'jump', payload: 2})*/ }}><m.div className='button' whileHover={{backgroundColor:"#00a8a8", scale:1.1}} transition={{scale: {type:'spring', stiffness: 500, damping: 30}}}>Get in touch</m.div></a>
      </m.div>
    </Container>
  )
}