import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid';

import firebase, { firestore, storageRef } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import Message from './Message'

const ChatRoom = () => {
  const { user } = useAuth()
  const { roomId } = useParams()
  const [message, setMessage] = useState("")
  const [images, setImages] = useState([])

  const [limit, setLimit] = useState(50)
  const [messages, setMessages] = useState([])
  const camRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    const unsubscribe = firestore.collection("messages").orderBy("createdAt", "desc").where("roomId", "==", roomId).limit(limit).onSnapshot((res) => {
      setMessages(res.docs.map(doc => ({id: doc.id, ...doc.data()})).reverse())
    })
    return unsubscribe
  }, [limit, roomId])

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { uid, photoURL, displayName } = user
    if (message.length <= 0) {
      return
    }
    const metadata = {
      contentType: 'image/jpeg',
    };
    const imageIds = []
    for (let image of images) {
      const id = uuidv4()
      let ref = storageRef.child(id + '.jpg')
      const res = await fetch(image)
      const blob = await res.blob()
      await ref.put(blob, metadata)
      imageIds.push(id)
    }
    firestore.collection("messages").add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
      roomId,
      imageIds,
    }).then(() => {
      setMessage("")
      setImages([])
    })
  }

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLimit(prev => prev + 50)
    }
  }

  const handleFiles = (e) => {
    if (e.target.files.length === 0) {
      return
    }

    var reader = new window.FileReader()
    reader.onloadend = (event) => {
      setImages((prev) => ([...prev, event.target.result]))
    }

    for (let i = 0; i < e.target.files.length; i++) {
      reader.readAsDataURL(e.target.files[i])
    }
  }

  return (
    <Container fluid className="align-self-stretch justify-self-stretch d-flex flex-column-reverse justify-content-start p-0 m-0">
      <Form className="w-100" onSubmit={handleSubmit}>
        {images.map((image, index) => <img alt="upload preview" height="50px" width="50px" key={index} src={image}/>)}
        <InputGroup>
          <Form.Control onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." value={message}/>
          <InputGroup.Append>
            <input type="file" accept="image/jpeg" ref={camRef} className="d-none" capture="environment" onChange={handleFiles}></input>
            <Button onClick={() => camRef.current.click()}>
              <Icon icon="image"></Icon>
            </Button>
            <Button type="submit">
              <Icon icon="paper-plane"></Icon>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <div className="overflow-auto" onScroll={handleScroll}>
        {messages && messages.map(msg => <Message key={msg.id} msg={msg}></Message>)}
        <div ref={endRef}></div>
      </div>
    </Container>
  )
}

export default ChatRoom