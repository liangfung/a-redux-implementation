import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'

function createStore(reducer) {
  let state;
  let listeners = []
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  const subscribe = listener => {
    listeners.push(listener)
  }
  dispatch({})
  return {
    getState,
    dispatch,
    subscribe
  }
}

const themeReducer = (state, action) => {
  const initialState = {
    themeColor: 'red'
  }
  if (!state) {
    return initialState;
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        themeColor: action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)
class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      themeColor: 'red'
    }
  }

  getChildContext() {
    return { store }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
