import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <span className="span">Not a member? </span>
        <a href="http://localhost:3000/signup" className="HeaderLink">
          Sign up now
        </a>
      </div>
    )
  }
}

export default Header
