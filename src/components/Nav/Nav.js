import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import {motion as m, AnimateSharedLayout, useViewportScroll} from 'framer-motion'

import PageContext from 'PageContext'

import './Nav.css'

const textVariants = {
  active: {fontWeight:'600', color:'#fff'},
  inactive: {fontWeight:'300', color:'#fff'}
}

const underlineSpring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};


export default function Nav({list, colors}) {
  const { state, dispatch } = React.useContext(PageContext)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useViewportScroll()

  React.useEffect(()=> scrollY.onChange(() => {
    scrollY.get() > 10 ? setIsScrolled(true) : setIsScrolled(false)
  }), [scrollY])


  return (
    <m.nav className="fixed-nav" 
    animate={{ 
      backgroundColor: colors[state.page]+'b2',
      boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.2)' : '0 0 0 rgba(0, 0, 0, 0)',
      backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
    }} 
    transition={{delay:.1}}
    >
      <div className="inner">
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
                  onClick={(e) => {
                    dispatch({type: 'jump', payload: i})
                  }}
                >
                  <m.span animate={match ? 'active' : 'inactive'} variants={textVariants}>{navContent}</m.span>
                  {match && <m.hr layoutId='outline' className='underline' transition={underlineSpring}/>}
                </Link>
            )
          })}
        </AnimateSharedLayout>
      </div>
    </m.nav>
  )
}