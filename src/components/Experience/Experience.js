import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion as m } from 'framer-motion'
import { Helmet } from 'react-helmet'

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

const fragment = (     
<div>
  <h1>Tools I Use</h1>
  <ul>
    <li>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg"  alt="Adobe XD" title="Adobe XD"/>
    </li>
    <li>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" title="Figma"/>
    </li>
    <li>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" alt="VS Code" title="VS Code"/>
    </li>
    <li>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain-wordmark.svg" alt="Git" title="Git"/>
    </li>
  </ul>
</div>
)

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
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>
      </Helmet>
      <div id='about'>
        <h1>About me</h1>
        <p>Blurb about me</p>
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
          <h1>Tech I Use</h1>
          <div className='inner'>
            <div>
              <h2>Frontend</h2>
              <ul className='icon-list'>
                <li>
                  <i className="devicon-bootstrap-plain colored"></i> Bootstrap
                </li>
                <li>
                  <i className="devicon-bulma-plain colored"></i> Bulma
                </li>
                <li>
                  <i className="devicon-react-original colored"></i> React
                </li>
                <li>
                  <i className="devicon-redux-original colored"></i> Redux
                </li>
                <li>
                  <i className="devicon-gatsby-plain colored"></i> Gatsby
                </li>
                <li>
                  <i class="devicon-storybook-plain colored"></i> Storybook
                </li>
              </ul>
            </div>
            <div>
              <h2>Backend</h2>
              <ul className='icon-list'>
                <li>
                  <i className="devicon-nodejs-plain colored" title='NodeJS'></i> NodeJS
                </li>
                <li>
                  <i className="devicon-express-original" title='Express.js'></i> Express
                </li>
                <li>
                  <i className="devicon-sequelize-plain colored" title='Sequelize'></i> Sequelize
                </li>
                <li>
                  <i className="devicon-rails-plain colored" title='Ruby on Rails'></i> Ruby on Rails
                </li>
                <li>
                  <i className="devicon-mysql-plain" title='MySQL'></i> MySQL
                </li>
                <li>
                  <i className="devicon-postgresql-plain colored" title='PostgreSQL'></i> Postgres
                </li>
              </ul>
            </div>
            <div>
              <h2>Tools</h2>
              <ul className='icon-list'>
                <li>
                  <i className="devicon-amazonwebservices-plain colored" title='AWS'></i> AWS
                </li>
                <li>
                  <i className="devicon-heroku-plain colored" title='Heroku'></i> Heroku
                </li>
                <li>
                  <i className="devicon-docker-plain colored" title='Docker'></i> Docker
                </li>
              </ul>
            </div>
          </div>
        </div>
    </Container>
  )
}
