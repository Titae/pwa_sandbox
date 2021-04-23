import React, { useState, useRef, useEffect } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const { user, signin } = useAuth()
  const history = useHistory()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    signin(emailRef.current.value, passwordRef.current.value).catch(() => {
      setError("Failed to log in")
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (history && user) {
      history.push("/")
    }
  }, [user, history])
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", width: "100vw"}}>
      <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
          <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
              <Button type="submit" disabled={loading} className="w-100">Log In</Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/reset-password">Forgot password ?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account ? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login