import React from 'react'
import { motion as m } from 'framer-motion'

import './AnimBtn.css'

export default function (props) {
  return (
    <m.div 
      className={`anim-btn ${ props.featured ? 'featured-btn' : '' } ${ props.className ? props.className: '' }`} 
      whileHover={{ backgroundColor:"#00a8a8", color:"#fff", scale:1.1 }} 
      transition={{ scale: {type:'spring', stiffness: 500, damping: 30} }}
    >
      {props.children}
    </m.div>
  )
}