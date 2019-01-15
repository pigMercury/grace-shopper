import {createStore, combineReducers, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import destination from './destination'
import order from './order'
import trip from './trip'
import user from './user'

const rootReducer = combineReducers({
  destination,
  order,
  trip,
  user
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, middleware)
let persistor = persistStore(store)

export * from './user'
export * from './destination'
export * from './order'
export * from './trip'

export default {store, persistor}
