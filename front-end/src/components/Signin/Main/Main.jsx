import React, { useState, useContext } from 'react'
import './Main.css'
import AuthApi from '../../../utils/AuthApi'
import { login } from '../../../network/request'

export const Main = () => {
  const emailId = document.getElementById('email')
  const passwordId = document.getElementById('psw')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authApi = React.useContext(AuthApi)

  const handleClick = async e => {
    e.preventDefault()

    const res = await login({ email, password })

    if (res.data.auth) {
      authApi.setAuth(true)
    }

    emailId.value = ''
    passwordId.value = ''
  }

  return (
    <div className="Main">
      <div className="Auth">
        <h2>Sign in to MyTaskManager</h2>
        <div className="AuthGoogle">Conectați-vă cu Google</div>
        <div className="FlexBox">
          <div className="LineBefore"></div>
          <div className="Divider">Or</div>
          <div className="LineAfter"></div>
        </div>
        <div className="AuthSigninForm">
          <div className="formFields">
            <fieldset>
              <label htmlFor="email">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
                className="TextInput"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password" className="password">
                Password
                <a href="" className="ForgotPassword">
                  Forgot password?
                </a>
              </label>
              <input
                onChange={e => setPassword(e.target.value)}
                type="password"
                name="password"
                id="psw"
                className="TextInput"
              />
            </fieldset>
          </div>
        </div>
        <button onClick={handleClick} className="formSub">
          Sign In
        </button>
      </div>
    </div>
  )
}
