import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ component: Component, ...props }) => {
  const { currentUser } = useAuth()
  return (
    <Route {...props} render={(props) => {
      return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
    }}>
    </Route>
  )
}

export default PrivateRoute