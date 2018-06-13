const appState = {
  title: {
    text: '再造一个redux',
    color: 'red'
  },
  content: {
    text: 'content',
    color: 'blue'
  }
}

function createStore(state, stateChanger) {
  const listeners = []
  const getState = () => state; // 返回state
  // 每次dispatch之后，数据变化，要重新render DOM,所以加个subscribe函数，可以手动监听dispatch
  const subscribe = listener => listeners.push(listener)
  const dispatch = action => {
    state = stateChanger(state, action); // dispatch，改变数据的唯一方法
    listeners.forEach(listener => listener())
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

function stateChanger(state, action) {
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state;
  }
}


function renderApp(newState, oldState = {}) {
  if (newState === oldState) return;
  console.log('render app...')
  renderTitle(newState.title, oldState.title);
  renderContent(newState.content, oldState.content);
}

function renderTitle(title, oldTitle = {}) {
  if (title === oldTitle) return;
  console.log('render title...')
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;
}

function renderContent(content, oldContent = {}) {
  if (content === oldContent) return;
  console.log('render content...')
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = content.text;
  contentDOM.innerHTML = content.color;
}

const store = createStore(appState, stateChanger)
let oldState = store.getState();
renderApp(store.getState());
store.subscribe(()=>console.log(1))
store.subscribe(()=>{
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
}); // 监听dispatch,如果dispatch了，就是state改变了，就执行回调。这里的回调是renderApp
setTimeout(()=>{store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '修改好了'})},1500)
setTimeout(()=>{store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '再改一次'})},3000)