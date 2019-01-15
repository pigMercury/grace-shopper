import axios from 'axios'

//action types
export const CREATED_ORDER = 'CREATED_ORDER'
export const COMPLETED_ORDER = 'COMPLETED_ORDER'

//action creators
export const createdOrder = order => {
  return {
    type: CREATED_ORDER,
    order
  }
}

export const completedOrder = () => {
  return {
    type: COMPLETED_ORDER
  }
}

//thunk creators
export const createOrder = (userId = null) => {
  return async dispatch => {
    const {data} = await axios.post('/api/order', userId)
    dispatch(createdOrder(data))
  }
}

export const completeOrder = order => {
  return async dispatch => {
    const {data} = await axios.put(`/api/order/${order.id}`, order)
    dispatch(completedOrder(data))
  }
}

//initial state
const initialState = {
  activeOrder: {}
}

const order = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case CREATED_ORDER:
      newState.activeOrder = action.order
      return newState
    case COMPLETED_ORDER:
      newState.activeOrder = {}
      return newState
    default:
      return state
  }
}

export default order
