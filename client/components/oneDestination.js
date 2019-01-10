import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//Component
export const OneDestination = props => {
  const {name, imageUrl, cost, timePeriod, description} = props
  return (
    <div>
      <h3>{name}</h3>
      <img src={imageUrl} />
      <h4>{timePeriod}</h4>
      <p>{description}</p>
      <h6>{cost}</h6>
      <button type="submit">Add to Cart</button> {/* ^^might need to modify */}
    </div>
  )
}

//Container
const mapStateToProps = state => {
  return {
    name: state.destinationReducer.singleDestination.name,
    imageUrl: state.destinationReducer.singleDestination.imageUrl,
    cost: state.destinationReducer.singleDestination.cost,
    timePeriod: state.destinationReducer.singleDestination.timePeriod,
    description: state.destinationReducer.singleDestination.description
  }
}

export default connect(mapStateToProps)(OneDestination)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
