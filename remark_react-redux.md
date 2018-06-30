# 手写 react-redux

## 第一步 createStore, 把store挂在context上

- const store = createStore(reducer)
- getChildContext(){ return { store } }
- 在各个组件中，获取store， store = this.context.store,然后getState
- 在各个组件中订阅自定义的update函数，context上的store一旦被dispath，就调用`subscribe`的`listeners`,listeners通常是涉及到让组件重新渲染的

## 第二步 使用 connect 和 mapStateTpProps

- 新建react-redux文件，新建connect函数，该函数接收一个函数`mapStateToProps`,返回一个函数A（**高阶组件**），函数A接收一个WarppedComponent，返回一个新的`class component`
- `mapStateToProps`，顾名思义，将store的state **映射**成我们想要的props，映射的逻辑由函数mapStateToProps完成，然后prop给WrappedComponent
- 在context上的store被dispatch之后，组件view并不会主动的更新，需要subscribe更新view的函数，`_update()`
- connect返回的高阶组件内部需要定义`_update()`函数，store.subscribe(update)后加入listeners，store被dispatch后，触发listeners，及触发update函数，根据`mapStateToProps(this.context.store.getState())`的返回值和高阶组件接受到的props合并成`allProps`,然后`setState(allProps)`，触发render(),视图更新

## 第三步  mapDispatchToProps
用connect包裹了目标组件之后，dispatch还是没有拿到，需要把diapatch也映射到props上.这需要在组件中给connect函数传入一个`mapDispatchToProps(dispatch)`,在connect函数内部，mapDispatchToProps函数会接收到来自context上的store的`dispatch()`函数,自定义传入action

## 第四部  Provider
