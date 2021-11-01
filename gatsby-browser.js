import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';

import 'index.css'

export const wrapRootElement = ({ element }) => {
  return (
    <Router>
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