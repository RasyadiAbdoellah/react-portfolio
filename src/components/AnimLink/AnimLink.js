import React from 'react'
import {motion as m} from 'framer-motion'

export default function AnimLink(props) {
  return (
    <m.a whileHover={{textDecorationThickness: '7px'}} transition={{type:'tween'}} className="inline-link" {...props}>{props.children}</m.a>)
}