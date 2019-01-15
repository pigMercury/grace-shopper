import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {completeOrder} from '../store'

const CURRENCY = 'USD'

const fromDollarToCent = amount => amount * 100

const successPayment = (data, order) => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = amount => token =>
  axios
    .post('api/payment', {
      stripeToken: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({amount, order}) => (
  <StripeCheckout
    amount={fromDollarToCent(amount)}
    token={onToken(amount)}
    currency={CURRENCY}
    stripeKey="pk_test_LCiwJx3PAH7HyEGgtNYPiJ8N"
    order={order}
  />
)

export default Checkout
