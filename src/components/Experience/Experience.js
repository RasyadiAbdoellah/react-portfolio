import React from 'react'
import {motion as m, AnimateSharedLayout} from 'framer-motion'
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
      opacity: { duration: 0.2}
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
    contentList && <Container className="projects">
      <h1>What I've Worked on</h1>
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