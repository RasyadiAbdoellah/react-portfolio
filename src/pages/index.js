import React from 'react'

import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Experience from 'components/Experience'
import Work from 'components/Work'
import Contact from 'components/Contact'

const navList =  [
  {path: '#top', content: 'Hi!'},
  {path: '#experience', content: 'Experience'},
  {path: '#work', content: 'Work'},
  {path: '#me', content: 'Contact'}
]

function App() {
  return (
    <>
      <Nav list={navList}/>
      <Intro/>
      <Experience/>
      <Work/>
      <Contact/>
    </>
  );
}
export default App;



