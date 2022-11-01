import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Signin } from '../components/Signin/Signin'
import { Signup } from '../components/Signup/Signup'
import { TaskManager } from '../components/TaskManager/TaskManager'

import AuthApi from '../utils/AuthApi'

function routes() {
  return (
    <Routes>
      <Route element={<RouteRegistration />}>
        <Route element={<Signup />} path="/" exact />
        <Route element={<Signin />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
      </Route>
      <Route element={<RouteProtected />}>
        <Route element={<TaskManager />} path="/taskmanager" />
      </Route>
    </Routes>
  )
}

const RouteRegistration = () => {
  const authApi = React.useContext(AuthApi)
  return !authApi.auth ? <Outlet /> : <Navigate to="/taskmanager" />
}

const RouteProtected = () => {
  const authApi = React.useContext(AuthApi)
  return authApi.auth ? <Outlet /> : <Navigate to="/signin" />
}

export default routes
