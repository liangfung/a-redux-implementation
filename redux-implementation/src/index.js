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
    stateChanger(action); // dispatch，改变数据的唯一方法
    listeners.forEach(listener => listener())
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

function stateChanger(action) {
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break;
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break;
    default:
      break;
  }
}


function renderApp(appState) {
  renderTitle(appState.title);
  renderContent(appState.content);
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;
}

function renderContent(content) {
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = content.text;
  contentDOM.innerHTML = content.color;
}

const store = createStore(appState, stateChanger)

renderApp(store.getState());
store.subscribe(()=>{renderApp(store.getState())}); // 监听dispatch,如果dispatch了，就是state改变了，就执行回调。这里的回调是renderApp
setTimeout(()=>{store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '修改好了'})},1500)
setTimeout(()=>{store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '再改一次'})},3000)