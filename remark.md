# 手写一个redux

## redux与react无关
redux是一种数据管理架构，跟react无关

## 从react的context说起
在一个应用中，比如主题颜色这里的状态，因为所有子组件都要拿到，所以往往会提升到根组件。但是，状态提升之后还是要一层一层的props传递下去。如果组件的层级比较深的话，维护会变得非常的麻烦。那么，就需要一个方案，让所所有的组件都能拿到，不用一层层的手动传递。

## 提高修改数据的门槛
app的数据在被多个函数调用之后，可能会发生意想不到的变化。需要提高修改数据的门槛，专门用一个函数来修改数据，也只能用这个函数来修改数据。这个函数叫`dispatch`,`dispatch`接收一个对象作为参数，这个对象用于明确改变方式和转递payload，叫`action`

## 抽象dispatch
将state和dispath抽象，放在一个`store`里。使用`createStore()`返回一个`store`，用三个函数`getState()`,`dispatch()`,`subscribe()`三个函数，分别用于返回state，修改state和监听state的修改并调用回调。
- `getState`：获取state
- `dispatch`：**约定的**改变state的**唯一**方法
- `subscribe`：监听dispatch，调用回调

```js
function createStore(reducer) {
  let state = null
  const listeners = []
  const getState = () => state;
  const subscribe = (listener) => listeners.push(listener) // 收集监听回调
  const dispatch = action => {
    state = reducer(action) // 只能通过dispatch改变state，改变逻辑写在reducer
    listeners.forEach(listener => listener()) // state改变，调用回调
  }
  dispatch() // 初始化state
}
```