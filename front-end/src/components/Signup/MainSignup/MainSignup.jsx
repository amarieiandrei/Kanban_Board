import React from 'react'
import './MainSignup.css'
import { useState } from 'react'
import { createUser } from '../../../network/request'
import { MdVerifiedUser } from 'react-icons/md'
import { BsPatchExclamationFill } from 'react-icons/bs'

export const MainSignup = () => {
  const nameId = document.getElementById('name')
  const usernameId = document.getElementById('uname')
  const emailId = document.getElementById('email')
  const passwordId = document.getElementById('psw')

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function checkInputs() {
    let validation = 'true'

    if (name === '') {
      // show error
      // add error class
      setErrorFor(nameId, 'Name cannot be blank')
      validation = 'false'
    } else {
      // add success class
      setSuccessFor(nameId)
    }

    if (username === '') {
      setErrorFor(usernameId, 'Username cannot be blank')
      validation = 'false'
    } else if (!isUsername(username)) {
      setErrorFor(usernameId, 'Username does not match')
      validation = 'false'
    } else {
      setSuccessFor(usernameId)
    }

    if (email === '') {
      setErrorFor(emailId, 'Email cannot be blank')
      validation = 'false'
    } else if (!isEmail(email)) {
      setErrorFor(emailId, 'Email is not valid')
      validation = 'false'
    } else {
      setSuccessFor(emailId)
    }

    if (password === '') {
      setErrorFor(passwordId, 'Password cannot be blank')
      validation = 'false'
    } else {
      setSuccessFor(passwordId)
    }
    return validation
  }

  function isUsername(username) {
    return /^[a-z][a-z0-9_.]*$/.test(username)
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    // add error message inside small
    small.innerText = message

    // add error class
    formControl.className = 'FormControl error'
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement
    formControl.className = 'FormControl success'
  }

  const handleClick = async e => {
    // e.preventDefault();
    if (name !== '' || username !== '' || email !== '' || password !== '') {
      const validation = checkInputs()

      if (validation === 'false') {
        e.preventDefault()
      } else {
        const user = {
          name,
          username,
          email,
          password
        }
        await createUser(user)
        nameId.value = ''
        usernameId.value = ''
        emailId.value = ''
        passwordId.value = ''

        // setName('');
        // setUsername('');
        // setEmail('');
        // setPassword('');
      }
    } else {
      alert('ALL THE FORM SIGNUP FIELDS ARE EMPTY !')
      e.preventDefault()
      const validation = checkInputs()
    }
  }

  // const [loggedUser, setLoggedUser] = useState({})

  // const handleClick = () => {
  //     const user = { name, username, email, password }
  //     console.log(user)
  //     createUser(user).then(data => {
  //         setLoggedUser(data)
  //         console.log(data)
  //     })
  // }

  return (
    <div className="MainSignup">
      <div className="Auth">
        <h2>Sign up to MyTaskManager</h2>
        <div className="AuthGoogle">Înscrieți-vă cu Google</div>
        <div className="FlexBox">
          <div className="LineBefore"></div>
          <div className="Divider">Or</div>
          <div className="LineAfter"></div>
        </div>
        <div className="AuthSignupForm">
          <div className="formFields" id="form">
            <div className="FlexBox">
              <fieldset className="FormControl">
                <label htmlFor="name">Name</label>
                <input
                  onChange={e => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="TextInput NameUsername"
                />
                <MdVerifiedUser className="MdVerifiedUserFlexBox" />
                <BsPatchExclamationFill className="BsPatchExclamationFillFlexBox" />
                <small></small>
              </fieldset>
              <fieldset className="FormControl">
                <label htmlFor="username">Username</label>
                <input
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  id="uname"
                  className="TextInput NameUsername"
                />
                <MdVerifiedUser className="MdVerifiedUserFlexBox" />
                <BsPatchExclamationFill className="BsPatchExclamationFillFlexBox" />
                <small></small>
              </fieldset>
            </div>
            <fieldset className="FormControl">
              <label htmlFor="email">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
                className="TextInput Email"
              />
              <MdVerifiedUser className="MdVerifiedUser" />
              <BsPatchExclamationFill className="BsPatchExclamationFill" />
              <small></small>
            </fieldset>
            <fieldset className="FormControl">
              <label htmlFor="password">Password</label>
              <input
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="6+ characters"
                name="password"
                id="psw"
                className="TextInput"
              />
              <MdVerifiedUser className="MdVerifiedUser" />
              <BsPatchExclamationFill className="BsPatchExclamationFill" />
              <small></small>
            </fieldset>
          </div>
          <a href="http://localhost:3000/signin">
            <button onClick={handleClick} className="formCreate">
              Create Account
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainSignup
