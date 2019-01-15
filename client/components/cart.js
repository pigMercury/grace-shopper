import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'

//Renders with URL /cart
//Component
class Cart extends Component {
  render() {
    return (
      <div>
        <h3>Destinations in your cart</h3>
        <ul>
          {this.props.tripsArr.map(trip => {
            return (
              <div key={trip.id}>
                <p>Destination: {trip.name}</p>
                <p>Quantity: {trip.numPassengers}</p>
                <p>Cost: ${trip.numPassengers * trip.cost}</p>
              </div>
            )
          })}
        </ul>
        <form>
          <p>This will be a drop-down form for payment info</p>
        </form>
      </div>
    )
  }
}

//Container
const mapStateToProps = state => {
  return {
    tripsArr: state.trip.trips
  }
}

export default withRouter(connect(mapStateToProps)(Cart))
