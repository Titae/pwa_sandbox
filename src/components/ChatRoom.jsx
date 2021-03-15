import React, { useState, useEffect, useRef } from 'react'
import { Container, Form, Button, InputGroup, FormFile } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import firebase, { firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import Message from './Message'

const ChatRoom = () => {
  const { user } = useAuth()
  const [message, setMessage] = useState("")

  const collection = firestore.collection("messages")
  const [limit, setLimit] = useState(50)
  const [messages, setMessages] = useState([])
  const endRef = useRef(null)

  console.log(firestore)

  useEffect(() => {
    const unsubscribe = collection.orderBy("createdAt", "desc").limit(limit).onSnapshot((res) => {
      setMessages(res.docs.map(doc => doc.data()).reverse())
    })
    return unsubscribe
  }, [limit])

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { uid, photoURL, displayName } = user
    if (message.length <= 0) {
      return
    }
    collection.add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    }).then(() => {
      setMessage("")
    })
  }

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLimit(prev => prev + 50)
    }
  }

  return (
    <Container fluid className="align-self-stretch justify-self-stretch d-flex flex-column-reverse justify-content-start p-0 m-0">
      <Form className="w-100" onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." value={message}/>
          <InputGroup.Append>
            {/* <Form.File onChange={(e) => console.log(e)} accept="image/x-png,image/jpeg,image/gif"/> */}
            <Button disabled={message.length === 0}>
              <Icon icon="paper-plane"></Icon>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <div className="overflow-auto" onScroll={handleScroll}>
        {messages && messages.map(msg => <Message key={msg.createdAt} msg={msg}></Message>)}
        <div ref={endRef}></div>
      </div>
    </Container>
  )
}

export default ChatRoom