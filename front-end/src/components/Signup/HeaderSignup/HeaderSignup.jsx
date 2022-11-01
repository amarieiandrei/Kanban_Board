import React, { Component } from 'react'
import './HeaderSignup.css'

class HeaderSignup extends Component {
  render() {
    return (
      <div className="HeaderSignup">
        <span className="span">Already a member? </span>
        <a href="http://localhost:3000/signin" className="HeaderLink">
          Sign in
        </a>
      </div>
    )
  }
}

export default HeaderSignup
