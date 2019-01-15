import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchSingleDestination} from '../store/destination'
import {createOrder} from '../store/order'
import {createTrip} from '../store/trip'

//Component
class DestinationPage extends Component {
  constructor(props) {
    console.log('pp', props)
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
      destinationId: this.props.match.params.id,
      numPassengers: this.state.numPassengers
    })
    alert('Item added to cart')
  }

  componentDidMount() {
    this.props.fetchSingleDestination(this.props.match.params.id)
  }

  render() {
    const {name, imageURL, cost, timePeriod, description} = this.props
    return (
      <div className="destinationPage">
        <h3>{name}</h3>
        <img src={imageURL} />
        <h4>{timePeriod}</h4>
        <p>{description}</p>
        <h6>${cost}</h6>
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
        </button>{' '}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.destination.singleDestination.name,
    imageURL: state.destination.singleDestination.imageURL,
    cost: state.destination.singleDestination.cost,
    timePeriod: state.destination.singleDestination.timePeriod,
    description: state.destination.singleDestination.description,
    activeOrder: state.order.activeOrder,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleDestination: id => dispatch(fetchSingleDestination(id)),
    createOrder: userId => dispatch(createOrder(userId)),
    createTrip: tripObj => dispatch(createTrip(tripObj))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DestinationPage)
)
