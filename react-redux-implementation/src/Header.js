import React, { Component } from 'react';
import { connect } from './react-redux'

// class Header extends Component {
//   static contextTypes = {
//     store: PropTypes.object
//   }
//   state = { themeColor: '' }

//   componentDidMount() {
//     const { store } = this.context
//     this._updateThemeColor()
//     store.subscribe(()=>{this._updateThemeColor()})
//   }

//   _updateThemeColor() {
//     const { store } = this.context
//     const state = store.getState()
//     this.setState({ themeColor: state.themeColor })
//   }

//   render() {
//     console.log('render', + new Date())
//     return (
//       <div>
//         <h1 style={{ color: this.state.themeColor }}>header</h1>
//       </div>
//     )
//   }
// }

function Header(props) {
  return (
    <div>
      <h1 style={{ color: props.themeColor }}>header</h1>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    themeColor: state.themeColor
  }
}

export default connect(mapStateToProps)(Header)