import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion as m } from 'framer-motion'

import Container from 'components/Container'
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
      <div id='about'>
        <div>
          <h1>About me</h1>
          <p>Blurb about me</p>
        </div>

        <div>
          <h1>Tools</h1>
          <ul>
            <li>
              Adobe XD
            </li>
            <li>
              Figma
            </li>
            <li>
              VSCode
            </li>
            <li>
              Git
            </li>
          </ul>
        </div>
        <div>
          <h1>Languages</h1>
          <ul>
            <li>
              HTML
            </li>
            <li>
              CSS/SASS
            </li>
            <li>
              Javascript
            </li>
            <li>
              PHP
            </li>
            <li>
              Ruby
            </li>
            <li>
              SQL
            </li>
          </ul>
        </div>

        <div>
          <h1>Technologies</h1>
          <ul>
            <li>
              Bootstrap
            </li>
            <li>
              Bulma.io
            </li>
            <li>
              React
            </li>
            <li>
              Redux
            </li>
            <li>
              Gatsby.js
            </li>
            <li>
              Node
            </li>
            <li>
              Express
            </li>
            <li>
              Sequelize
            </li>
            <li>
              Ruby on Rails
            </li>
            <li>
              MySQL
            </li>
            <li>
              PostgreSQL
            </li>
            <li>
              Wordpress
            </li>
            <li>
              Wix
            </li>
            <li>
              AWS
            </li>
            <li>
              Heroku
            </li>
          </ul>
        </div>
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
      
    </Container>
  )
}
