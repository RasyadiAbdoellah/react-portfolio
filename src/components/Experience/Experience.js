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
      display: { delay: 0.1 }
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
    <Container id="experience">
      <h1>Where I've Been</h1>

      {
        data.allMarkdownRemark.nodes.map((md, i) => {
          return (
            <m.div className="card" variants={cardAnim}>
              <m.div 
                animate={current === i ? {borderLeftWidth: '7px'} : {borderLeftWidth: '2px' } }
                whileHover={{borderLeftWidth: '7px', backgroundColor: 'rgba(0,0,0,0.2)'}} 
                transition={{type:'tween'}} 
                className='card-heading'
                onClick={() => {setCurrent(i)}}
                >
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
