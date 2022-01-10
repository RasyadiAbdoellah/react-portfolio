import React from "react"
import { StaticRouter as Router } from 'react-router-dom';

import 'index.css'

export const wrapRootElement = ({ element }) => {
  return (
    <Router location="/" context={{}}>
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