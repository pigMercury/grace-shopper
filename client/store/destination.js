import axios from 'axios'

//action types
export const GOT_DESTINATIONS = 'GOT_DESTINATIONS'
export const GOT_SINGLE_DESTINATION = 'GOT_SINGLE_DESTINATION'

//action creators
export const gotDestinations = destinations => {
  return {
    type: GOT_DESTINATIONS,
    destinations
  }
}

export const gotSingleDestination = singleDestination => {
  return {
    type: GOT_SINGLE_DESTINATION,
    singleDestination
  }
}

//thunk creators
export const fetchDestinations = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/destination')
    dispatch(gotDestinations(data))
  }
}

export const fetchSingleDestination = destinationId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/destination/${destinationId}`)
    dispatch(gotSingleDestination(data))
  }
}

const initialState = {
  destinations: [], //array of all destination objects
  singleDestination: {} //single destination object
}

const destination = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case GOT_DESTINATIONS:
      newState.destinations = action.destinations
      return newState
    case GOT_SINGLE_DESTINATION:
      newState.singleDestination = action.singleDestination
      return newState
    default:
      return state
  }
}

export default destination
