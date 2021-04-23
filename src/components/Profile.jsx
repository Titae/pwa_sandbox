import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Button, Image, Row, Col } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user, logout } = useAuth()
  const history = useHistory()
  return (
    <Container fluid className="fill">
      <Row>
        <Col sm={4}>
          <Image src={user.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} roundedCircle className="m-2"/>
        </Col>
        <Col sm={8} className="d-flex flex-column justify-content-center align-items-center">
          <h2>{user.displayName}</h2>
        </Col>
      </Row>
      <Row>
        <Button onClick={logout}>Logout</Button>
      </Row>
    </Container>
  )
}

export default Profile