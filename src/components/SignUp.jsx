import React, { useState, useRef } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
  const { currentUser, signup } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmationRef = useRef()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== confirmationRef.current.value) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    signup(emailRef.current.value, passwordRef.current.value).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.error(error)
      setError(error.message)
    }).finally(() => {
      setLoading(false)
    })
  }
  
  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required ref={emailRef}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required ref={passwordRef}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password confirmation</Form.Label>
            <Form.Control type="password" required ref={confirmationRef}/>
          </Form.Group>
          <Button type="submit" disabled={loading}>Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SignUp
