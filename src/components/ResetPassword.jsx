import React, { useState, useRef } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const ResetPassword = () => {
  const { resetPassword } = useAuth()
  const emailRef = useRef()
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")
    resetPassword(emailRef.current.value).then((result) => {
      setMessage("Check your inbox for further instructions")
      setLoading(false)
    }).catch((error) => {
      setError("Failed to reset password")
      setLoading(false)
    })
  }

  return (
    <div className="w-100" style={{maxWidth: "400px"}}>
      <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Password Reset</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email : </Form.Label>
              <Form.Control type="email" ref={emailRef}/>
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100">Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account ? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default ResetPassword