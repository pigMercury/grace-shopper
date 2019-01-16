/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createOrder} from '../store/order'
import {createTrip} from '../store/trip'
import {withAlert} from 'react-alert'

//Component
export class OneDestination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPassengers: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      numPassengers: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (!this.props.activeOrder.id) {
      await this.props.createOrder(this.props.userId)
    }
    await this.props.createTrip({
      orderId: this.props.activeOrder.id,
      destinationId: this.props.dest.id,
      numPassengers: this.state.numPassengers
    })
    this.props.alert.show('Item added to cart')
  }

  render() {
    return (
      <div className="flex-item">
        <NavLink to={`/destination/${this.props.dest.id}`}>
          <h4>{this.props.dest.name}</h4>
          <img className="thumbnail" src={this.props.dest.imageURL} />
        </NavLink>
        <br />
        <h5>${this.props.dest.cost}</h5>
        <input
          placeholder="1"
          id="quantity"
          type="number"
          min="1"
          max="20"
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeOrder: state.order.activeOrder,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: userId => dispatch(createOrder(userId)),
    createTrip: tripObj => dispatch(createTrip(tripObj))
  }
}

export default withAlert(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(OneDestination))
)
