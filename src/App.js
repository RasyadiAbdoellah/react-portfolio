import React from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import {clamp} from 'lodash'
import {AnimatePresence} from 'framer-motion'

// import {WheelHandler} from 'bin'

import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Projects from 'components/Projects'
import Skills from 'components/Skills'
import Contact from 'components/Contact'
import PageContext from 'PageContext'
import 'App.css'

const navList =  [
  {path: '/', content: 'Hi!', altContent: 'Home'},
  {path: '/skills', content: 'Skills'},
  {path: '/projects', content: 'Projects'},
  {path: '/me', content: 'About'}
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

/* ----------------USEEFFECT CODE FOR CHANGING LOCATION ON SCROLL----------------------
Code below sets wheel event listeners on mount that dispatches state change on scroll.
Also sets a layoutEffect that updates location to match state.page

  //push history state when page value changes
  React.useLayoutEffect(() => {
    console.log('page effect')
    //only push to history if page does not match location index
    if(state.page !== navList.map(e => e.path).indexOf(location.pathname)){
      console.log('set history from page')
      history.push(navList[state.page].path)
    }

    //eslint-disable-next-line
  },[state.page])

  // //add listener after screen is set, remove on unmount
  React.useEffect(() => {
    window.addEventListener('wheel', WheelHandler(dispatch, 250), {passive: false})
    return () => {
      window.removeEventListener('wheel', WheelHandler(dispatch, 250))
    }
  },[])
---------------------------------------------------------------------------------------*/

  return (
      <PageContext.Provider value={{state, dispatch}}>

        <Nav list={navList}/>

        <AnimatePresence custom={state.direction} exitBeforeEnter>
          <Switch location={location} key={location.pathname}>

            <Route exact path="/">
              <Intro/>
            </Route>

            <Route path="/skills">
              <Skills/>
            </Route>

            <Route path="/projects">
              <Projects/>
            </Route>

            <Route path="/me">
              <Contact/>
            </Route>

          </Switch>  
        </AnimatePresence>

      </PageContext.Provider>
  );
}
export default App;



