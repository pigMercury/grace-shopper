import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import Checkout from './checkout'
import {completeOrder} from '../store'

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
                <p>
                  Total: ${this.props.tripsArr.reduce((acc, cur) => {
                    acc = acc + cur.cost * cur.numPassengers
                    return acc
                  }, 0)}
                </p>
                <hr />
              </div>
            )
          })}
        </ul>
        <p>
          Total: ${this.props.tripsArr.reduce((acc, cur) => {
            acc = acc + cur.cost * cur.numPassengers
            return acc
          }, 0)}
        </p>
        <Checkout
          amount={this.props.tripsArr.reduce((acc, cur) => {
            acc = acc + cur.cost * cur.numPassengers
            return acc
          }, 0)}
          order={this.props.order}
          completeOrder={this.props.completeOrder}
        />
      </div>
    )
  }
}

//Container
const mapStateToProps = state => {
  return {
    tripsArr: state.trip.trips,
    order: state.order.activeOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeOrder: order => dispatch(completeOrder(order))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
