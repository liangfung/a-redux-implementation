import React from 'react';
import PropTypes from 'prop-types'

export const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  class Connect extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }

    state = {
      allProps: {}
    }

    componentDidMount() {
      const { store } = this.context
      this._updateProps() // 初始化allprops

      // subscribe,一旦应用中某组件使用到了store.dispatch(action)
      // store会遍历listeners并执行，这里是会执行_updateProps
      store.subscribe(() => { this._updateProps() })
    }

    _updateProps() {
      const { store } = this.context
      const stateProps =  mapStateToProps
        ? mapStateToProps(store.getState())
        : {}
      const dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch)
        : {}
      this.setState(
        {
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props
          }
        }
      )
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />
    }
  }

  return Connect
}

export class Provider extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }
  
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return { store: this.props.store }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>  
    )
  }
}