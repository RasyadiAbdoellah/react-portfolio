import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import {WheelHandler, TouchStartHandler, TouchMoveHandler} from 'Handlers'

import Nav from 'components/Nav'
import Container from 'components/Container'
import 'App.css'

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
  
  let location = useLocation()
  const history = useHistory()
  
  const navList = [
    {path: '/', content: 'Hi!', altContent: 'Top'},
    {path: '/projects', content: 'Projects'},
    {path: '/skills', content: 'Skills'},
    {path: '/me', content: 'About'}
  ]
  
  //sets current to index of current path and stores previous current state in prev
  const [current, setCurrent] = React.useState(navList.map(e => e.path).indexOf(location.pathname))
  const prev = usePrevious(current)


  React.useEffect(() => {
    setCurrent(navList.map(e => e.path).indexOf(location.pathname))
  }, [location.pathname])

  //add listener after screen is set
  React.useEffect(() => {
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
  //push history state when current value changes
  React.useEffect(() => {
    // console.log(current - prev)
    history.push(navList[current].path)
    //eslint-disable-next-line
  },[current])


  return (
    <>
      <Nav list={navList}/>
      <Switch>
        <Route exact path="/">
          <Container fullscreen style={{backgroundColor: '#fff'}}>
            Top
          </Container>
        </Route>
        <Route path="/projects">
          <Container fullscreen style={{backgroundColor: '#ddd'}}>
            projects
          </Container>
        </Route>
        <Route path="/skills">
          <Container fullscreen style={{backgroundColor: '#aaa'}}>
            skills
          </Container>
        </Route>
        <Route path="/me">
          <Container fullscreen style={{backgroundColor: '#555'}}>
            about + contact
          </Container>
        </Route>
      </Switch>  
    </>
  );
}
export default App;





