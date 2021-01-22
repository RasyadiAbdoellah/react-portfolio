import { Switch, Route } from 'react-router-dom'
import Nav from 'components/Nav'

function App() {
  return (

    <>
      <Nav/>  
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
