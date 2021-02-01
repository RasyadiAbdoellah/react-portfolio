import React from 'react'
import { useLocation } from 'react-router-dom'
import PageContext from 'PageContext'

import './Nav.css'

export default function Nav({list}) {
  const { state, dispatch } = React.useContext(PageContext)
  const { pathname } = useLocation()
  return (
    <nav className="fixed-nav">
      {list.map((entry, i) => {
        const match = pathname === entry.path
        let navContent = entry.content

        if(entry.altContent){
          match ? navContent = entry.content : navContent = entry.altContent
        }

        return (
          <a 
            href={entry.path} 
            key={i+1}
            className={`${match ? 'active' : ''}`}
            onClick={(e) => { 
              e.preventDefault() 
              dispatch({type: 'jump', payload: i})
            }}
          >
            {navContent}
          </a>
        )
      })}
  </nav>
  )
}