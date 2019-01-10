import axios from 'axios'

//action types
export const CREATED_ORDER = 'CREATED_ORDER'
export const CREATED_TRIP = 'CREATED_TRIP'
export const DELETED_TRIP = 'DELETED_TRIP'
export const CHANGED_NUM_PASSENGERS = 'CHANGED_NUM_PASSENGERS'
export const COMPLETED_ORDER = 'COMPLETED_ORDER'

//action creators
export const createdOrder = order => {
  return {
    type: CREATED_ORDER,
    order
  }
}

export const createdTrip = trip => {
  return {
    type: CREATED_TRIP,
    trip
  }
}

export const deletedTrip = id => {
  return {
    type: DELETED_TRIP,
    id
  }
}

export const changedNumPassengers = trip => {
  return {
    type: CHANGED_NUM_PASSENGERS,
    trip
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

export const createTrip = (orderId, destinationId, numPassengers) => {
  return async dispatch => {
    const {data} = await axios.post('/api/order/addTrip', {
      orderId,
      destinationId,
      numPassengers
    })
    dispatch(createdOrder(data))
  }
}

//initial state
const initialState = {
  trips: [],
  activeOrder: {}
}

const orderReducer = (state = initialState, action) => {
  const newState = {...state}
  let newTrips = [...state.trips]

  switch (action.type) {
    case CREATED_ORDER:
      newState.activeOrder = action.order
      return newState
    case CREATED_TRIP:
      newTrips.push(action.trip)
      newState.trips = newTrips
      return newState
    case DELETED_TRIP:
      newTrips = newTrips.filter(trip => trip.id !== action.id)
      newState.trips = newTrips
      return newState
    case CHANGED_NUM_PASSENGERS:
      newTrips.map(trip => {
        if (trip.id === action.trip.id) {
          trip.numPassengers = action.trip.numPassengers
        }
      })
      newState.trips = newTrips
      return newState
    case COMPLETED_ORDER:
      newState.activeOrder = {}
      return newState
    default:
      return state
  }
}

export default orderReducer
