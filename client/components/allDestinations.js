import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchDestinations} from '../store/destination'
import OneDestination from './oneDestination'

//Component
class AllDestinations extends Component {
  componentDidMount() {
    this.props.fetchDestinations()
  }

  render() {
    return (
      <div>
        <h3 className="title">Destinations</h3>
        <ul className="destinationsList">
          {this.props.destinationArr.map(dest => {
            return <OneDestination dest={dest} key={dest.id} />
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
