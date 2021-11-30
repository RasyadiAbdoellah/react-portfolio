import React from 'react'
import { useLocation } from 'react-router-dom'
import {motion as m, AnimateSharedLayout, useViewportScroll} from 'framer-motion'

import './Nav.css'

const textVariants = {
  active: {fontWeight:'600', color:'#fff'},
  inactive: {fontWeight:'300', color:'#909394'}
}

const underlineSpring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};


export default function Nav({list}) {
  
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { hash } = useLocation()
  const { scrollY } = useViewportScroll()
  
  scrollY.onChange(() => {
    scrollY.get() > 0 ? setIsScrolled(true) : setIsScrolled(false)
  })

  return (
    <m.nav className="fixed-nav" 
    animate={{ 
      boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.2)' : '0 0 0 rgba(0, 0, 0, 0)',
      // backdrop filter removed due to lack of firefox support and 
      // backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
      backgroundColor: isScrolled ? '#34393d' : '#212629'
    }} 
    transition={{delay:.1}}
    >
      <div className="inner">
        <div className="logo" style={{color:'white'}}>logo</div>
        <div className="wrapper">
          <AnimateSharedLayout>
            {list.map((entry, i) => {
              const match = hash === entry.path
              let navContent = entry.content

              if(entry.altContent){
                match ? navContent = entry.content : navContent = entry.altContent
              }
              return (
                <a href={entry.path} key={i+1} >
                    <m.span animate={match ? 'active' : 'inactive'} variants={textVariants}>{navContent}</m.span>
                    {match && <m.hr layoutId='outline' className='underline' transition={underlineSpring}/>}
                  </a>
              )
            })}
          </AnimateSharedLayout>
        </div>
      </div>
    </m.nav>
  )
}