import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion as m } from 'framer-motion'
import { Helmet } from 'react-helmet'

import Container from 'components/Container'
import IconList from 'components/IconList'
import './Experience.css'

const cardAnim = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: .5,
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.3}
    }
  },
}

const activeContentAnim = {
  active: {
    opacity: 1,
    height: 'auto',
    transition: {
      opacity: { delay: .5, },
      height: { duration: .5 }
    }
  },
  hidden: {
    opacity: 0,
    height: 0,
    visibility: 'hidden',
    transition: {
      opacity: { duration: 0.3 },
      height: { duration: 0.5, },
      visibility: { delay: 0.5 },
    },
  }
}


export default function Experience (props) {

  const [current, setCurrent] = React.useState(0)

  const FEListItems = ["Bootstrap", "React", "Redux", "Gatsby", "Storybook"]
  const BEListItems = [
    "NodeJS", 
    [
      "Express",
      {
        className: "devicon-express-original",
        color: false
      }
    ], 
    "Sequelize",  
    ["MySQL", { color: false }], 
    "PostgreSQL"
  ]
  const toolsList = [
    [
      "AWS",
      {
        className: "devicon-amazonwebservices-plain"
      }
    ],
    "Heroku",
    "Docker"
  ]

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {fields: {collection: {eq: "workHistory"}}}
        sort: {fields: frontmatter___date, order: DESC}
      ) {
        nodes {
          html
          frontmatter {
            date
            role
            company
          }
        }
      }
    }
  `)

  return (
    <Container id="me">
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>
      </Helmet>
      <div id='about'>
        <h1>About me</h1>
        <p>Before I became a developer, I was as a multimedia designer and photographer, creating digital content for a number of internet startups. Though I was officially a designer, like all startup positions I had to wear many hats, which eventually led me to front-end development.</p>

        <p>After teaching myself CSS, HTML, and Javascript, I took a 60 hour/week, 3 month immersive web development program to expand my knowledge. I now apply my skills - both in design and development - towards helping create solutions that are both accessible and cleverly designed.</p>
      </div>
      <div id='experience'>
        <h1>Where I've Been</h1>

        {
          data.allMarkdownRemark.nodes.map((md, i) => {
            return (
              <m.div 
                className={`card ${ current === i ? 'active' : ''}`}
                variants={cardAnim}
                onClick={() => {setCurrent(i)}}
              >
                <m.div className='card-heading'>
                  <h2>{md.frontmatter.role} <span>@ {md.frontmatter.company} </span></h2>
                  <p>{md.frontmatter.date}</p>
                </m.div>
                <m.div 
                  className="card-content" 
                  animate={current === i ? 'active' : 'hidden'} 
                  variants={activeContentAnim} 
                  dangerouslySetInnerHTML={{__html:md.html}}>
                </m.div>
              </m.div>
            )
          })
        }        
      </div>
      <div id="tech">
          <h1>Tech I'm Using</h1>
          <div className='inner'>
            <div>
              <h2>Frontend</h2>
              <IconList list={FEListItems}/>
            </div>
            <div>
              <h2>Backend</h2>
              <IconList list={BEListItems}/>
            </div>
            <div>
              <h2>Tools</h2>
              <IconList list={toolsList}/>
            </div>
          </div>
        </div>
    </Container>
  )
}
