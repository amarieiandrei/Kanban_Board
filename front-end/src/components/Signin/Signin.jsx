import React from 'react'
import { Leftside } from './Leftside/Leftside'
import Header from './Header/Header'
import { Main } from './Main/Main'
import './Signin.css'

export const Signin = () => {
  return (
    <div className="Signin">
      <div className="left-h">
        <Leftside />
      </div>
      <div className="right-h">
        <Header />
        <Main />
      </div>
    </div>
  )
}
