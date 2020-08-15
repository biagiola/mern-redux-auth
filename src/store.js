import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

function loadToLocalStorage(state) {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch(e) {
    return undefined
  }
}

const persistedState = loadToLocalStorage()

const initialState = {
  
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  //persistedState,
  initialState,
  compose(
    applyMiddleware(...middleware),
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
, {});

store.subscribe( () => saveToLocalStorage(store.getState()))

export default store
