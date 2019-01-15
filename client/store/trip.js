import axios from 'axios'

//actions
export const CREATED_TRIP = 'CREATED_TRIP'
export const DELETED_TRIP = 'DELETED_TRIP'
export const CHANGED_NUM_PASSENGERS = 'CHANGED_NUM_PASSENGERS'
export const CLEARED_TRIPS = 'CLEARED_TRIPS'

//action creators
export const createdTrip = trip => {
  console.log('IN CREATED TRIP ACTION CREATOR')
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

export const clearedTrips = () => {
  return {
    type: CLEARED_TRIPS
  }
}

//thunk creators
export const createTrip = trip => {
  return async dispatch => {
    const {data} = await axios.post('/api/trip', trip)
    dispatch(createdTrip(data))
  }
}

export const deleteTrip = id => {
  return async dispatch => {
    await axios.delete(`/api/trip/${id}`)
    dispatch(deletedTrip(id))
  }
}

export const changeNumPassengers = trip => {
  return async dispatch => {
    const {data} = await axios.put(`/api/trip/${trip.id}`, trip)
    dispatch(changedNumPassengers(data))
  }
}

const initialState = {
  trips: []
}

const trip = (state = initialState, action) => {
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
    case CHANGED_NUM_PASSENGERS:
      newTrips.map(trip => {
        if (trip.id === action.trip.id) {
          trip.numPassengers = action.trip.numPassengers
        }
      })
      newState.trips = newTrips
      return newState
    case CLEARED_TRIPS:
      newState.trips = []
      return newState
    default:
      return state
  }
}

export default trip
