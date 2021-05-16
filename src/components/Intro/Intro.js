import React from 'react'
import Container from 'components/Container'
import { motion as m } from 'framer-motion'

import './Intro.css'
import { Link } from 'react-router-dom'
import PageContext from 'PageContext'


export default function Intro() {

  /*--------------------- JS TYPEWRITER ANIMATION------------------*/
  const text = 'Fullstack Web Developer & UI/UX Designer'
  const [typedText , setTypedText ] = React.useState('F')

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
    <Container className='intro'>
      <h1 className='title'>
        Hi there! I'm Ras
      </h1>
        <p className='subtitle'>
          {typedText}
        </p>
      {/* <m.p animate={{width: 'fit-content'}} transition={{delay: .75, duration: 1.25, ease:'linear'}}>
        Fullstack Web Developer & UI/UX Designer
      </m.p> */}
      <div style={{margin: '1.5rem 0'}}>
        {/* onClick handler below sets animation direction. payload is the page index in navList. i.e linking to /me is 3rd in navList array so index = 2 */}
        <a className={'button'} href={'#'}>CV/Résumé</a>
        <Link to='/me' className={'button'} onClick={(e) => { dispatch({type: 'jump', payload: 2})}}>Contact</Link>
      </div>
    </Container>
  )
}