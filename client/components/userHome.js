import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HomePage from './homePage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h2 className="login-welcome">Welcome, {email}!</h2>
      <br />
      <HomePage />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
