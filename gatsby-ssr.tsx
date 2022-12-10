import React from "react"
import { StaticRouter as Router } from 'react-router-dom/server';

import 'index.css'

export const wrapRootElement = ({ element }) => {
  return (
    <Router location="/">
        {element}
    </Router> 
  )
}

export const wrapPageElement = ({ element }) => {
  return (
    <div id="root">
      {element}
    </div>
  )
}