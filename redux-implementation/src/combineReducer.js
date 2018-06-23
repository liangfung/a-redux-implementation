const combineReducer = (reducers) => { // combineReducer的参数，{reducerA, reducerB, ...rest}
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],  // reducer的参数state
        action       // reducer的参数action
      );
      return nextState;
    }, {})
  }
}