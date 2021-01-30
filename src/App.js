import React from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import {WheelHandler, TouchStartHandler, TouchMoveHandler} from 'Handlers'

import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Projects from 'components/Projects'
import Skills from 'components/Skills'
import Contact from 'components/Contact'
import 'App.css'

const navList =  [
  {path: '/', content: 'Hi!', altContent: 'Home'},
  {path: '/projects', content: 'Projects'},
  {path: '/skills', content: 'Skills'},
  {path: '/me', content: 'About'}
]

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    // console.log('prev value effect')
    ref.current = value;
  }, [value]);
  return ref.current;
}

function App() {
  // console.log('paint')
  const history = useHistory()
  const location = useLocation()

  //sets current to index of current path and stores previous current state in prev
  const [current, setCurrent] = React.useState(navList.map(e => e.path).indexOf(history.location.pathname))
  const prev = usePrevious(current)
  const direction = React.useRef()
  
  //sync current value with index of navList item when location changes
  React.useLayoutEffect(() => {
    // console.log('location effect')
    //only set current if it differs from location index
    if(current !== navList.map(e => e.path).indexOf(location.pathname)){
      // console.log('set current from location')
      setCurrent(navList.map(e => e.path).indexOf(location.pathname))
    }

    //eslint-disable-next-line
  }, [location])

  //push history state when current value changes
  React.useLayoutEffect(() => {
    // console.log('current effect')
    direction.current = current - prev
    //only push to history if current does not match location index
    if(current !== navList.map(e => e.path).indexOf(location.pathname)){
      // console.log('set history from current')
      history.push(navList[current].path)
    }
    //eslint-disable-next-line
  },[current])

  //add listener after screen is set
  React.useEffect(() => {
    // console.log('in listener set')
    window.addEventListener('wheel', WheelHandler(setCurrent, (navList.length-1), 250), {passive: false})
    window.addEventListener('touchstart', TouchStartHandler, {passive: false})
    window.addEventListener('touchmove', TouchMoveHandler(setCurrent, (navList.length-1), 330), {passive: false})

    return () => {
      window.removeEventListener('wheel', WheelHandler(setCurrent, (navList.length-1), 250))
      window.removeEventListener('touchstart', TouchStartHandler)
      window.removeEventListener('touchmove', TouchMoveHandler(setCurrent, (navList.length-1), 330))
    }
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Nav list={navList}/>
      <Switch>
        <Route exact path="/">
          <Intro/>
        </Route>
        <Route path="/projects">
          <Projects/>
        </Route>
        <Route path="/skills">
          <Skills/>
        </Route>
        <Route path="/me">
          <Contact/>
        </Route>
      </Switch>  
    </>
  );
}
export default App;





