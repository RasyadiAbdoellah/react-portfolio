import React from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import {clamp} from 'lodash'
import {AnimatePresence, motion as m} from 'framer-motion'


// import {WheelHandler} from 'bin'

import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Experience from 'components/Experience'
import Contact from 'components/Contact'
import PageContext from 'PageContext'
import 'App.css'

const navList =  [
  {path: '#top', content: 'Hi!'},
  {path: '#experience', content: 'Experience'},
  {path: '#me', content: 'Contact'}
]

function App() {
  const history = useHistory()
  const location = useLocation()
  //sets page to index of page path and stores direction
  const [state, dispatch] = React.useReducer((state, action) => {
    let currentPage
    switch(action.type) {
      case 'up' : 
        currentPage = clamp(state.page-1, 0 , navList.length-1)
      break
      case 'down' :
        currentPage = clamp(state.page+1, 0 , navList.length-1)
      break
      case 'jump' :
        currentPage = action.payload
      break
      default :
        currentPage = state.page
      break
    }
    return {
      page: currentPage,
      direction: clamp(currentPage - state.page, -1, 1)
    }
  }, {
    page: navList.map(e => e.path).indexOf(history.location.pathname), 
    direction : 0
  })

  return (
      <PageContext.Provider value={{state, dispatch}}>
          <Nav list={navList}/>
          <Intro/>
          <Experience/>
          <Contact/>
      </PageContext.Provider>
  );
}
export default App;



