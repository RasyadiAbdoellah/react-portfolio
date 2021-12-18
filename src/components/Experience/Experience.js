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
      opacity: { delay:0.1, },
      height: { duration: 0.1 }
    }
  },
  hidden: {
    opacity: 0,
    height: 0,
    display: 'none',
    transition: {
      opacity: { duration: 0.1 },
      height: { delay: 0.1 },
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
      <h1>About me</h1>
      <h2>Where I've Been</h2>

      {
        data.allMarkdownRemark.nodes.map((md, i) => {
          return (
            <m.div 
              className={`card ${ current === i ? 'active' : ''}`}
              variants={cardAnim}
              // animate={current === i ? "active" : "inactive" }
              // whileHover="hover"
              // transition={{type:'tween'}}
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
      
    </Container>
  )
}
