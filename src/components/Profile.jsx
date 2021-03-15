import React from 'react'
import { Card, Button, Image } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user, logout } = useAuth()
  console.log(user)
  return (
    <Card className="w-100" style={{ maxWidth: "400px"}}>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        <Image src={user.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} roundedCircle />
        <h4 className="text-center mb-2">{user.displayName}</h4>
        <Button onClick={logout} className="w-100">Logout</Button>
      </Card.Body>
    </Card>
  )
}

export default Profile