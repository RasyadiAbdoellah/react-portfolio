import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion as m } from 'framer-motion'
import { Helmet } from 'react-helmet'

import Container from '../Container'
import IconList from '../IconList'
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
    transition: {
      opacity: { duration: 0.3 },
      height: { duration: 0.5, },
      visibility: { delay: 0.5 },
    },
  }
}


export default function Experience () {

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
    [
      "Ruby on Rails",
      {
        className: "devicon-rails-plain",
        color: false
      }
    ], 
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
        sort: {fields: frontmatter___order, order: ASC}
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
        <p>I am a maker at heart. Whether its a custom desktop PC, a Raspberry Pi-powered smart TV, or a bicycle, I like trying to figure out how things work and what I can do to make it better. It's one of the reasons why I enjoy development work; there's always something to tweak and improve.</p>

        <p>Before I became a developer I was as a multimedia designer and photographer, creating digital content for a number of internet startups. Like all startup positions I had to wear many hats, eventually leading me to learn CSS, HTML, and Javascript to tackle frontend development.</p>

        <p>I took an immersive web development program to expand on what I learned by myself. I now apply my passion for building and my skills - both in design and development - towards creating solutions that are both accessible and cleverly designed.</p>


      </div>
      <div id='experience'>
        <h1>Where I've been</h1>

        {
          data.allMarkdownRemark.nodes.map((md: any, i: number) => {
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
                  className={`card-content ${ current === i ? 'active' : ''}`} 
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
          <h1>Tech I'm using</h1>
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
