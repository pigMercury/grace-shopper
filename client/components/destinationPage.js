import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {fetchSingleDestination, fetchDestinations} from '../store/destination'

import {createOrder} from '../store/order'
import {createTrip} from '../store/trip'

import Carousel from './carousel'

import {withAlert} from 'react-alert'

//Component
class DestinationPage extends Component {
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
      destinationId: this.props.match.params.id,
      numPassengers: this.state.numPassengers
    })
    this.props.alert.show('Item added to cart')
  }

  componentDidMount() {
    this.props.fetchSingleDestination(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    const latest = this.props.match.params.id
    const prev = prevProps.match.params.id

    console.log('prev', prev)
    console.log('latest', latest)
    if (latest !== prev) {
      console.log('in didupdate')
      this.props.fetchSingleDestination(latest)
    }
  }

  render() {
    const destId = Number(this.props.match.params.id)
    const next = destId % this.props.destinations.length + 1
    const prev = destId <= 1 ? this.props.destinations.length : destId - 1

    const {name, cost, timePeriod, description} = this.props
    const {image2, image3, image4, image5, image6} = this.props
    return (
      <div className="destinationPage">
        <div>
          <NavLink to={`/destination/${prev}`}>Prev</NavLink>
          <br />
          <br />

          <NavLink to={`/destination/${next}`}>Next</NavLink>
        </div>{' '}
        <h3>{name}</h3>
        {/* <img src={imageURL} /> */}
        <Carousel
          image2={image2}
          image3={image3}
          image4={image4}
          image5={image5}
          image6={image6}
        />
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
    cost: state.destination.singleDestination.cost,
    timePeriod: state.destination.singleDestination.timePeriod,
    description: state.destination.singleDestination.description,
    image2: state.destination.singleDestination.image2,
    image3: state.destination.singleDestination.image3,
    image4: state.destination.singleDestination.image4,
    image5: state.destination.singleDestination.image5,
    image6: state.destination.singleDestination.image6,
    activeOrder: state.order.activeOrder,
    userId: state.user.id,
    destinations: state.destination.destinations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDestinations: () => dispatch(fetchDestinations()),
    fetchSingleDestination: id => dispatch(fetchSingleDestination(id)),
    createOrder: userId => dispatch(createOrder(userId)),
    createTrip: tripObj => dispatch(createTrip(tripObj))
  }
}

export default withAlert(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(DestinationPage))
)
