import React, { useState, useRef } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
  const { signup } = useAuth()
  const emailRef = useRef()
  const displayNameRef = useRef()
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
    setError("")
    setLoading(true)
    signup(emailRef.current.value, passwordRef.current.value).then(({user}) => {
      console.log("signup done, adding diplayName...")
      user.updateProfile({ displayName: displayNameRef.current.value }).then((result) => {
        console.log("displayName updated")
      })
    }).catch((error) => {
      setError("Failed to sign up")
    }).finally(() => {
      setLoading(false)
    })
  }
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", width: "100vw"}}>
      <div className="w-100" style={{maxWidth: "400px"}}>
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
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" required ref={displayNameRef}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required ref={passwordRef}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control type="password" required ref={confirmationRef}/>
              </Form.Group>
              <Button type="submit" disabled={loading} className="w-100">Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account ? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
