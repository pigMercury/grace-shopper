import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import persistentStore from './store'
import App from './app'
import {PersistGate} from 'redux-persist/integration/react'

console.log(persistentStore)

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={persistentStore.store}>
    <PersistGate loading={null} persistor={persistentStore.persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
