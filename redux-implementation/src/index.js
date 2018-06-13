function createStore(reducer) {
  let state = null
  const listeners = []
  const getState = () => state; // 返回state
  // 每次dispatch之后，数据变化，要重新render DOM,所以加个subscribe函数，可以手动监听dispatch
  const subscribe = listener => listeners.push(listener)
  const dispatch = action => { // dispatch函数接收action，作为payload传递
    state = reducer(state, action); // dispatch，改变数据的唯一方法,需要在createStore的时候传入回调
    listeners.forEach(listener => listener())
  }
  dispatch({}) // 由于初始state放在reducer里，需要在createStore的时候初始化state
  return {
    getState,
    dispatch,
    subscribe
  }
}

function reducer(state, action) {
  if (!state) {
    return {
      title: {
        text: '再造一个redux',
        color: 'red'
      },
      content: {
        text: 'content',
        color: 'blue'
      }
    }
  }
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

const store = createStore(reducer)
let oldState = store.getState();  // 缓存旧的state
renderApp(store.getState());  // 首次渲染
store.subscribe(()=>console.log(1))
store.subscribe(()=>{
  const newState = store.getState()
  renderApp(newState, oldState) // 监听，dispatch之后重新渲染
  oldState = newState // 更新缓存
}); // 监听dispatch,如果dispatch了，就是state改变了，就执行回调。这里的回调是renderApp
setTimeout(()=>{store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '修改好了'})},1500) // dispatch,改变数据
setTimeout(()=>{store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '再改一次'})},3000)