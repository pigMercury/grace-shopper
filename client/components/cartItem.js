import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {changeNumPassengers, deleteTrip} from '../store/trip'
import {withAlert} from 'react-alert'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPassengers: this.props.trip.numPassengers
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
    this.props.alert.show('Quantity updated')
  }

  async handleDelete(event) {
    event.preventDefault()
    await this.props.deleteTrip(this.props.trip.id)
    this.props.alert.show('Item removed from cart')
  }

  render() {
    const trip = this.props.trip
    return (
      <div id="cart-item">
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
            Update Quantity
          </button>
          <button type="submit" onClick={this.handleDelete}>
            Delete
          </button>
        </p>
        <p>Cost: ${trip.numPassengers * trip.cost}</p>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    numPassengers: state.trip.trips[ownProps.index].numPassengers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNumPassengers: tripObj => dispatch(changeNumPassengers(tripObj)),
    deleteTrip: tripId => dispatch(deleteTrip(tripId))
  }
}

export default withAlert(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem))
)
