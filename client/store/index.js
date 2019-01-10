import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import destinationReducer from './destination'
import user from './user' // pretty sure we'll be deleting this, but

const rootReducer = combineReducers({
  destinationReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user' // again, probly going to delete this when we get to users
export * from './destination'
