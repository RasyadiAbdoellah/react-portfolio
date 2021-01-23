import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Nav from 'components/Nav'
import {WheelHandler, TouchStartHandler, TouchMoveHandler} from 'Handlers'

import 'App.css'

function App() {
  
  let location = useLocation()
  const history = useHistory()
  
  const navList = [
    {path: '/', content: 'Hi!', altContent: 'Top'},
    {path: '/projects', content: 'Projects'},
    {path: '/skills', content: 'Skills'},
    {path: '/me', content: 'About'}
  ]
  
  //sets current to index of current path
  const [current, setCurrent] = React.useState(navList.map(e => e.path).indexOf(location.pathname))
  
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
    //eslint-disable-next-line
  },[])

  //push history state when current value changes
  React.useEffect(() => {
    history.push(navList[current].path)
    //eslint-disable-next-line
  },[current])


  return (
    <>
      <Nav list={navList}/>
      <Switch>
        <Route exact path="/">
          <section className="fullscreen" style={{backgroundColor: '#fff'}}>
            Top
            <div>
              
            </div>
          </section>
        </Route>
        <Route path="/projects">
          <section className="fullscreen"style={{backgroundColor: '#ddd'}}>
            projects
          </section>
        </Route>
        <Route path="/skills">
          <section className="fullscreen" style={{backgroundColor: '#aaa'}}>
            skills
          </section>
        </Route>
        <Route path="/me">
          <section className="fullscreen" style={{backgroundColor: '#555'}}>
            about + contact
          </section>
        </Route>
      </Switch>  
    </>
  );
}
export default App;





