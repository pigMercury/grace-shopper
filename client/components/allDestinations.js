import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

//Component
export const AllDestinations = props => {
  const {destinationArr} = props
  return (
    <div>
      <h3>Destinations</h3>
      <ul className="destinationsList">
        {destinationArr.map(dest => {
          dest.url = '/destination/' + dest.id
          return (
            <div key={dest.id}>
              <NavLink to={dest.url}>
                <h4>{dest.name}</h4>
                <img className="thumbnail" src={dest.imageUrl} />
              </NavLink>
              <h5>{dest.cost}</h5>
              <button type="submit">Add to Cart</button>{' '}
              {/* ^^might need to modify */}
            </div>
          )
        })}
      </ul>
    </div>
  )
}

//Container
const mapStateToProps = state => {
  return {
    destinationArr: state.destinationReducer.destinations
  }
}

export default connect(mapStateToProps)(AllDestinations)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
