import React, { useState, useRef } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const SignIn = () => {
  const { currentUser, signin } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    signin(emailRef.current.value, passwordRef.current.value).then((result) => {
      console.log(result)
    }).catch((error) => {
      setError(error.message)
    }).finally(() => {
      setLoading(false)
    })
  }
  
  return (
    <Card>
      <Card.Body>
      <h2 className="text-center mb-4">Sign in</h2>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email : </Form.Label>
            <Form.Control type="email" ref={emailRef}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password : </Form.Label>
            <Form.Control type="password" ref={passwordRef}/>
          </Form.Group>
          <Button type="submit" disabled={loading}>Log In</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SignIn