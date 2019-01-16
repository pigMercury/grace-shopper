import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Checkout from './checkout'
import {completeOrder, clearedTrips} from '../store'
import CartItem from './cartItem'

//Renders with URL /cart
//Component
class Cart extends Component {
  render() {
    return (
      <div id="cart-component">
        <h3>Trips in Your Cart</h3>
        <ul>
          {this.props.tripsArr.map((trip, i) => {
            return <CartItem key={trip.id} trip={trip} index={i} />
          })}
          <p>
            Total: ${this.props.tripsArr.reduce((acc, cur) => {
              acc = acc + cur.cost * cur.numPassengers
              return acc
            }, 0)}
          </p>
        </ul>
        <Checkout
          amount={this.props.tripsArr.reduce((acc, cur) => {
            acc = acc + cur.cost * cur.numPassengers
            return acc
          }, 0)}
          order={this.props.order}
          completeOrder={this.props.completeOrder}
          clearedTrips={this.props.clearedTrips}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tripsArr: state.trip.trips,
    order: state.order.activeOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeOrder: order => dispatch(completeOrder(order)),
    clearedTrips: () => dispatch(clearedTrips())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
