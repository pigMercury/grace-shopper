import axios from 'axios'

//action types
export const GOT_DESTINATIONS = 'GOT_DESTINATIONS'
export const GOT_SINGLE_DESTINATION = 'GOT_SINGLE_DESTINATION'

//action creators
export const gotDestinations = destinations => {
  return {
    type: GOT_DESTINATIONS,
    payload: destinations
  }
}

export const gotSingleDestination = singleDestination => {
  return {
    type: GOT_SINGLE_DESTINATION,
    payload: singleDestination
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
  destinations: [],
  singleDestination: {}
}

const destinationReducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case GOT_DESTINATIONS:
      newState.destinations = action.payload
      return newState
    case GOT_SINGLE_DESTINATION:
      newState.singleDestination = action.payload
      return newState
    default:
      return state
  }
}

export default destinationReducer
