import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getOrdersByUser} from '../store'
import axios from 'axios'

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    console.log('IN COMPONENT DID MOUNT, userid:', this.props.userId)
    const {data} = await axios.get(`/api/user/${this.props.userId}`)
    console.log(data)
    const orders = data.orders

    const attachTrips = async order => {
      const {data} = await axios.get(`/api/order/${order.id}`)
      order.tripList = data
    }

    for (let i = 0; i < orders.length; i++) {
      await attachTrips(orders[i])
    }
    this.setState({orders})
  }

  render() {
    console.log(this.state.orders)
    return (
      <div>
        <h3 className="title">Your Order History</h3>
        <ul>
          {this.state.orders[0] ? (
            this.state.orders.map(order => {
              return (
                <div key={order.id}>
                  <h3>Order Number: {order.id}</h3>
                  <h4>Trips Booked: {order.tripList.length}</h4>
                  <hr />
                  {order.tripList.map(trip => {
                    return (
                      <div>
                        <div className="orderHistoryFlexBox">
                          <div>
                            <img
                              className="smallPic"
                              src={trip.destination.imageURL}
                            />
                          </div>
                          <div>
                            <h5>Destination: {trip.destination.name}</h5>
                            <h5>Passengers: {trip.numPassengers}</h5>
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  })}
                  <span />
                  <span>
                    Total: ${order.tripList.reduce((acc, cur) => {
                      acc = acc + cur.destination.cost * cur.numPassengers
                      return acc
                    }, 0)}
                  </span>
                  <hr noshade="noshade" />
                </div>
              )
            })
          ) : (
            <h3 />
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export default withRouter(connect(mapStateToProps)(OrderHistory))
