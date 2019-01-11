import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import destination from './destination'
import order from './order'
import trip from './trip'
import user from './user' // pretty sure we'll be deleting this, but

const rootReducer = combineReducers({
  destination,
  order,
  trip,
  user
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
export * from './destination'
export * from './order'
export * from './trip'
