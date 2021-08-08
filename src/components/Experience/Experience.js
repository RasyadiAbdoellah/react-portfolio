import React from 'react'
import {motion as m} from 'framer-motion'
import {default as Markdown, compiler} from 'markdown-to-jsx'

import Container from 'components/Container'
import './Experience.css'

const importAll = (r) => r.keys().map(r)
const mdFiles = importAll(require.context('md/', false, /\.md$/))

const cardAnim = {
  enter: {
    opacity: 0,
    y: 50
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      opacity: { duration: 0.5}
    }
  },
}

export default function Projects (props) {
  
  const [contentList ,setContentList] = React.useState(null)

  React.useLayoutEffect(() => {
    async function fetchTexts() {
      const texts = await Promise.all(mdFiles.map(file => fetch(file.default).then(res => res.text()).catch(err => console.error(err))))
      setContentList(texts)
    }
    fetchTexts()
  }, [])
  
  return (
    contentList && <Container id="experience">
      <h1>Where I've Been</h1>
      <m.div className="card" variants={cardAnim}>
        <div className="card-heading">
          <p>2019 - Present</p>
          <h2>Digital Banking Solutions Developer @ <strong>Bank BTPN, Jenius</strong></h2>
        </div>
        <p className="card-content">
          Blurb about what I've been doing at Bank BTPN, Jenius
        </p>
      </m.div>

      <m.div className="card" variants={cardAnim}>
        <div className="card-heading">
          <p>2016 - 2019</p>
          <h2>Co-founder, Lead Designer, & Frontend Developer @ <strong>Deframe</strong></h2>
        </div>
        <p className="card-content">
          Blurb about what I've been doing at Bank BTPN, Jenius
        </p>
      </m.div>

      <m.div className="card" variants={cardAnim}>
        <div className="card-heading">
          <p>2013 - 2015</p>
          <h2>Multimedia Specialist @ <strong>Shopdeca.com</strong></h2>
        </div>
        <p className="card-content">
          Blurb about what I've been doing at Shopdeca
        </p>
      </m.div>

        {contentList.map((content, i) => {
          return (
            <m.div key={i} variants={cardAnim} className="card">
              <Markdown>{content}</Markdown>
            </m.div>
          )
        })}
    </Container>
  )
}