import React from 'react'
import { Card, Button } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { currentUser, logout } = useAuth()
  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        <Button onClick={logout} className="w-100">Logout</Button>
      </Card.Body>
    </Card>
  )
}

export default Profile