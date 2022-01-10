import React from 'react'
import { Helmet } from 'react-helmet'


import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Experience from 'components/Experience'
import Work from 'components/Work'
import Contact from 'components/Contact'

const navList =  [
  {path: '#top', content: 'Hi!'},
  {path: '#me', content: 'About'},
  {path: '#contact', content: 'Contact'}
]

function App() {
  return (
    <>
      <Helmet>
        <title>Rasyadi Abdoellah | Web Developer & UX Designer</title>
        <description>Designer turned developer with a love for building thoughtful, intuitive experiences.</description>
      </Helmet>
      <Nav list={navList}/>
      <Intro/>
      <Experience/>
      <Contact/>
    </>
  );
}
export default App;



