import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchSingleDestination} from '../store/destination'

//Component
class DestinationPage extends Component {
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
        <button type="submit">Add to Cart</button>{' '}
        {/* ^^might need to modify */}
      </div>
    )
  }
}

//Container
const mapStateToProps = state => {
  return {
    name: state.destination.singleDestination.name,
    imageURL: state.destination.singleDestination.imageURL,
    cost: state.destination.singleDestination.cost,
    timePeriod: state.destination.singleDestination.timePeriod,
    description: state.destination.singleDestination.description
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleDestination: id => dispatch(fetchSingleDestination(id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DestinationPage)
)
