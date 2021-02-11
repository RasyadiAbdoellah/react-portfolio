import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import PageContext from 'PageContext'

import './Nav.css'

export default function Nav({list}) {
  const { dispatch } = React.useContext(PageContext)
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
          <NavLink to={entry.path} key={i+1} onClick={(e) => { dispatch({type: 'jump', payload: i})}}>{navContent}</NavLink>
        )
      })}
  </nav>
  )
}