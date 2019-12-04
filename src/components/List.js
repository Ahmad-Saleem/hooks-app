import React from 'react'

export default function(props){
  return(
    <ul>
      {
        props.data.map(element => <li key={element.id}>{element.text}</li>)
      }
    </ul>
  )
}