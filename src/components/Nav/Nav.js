import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import {motion as m, AnimateSharedLayout} from 'framer-motion'

import PageContext from 'PageContext'

import './Nav.css'

const textVariants = {
  active: {fontWeight:'bold', color:'#fff'},
  inactive: {fontWeight:'normal', color:'#fff'}
}

const underlineSpring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};


export default function Nav({list}) {
  const { dispatch } = React.useContext(PageContext)
  const { pathname } = useLocation()
  return (
    <nav className="fixed-nav">
      <AnimateSharedLayout>
        {list.map((entry, i) => {
          const match = pathname === entry.path
          let navContent = entry.content

          if(entry.altContent){
            match ? navContent = entry.content : navContent = entry.altContent
          }

          return (
            <Link 
                exact 
                to={entry.path}
                key={i+1} 
                onClick={(e) => { dispatch({type: 'jump', payload: i})}}
              >
                <m.span animate={match ? 'active' : 'inactive' } style={{fontWeight:'normal'}} variants={textVariants}>{navContent}</m.span>
                {match && <m.hr layoutId='outline' className='underline' transition={underlineSpring}/>}
              </Link>
          )
        })}
      </AnimateSharedLayout>
    </nav>
  )
}