import React from 'react'
// import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

//Component
export default function OneDestination(props) {
  const dest = props.dest
  return (
    <div>
      <NavLink to={`/destination/${dest.id}`}>
        <h4>{dest.name}</h4>
        <img className="thumbnail" src={dest.imageURL} />
      </NavLink>
      <h5>{dest.cost}</h5>
      <button type="submit">Add to Cart</button>
      {/* ^^might need to modify */}
    </div>
  )
}
