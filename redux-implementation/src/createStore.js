const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {  // unsubscribe function
      listeners = listeners.filter(l => l !== listener)
    }
  }

  dispatch({}) // **初始化state**,(initialState写在reducer里面，default)

  return {
    getState,
    dispatch,
    subscribe
  }
}