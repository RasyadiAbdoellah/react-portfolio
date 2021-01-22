import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
  <nav className="fixed-nav">
    <NavLink exact to="/">
      Top
    </NavLink>
    <NavLink to="/projects">
      Projects
    </NavLink>
    <NavLink to="/skills">
      Skills
    </NavLink>
    <NavLink to ="/me">
      About
    </NavLink>
  </nav>
  )
}