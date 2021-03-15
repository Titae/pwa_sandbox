import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const CustomRoute = ({ component: Component, pub, ...props }) => {
  const { user } = useAuth()
  return (
    <Route {...props} render={(props) => {
      if (!pub) {
        return user ? <Component {...props}/> : <Redirect to="/login"/>
      } else {
        return user ? <Redirect to="/"/> : <Component {...props} />
      }
    }}>
    </Route>
  )
}

export default CustomRoute