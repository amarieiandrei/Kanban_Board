import React, { useState, useEffect } from 'react'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/Routes'
import AuthApi from './utils/AuthApi'
import { hasSignned } from './network/request'

function App() {
  const [auth, setAuth] = useState(false)

  const readSession = async () => {
    const res = await hasSignned()
    if (res.data.auth) {
      setAuth(true)
    }
  }

  useEffect(() => {
    readSession()
  }, [])

  return (
    <div className="App">
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  )
}

export default App
