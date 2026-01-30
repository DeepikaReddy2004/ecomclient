import React from 'react'
import './card.css'

function Card(props) {
  return (
    <div className="card">
      <h3 className="card-title">{props.name || 'User Details'}</h3>
      <img 
        className="card-image"
        src={props.image} 
        alt={props.name || 'User avatar'}
      />
      <p className="card-info">
        <strong>Age:</strong> {props.age}
      </p>
      <p className="card-info">
        <strong>Branch:</strong> {props.branch}
      </p>
    </div>
  )
}

export default Card