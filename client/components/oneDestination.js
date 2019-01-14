import React from 'react'
// import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

// Thoughts
// Define a handle submit func in the parent component, pass in as a prop;
// this will add the destination to the cart
// render number input field next to add button, use that input as # passengers

//Component
export default function OneDestination(props) {
  const dest = props.dest
  return (
    <div className="flex-item">
      <NavLink to={`/destination/${dest.id}`}>
        <h4>{dest.name}</h4>
        <img className="thumbnail" src={dest.imageURL} />
      </NavLink>
      <h5>${dest.cost}</h5>
      <button type="submit">Add to Cart</button>
    </div>
  )
}
