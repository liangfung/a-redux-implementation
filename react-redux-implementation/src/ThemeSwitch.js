import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object
  }
  
  state = {
    themeColor: ''
  }

  componentDidMount() {
    console.log('mounted')
    const { store } = this.context
    this._updateThemeColor()
    store.subscribe(this._updateThemeColor)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('updated')
  } 
  
  _updateThemeColor = () => {
    const store = this.context.store
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  handleSwitchColor = color => {
    const { dispatch } = this.context.store
    dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }

  render() {
    console.log('render')
    return (
      <div>
        <button style={{ color: this.state.themeColor }} onClick={()=>{this.handleSwitchColor('blue')}}>蓝色</button>
        <button style={{ color: this.state.themeColor }} onClick={()=>{this.handleSwitchColor('red')}}>红色</button>
      </div> 
    )
  }
}

export default ThemeSwitch;