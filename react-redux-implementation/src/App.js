import React, { Component } from 'react';
import Header from './Header'
import Content from './Content'
import { Provider } from './react-redux'
import createStore from './store'

const themeReducer = (state, action) => {
  const initialState = {
    themeColor: 'black'
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
  // static childContextTypes = {
  //   store: PropTypes.object
  // }

  // constructor() {
  //   super()
  //   this.state = {
  //     themeColor: 'red'
  //   }
  // }

  // getChildContext() {
  //   return { store }
  // }

  render() {
    return (
      <Provider store={store}>
        <Header />
        <Content />
      </Provider>
    )
  }
}

export default App;
