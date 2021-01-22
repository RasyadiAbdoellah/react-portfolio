import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Nav from 'components/Nav'



function App() {
  const history = useHistory()
  let location = useLocation()
  let current
  
  const navList = [
    {path: '/', content: 'Hi!', altContent: 'Top'},
    {path: '/projects', content: 'Projects'},
    {path: '/skills', content: 'Skills'},
    {path: '/me', content: 'About'}
  ]
  
  for( const index in navList ){
    if(navList[index].path === location.pathname){
      current = parseInt(index)
    }
  } 
  
  //wheelAction requires useCallback because the current calue is not updated on rerender.
  //The theory is that once called wheelAction runs once then the entire component is rerendered, however the values inside the function are not redefined.
  const wheelAction = React.useCallback((event) => {
    if(event.deltaY < 0 && current !== 0) {
      history.push(navList[current-1].path)
    }
    if(event.deltaY > 0 && current < navList.length-1) {
      history.push(navList[current+1].path)

    }
    // eslint-disable-next-line
  }, [current])
  
  
  React.useEffect(() => {
    window.addEventListener('wheel', wheelAction)
    return () => {
      window.removeEventListener('wheel', wheelAction)
    }
  }, [wheelAction])

  return (
    <>
      <Nav list={navList}/>  
      <Switch>
        <Route exact path="/">
          <header className="main-banner">
            Header
          </header>
        </Route>
        <Route path="/projects">
          <section>
            projects
          </section>
        </Route>
        <Route path="/skills">
          <section>
            skills
          </section>
        </Route>
        <Route path="/me">
          <section>
            about + contact
          </section>
        </Route>
      </Switch>
    </>
  );
}

export default App;
