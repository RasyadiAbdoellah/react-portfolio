import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Nav.css'

export default function Nav({list}) {
  let { pathname } = useLocation()
  return (
    <nav className="fixed-nav">
      {list.map((entry, i) => {
        let navContent = entry.content

        if(entry.altContent){
          pathname === entry.path ? navContent = entry.content : navContent = entry.altContent
        }

        return (
          <NavLink exact to={entry.path} key={i+1}>
            {navContent}
          </NavLink>
        )
      })}
  </nav>
  )
}