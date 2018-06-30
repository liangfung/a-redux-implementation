import React from 'react';
import PropTypes from 'prop-types'

export const connect = mapStateToProps => WrappedComponent => {
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
      const stateProps = mapStateToProps(store.getState())
      this.setState(
        {
          allProps: {
            ...stateProps,
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