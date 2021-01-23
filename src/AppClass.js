import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Nav from 'components/Nav'
import { debounce } from 'lodash'

//Below is the Class Component version of App. note that it uses a withRouter HOC and has a yDiff global variable to detect vertical scroll.

let yDiff = 0

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current : this.routeCheck()
    }
  }
  navList = [
    {path: '/', content: 'Hi!', altContent: 'Top'},
    {path: '/projects', content: 'Projects'},
    {path: '/skills', content: 'Skills'},
    {path: '/me', content: 'About'}
  ]

  routeCheck (){
    for( const index in this.navList ){
      if(this.navList[index].path === this.props.location.pathname){
        return parseInt(index)
      }
    }
  }

  componentDidMount() {

    window.addEventListener('wheel', debounce((event) => {
        yDiff = yDiff + event.deltaY
        console.log(yDiff)
        if(yDiff <= -100) {
          yDiff = 0
          console.log(event)
          event.preventDefault()
          this.setState(state => {
            if(state.current > 0 ){
              return {current: state.current - 1}
            }
          return state
          })
        }
        if(yDiff >= 100 ) {
          yDiff = 0
          console.log(event)
          event.preventDefault()
          this.setState(state => {
            if(state.current < this.navList.length-1){
              return {current: state.current + 1}
            }
            return state
          })
    
        }
      }, 500), {passive: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.current !== prevState.current && this.props.location.pathname === prevProps.location.pathname) {  
      this.props.history.push(this.navList[this.state.current].path)
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('wheel', this.wheelAction, {passive: false})
  }

  render () {
    return (
      <>
        <Nav list={this.navList}/>
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
}
export default withRouter(App);