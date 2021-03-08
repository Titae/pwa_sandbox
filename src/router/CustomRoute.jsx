import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const CustomRoute = ({ component: Component, pub, ...props }) => {
  const { currentUser } = useAuth()
  return (
    <Route {...props} render={(props) => {
      if (!pub) {
        return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
      } else {
        return currentUser ? <Redirect to="/"/> : <Component {...props} />
      }
    }}>
    </Route>
  )
}

export default CustomRoute