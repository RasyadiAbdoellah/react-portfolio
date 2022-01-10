import React from 'react'
import'./IconList.css'

export default function ({list}){
  return (
    <ul className='icon-list'>
      {list.map(entry =>{ 
        const [title, {
          className = `devicon-${title.toLocaleLowerCase()}-plain`,
          color = true
        }] = entry

        if(typeof entry === "string") return (
          <li>
            <i className={`devicon-${entry.toLocaleLowerCase()}-plain colored`} title={entry}></i> {entry}
          </li>
        );

        return (
          <li>
            <i className={`${className}${color ? ' colored' : ''}`} title={title}></i> {title}
          </li>
        )
      })}
    </ul>
  )
}