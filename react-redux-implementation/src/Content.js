import React, { Component } from 'react';
import ThemeSwitch from './ThemeSwitch'
import PropTypes from 'prop-types'

class Content extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  state = {
    themeColor: 'red'
  }

  componentDidMount() {
    const { store } = this.context
    this._updateThemeColor()
    store.subscribe(this._updateThemeColor)
  }

  _updateThemeColor = () => {
    const store = this.context.store
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  render() {
    return (
      <div style={{ color: this.state.themeColor }}>
        <p>这是内容的部分</p>
        <ThemeSwitch />
      </div>
    )
  }
}

export default Content