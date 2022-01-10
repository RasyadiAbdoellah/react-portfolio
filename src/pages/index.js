import React from 'react'
import { Helmet } from 'react-helmet'


import Nav from 'components/Nav'
import Intro from 'components/Intro'
import Experience from 'components/Experience'
import Work from 'components/Work'
import Contact from 'components/Contact'

import logo from 'logo.svg'

const navList =  [
  {path: '#top', content: 'Hi!'},
  {path: '#me', content: 'About'},
  {path: '#contact', content: 'Contact'}
]

function App() {
  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>Rasyadi Abdoellah | Web Developer & UX Designer</title>
        <meta name='description' content='Designer turned developer with a love for building thoughtful, intuitive experiences.' />
        <link rel='icon' href={logo} />
      </Helmet>
      <Nav list={navList}/>
      <Intro/>
      <Experience/>
      <Contact/>
    </>
  );
}
export default App;



