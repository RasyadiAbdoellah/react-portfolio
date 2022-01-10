import React from 'react'
import { motion as m } from 'framer-motion'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import Container from 'components/Container'
import AnimLink from 'components/AnimLink'
import AnimBtn from 'components/AnimBtn'
import './Contact.css'

export default function Contact (props) {
  return (
    <Container id="contact">
      <h1>Get in touch</h1>
      <p className='featured-p'>I'm always open to new opportunities. Feel free to send me an email and I'll get back to you as soon as I can!</p>
      <a href='mailto:me@rasyadi.dev?subject=Saying hello!'>
        <AnimBtn featured className="block centered">
          <Icon icon={faEnvelope}/> Say hello
        </AnimBtn>
      </a>

      <a href="https://linkedin.com/in/rasyadiabdoellah" target="_blank">
        <AnimBtn className="extra">
          <Icon icon={faLinkedin}/> Add me on Linkedin
        </AnimBtn>
      </a>
      <a href="https://github.com/RasyadiAbdoellah" target="_blank">
        <AnimBtn className="extra">
          <Icon icon={faGithub}/> Checkout my Github  
        </AnimBtn>
      </a>


    </Container>
  )
}