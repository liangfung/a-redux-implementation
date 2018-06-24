const combineReducer = reducers => (state = {}, action) => {// combineReducer的参数如{reducerA, reducerB, ...rest},返回一个新的reducer
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],  // reducer的参数state
        action       // reducer的参数action
      );
      return nextState;
    }, {})
}