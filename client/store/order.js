import axios from 'axios'

//action types
export const CREATED_ORDER = 'CREATED_ORDER'
export const CREATED_TRIP = 'CREATED_TRIP'
export const DELETED_TRIP = 'DELETED_TRIP'
export const CHANGED_NUM_PASSENGERS = 'CHANGED_NUM_PASSENGERS'
export const COMPLETED_ORDER = 'COMPLETED_ORDER'

//action creators
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

//initial state
const initialState = {
  trips: [],
  activeOrder: {}
}

const orderReducer = (state = initialState, action) => {
  const newState = {...state}
  let newTrips = [...state.trips]

  switch (action.type) {
    case CREATED_TRIP:
      newTrips.push(action.trip)
      newState.trips = newTrips
      return newState
    case DELETED_TRIP:
      newTrips = newTrips.filter(trip => trip.id !== action.id)
      newState.trips = newTrips
      return newState
    default:
      return state
  }
}

export default orderReducer
