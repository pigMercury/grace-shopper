import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {changeNumPassengers} from '../store/trip'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPassengers: this.props.trip.numPassengers
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(event) {
    this.setState({
      numPassengers: Number(event.target.value)
    })
  }

  async handleUpdate(event) {
    event.preventDefault()
    this.setState({
      numPassengers: Number(event.target.value)
    })
    await this.props.changeNumPassengers({
      ...this.props.trip,
      numPassengers: this.state.numPassengers
    })
    alert('Quantity updated')
  }

  render() {
    const trip = this.props.trip
    return (
      <div>
        <p>Destination: {trip.name}</p>
        <p>
          Quantity:
          <input
            placeholder={this.state.numPassengers}
            id="quantity"
            type="number"
            min="1"
            max="20"
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.handleUpdate}>
            Update quantity
          </button>
          <button type="submit" onClick={this.handleDelete}>
            Delete
          </button>
        </p>
        <p>Cost: ${trip.numPassengers * trip.cost}</p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNumPassengers: tripObj => dispatch(changeNumPassengers(tripObj))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CartItem))

// async handleDelete(event) {
//   event.preventDefault()
//   if (!this.props.activeOrder.id) {
//     await this.props.createOrder(this.props.userId)
//   }
//   await this.props.createTrip({
//     orderId: this.props.activeOrder.id,
//     destinationId: this.props.match.params.id,
//     numPassengers: this.state.numPassengers
//   })
//   alert('Item removed from cart')
// }
