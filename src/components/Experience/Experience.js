import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion as m } from 'framer-motion'

import Container from 'components/Container'
import './Experience.css'

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
    y: -50,
    transition: {
      opacity: { duration: 0.5}
    }
  },
}

export default function Projects (props) {
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
    <Container id="experience">
      <h1>Where I've Been</h1>

      {
        data.allMarkdownRemark.nodes.map(md => {
          return (
            <m.div className="card" variants={cardAnim}>
              <div className="card-heading">
                <h2>{md.frontmatter.role} <span>@ {md.frontmatter.company} </span></h2>
                <p>{md.frontmatter.date}</p>
              </div>
              <div className="card-content" dangerouslySetInnerHTML={{__html:md.html}}>
              </div>
            </m.div>
          )
        })
      }
      
    </Container>
  )
}
