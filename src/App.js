import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Nav from 'components/Nav'
import {throttle, debounce} from 'lodash'

import {WheelHandler} from 'Handlers'

import 'App.css'

function App() {
  let location = useLocation()
  const history = useHistory()
  const [ current, setCurrent] = React.useState()
  
  const navList = [
    {path: '/', content: 'Hi!', altContent: 'Top'},
    {path: '/projects', content: 'Projects'},
    {path: '/skills', content: 'Skills'},
    {path: '/me', content: 'About'}
  ]
  
  
  //wheelAction requires useCallback because the current calue is not updated on rerender.
  //The theory is that once called wheelAction runs once then the entire component is rerendered, however the values inside the function are not redefined.
  const wheelAction = React.useCallback(debounce(WheelHandler(current, navList), 500, { maxWait: 500}),[navList])
  
  React.useEffect(() => {
    for( const index in navList ){
      if(navList[index].path === location.pathname){
        setCurrent(parseInt(index))
      }
    } 
  })

  React.useEffect(() => {
    window.addEventListener('wheel', wheelAction, {passive: false})
    return () => {
      window.removeEventListener('wheel', wheelAction, {passive: false})

    }
  },[wheelAction])

  return (
    <>
      <Nav list={navList}/>
      <Switch>
        <Route exact path="/">
          <section className="fullscreen">
            Top
            <div>
              
            </div>
          </section>
        </Route>
        <Route path="/projects">
          <section className="fullscreen">
            projects
          </section>
        </Route>
        <Route path="/skills">
          <section className="fullscreen">
            skills
          </section>
        </Route>
        <Route path="/me">
          <section className="fullscreen">
            about + contact
          </section>
        </Route>
      </Switch>  
    </>
  );
}

export default App;
