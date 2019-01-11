import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {fetchDestinations} from '../store/destination'

//Component
class Cart extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchDestinations() //fetchTripsInCart, make this thunk creator in the order reducer
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h3>Destinations</h3>
        <ul className="destinationsList">
          {this.props.destinationArr.map(dest => {
            dest.url = '/destination/' + dest.id
            console.log(dest.imageURL)
            return (
              <div key={dest.id}>
                <NavLink to={dest.url}>
                  <h4>{dest.name}</h4>
                  <img className="thumbnail" src={dest.imageURL} />
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
}

//Container
const mapStateToProps = state => {
  return {
    destinationArr: state.destination.destinations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDestinations: () => dispatch(fetchDestinations())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllDestinations)
)
