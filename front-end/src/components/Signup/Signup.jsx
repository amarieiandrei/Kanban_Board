import React, { Component } from 'react'
import { LeftsideSignup } from './LeftsideSignup/LeftsideSignup'
import HeaderSignup from './HeaderSignup/HeaderSignup'
import MainSignup from './MainSignup/MainSignup'
import './Signup.css'

export const Signup = () => {
  return (
    <div className="Signup">
      <div className="left-h">
        <LeftsideSignup />
      </div>
      <div className="right-h">
        <HeaderSignup />
        <MainSignup />
      </div>
    </div>
  )
}
