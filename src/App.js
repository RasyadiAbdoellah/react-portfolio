import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Nav from 'components/Nav'
import {WheelHandler} from 'Handlers'

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
    return () => {
      window.removeEventListener('wheel', WheelHandler(setCurrent, (navList.length-1), 250))
    }
  },[])

  //push history state when current value changes
  React.useEffect(() => {
    history.push(navList[current].path)
  },[current])


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





