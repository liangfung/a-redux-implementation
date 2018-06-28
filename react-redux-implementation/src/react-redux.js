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
      store.subscribe(()=>{this.render()})
    }

    render() {
      const states = mapStateToProps(this.context.store.getState())
      return <WrappedComponent {...states} />
    }
  }

  return Connect
}