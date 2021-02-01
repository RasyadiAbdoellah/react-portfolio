import React from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import {clamp} from 'lodash'
import {AnimatePresence} from 'framer-motion'

import {WheelHandler} from 'bin'

import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Projects from 'components/Projects'
import Skills from 'components/Skills'
import Contact from 'components/Contact'
import PageContext from 'PageContext'
import 'App.css'

const navList =  [
  {path: '/', content: 'Hi!', altContent: 'Home'},
  {path: '/projects', content: 'Projects'},
  {path: '/skills', content: 'Skills'},
  {path: '/me', content: 'About'}
]

function reducer(state, action) {
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
}

function App() {
  const history = useHistory()
  const location = useLocation()


  //sets page to index of page path and stores direction
  const [state, dispatch] = React.useReducer(reducer ,{
    page: navList.map(e => e.path).indexOf(history.location.pathname), 
    direction : 0
  })
  
  //push history state when page value changes
  React.useLayoutEffect(() => {
    console.log('page effect')
    //only push to history if page does not match location index
    if(state.page !== navList.map(e => e.path).indexOf(location.pathname)){
      console.log('set history from page')
      history.push(navList[state.page].path)
    }

    //eslint-disable-next-line
  },[state])

  // //add listener after screen is set, remove on unmount
  React.useEffect(() => {
    window.addEventListener('wheel', WheelHandler(dispatch, 250), {passive: false})
    return () => {
      window.removeEventListener('wheel', WheelHandler(dispatch, 250))
    }
  },[])

  return (
      <PageContext.Provider value={{state, dispatch}}>
        <Nav list={navList}/>
        <AnimatePresence custom={state.direction} exitBeforeEnter>
          <Switch location={location} key={state.page}>
            <Route exact path="/" component={Intro}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/skills" component={Skills}/>
            <Route path="/me" component={Contact}/>
          </Switch>  
        </AnimatePresence>
      </PageContext.Provider>
  );
}
export default App;





