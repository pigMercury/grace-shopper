import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
// import {completeOrder} from '../store'

const CURRENCY = 'USD'

const fromDollarToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, completeOrder, clearedTrips, order) => token =>
  axios
    .post('api/payment', {
      stripeToken: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(data => {
      successPayment(data)
      console.log(order)
      console.log(completeOrder)
      order.completed = true
      completeOrder(order)
      clearedTrips()
    })
    .catch(err => {
      console.log(err)
      errorPayment()
    })

const Checkout = ({amount, order, completeOrder, clearedTrips}) => (
  <StripeCheckout
    amount={fromDollarToCent(amount)}
    token={onToken(amount, completeOrder, clearedTrips, order)}
    currency={CURRENCY}
    stripeKey="pk_test_LCiwJx3PAH7HyEGgtNYPiJ8N"
    order={order}
    completeOrder={completeOrder}
    clearedTrips={clearedTrips}
  />
)

export default Checkout
