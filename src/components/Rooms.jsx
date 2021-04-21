import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import firebase, { firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'


const Rooms = () => {
    const { user } = useAuth()
    const history = useHistory()
    const [title, setTitle] = useState("")

    const collection = firestore.collection("rooms")
    const [rooms, setRooms] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        collection.add({
            title,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((doc) => {
            history.push(`/room/${doc.id}`)
        })
    }

    useEffect(() => {
        const unsubscribe = collection.orderBy("updatedAt", "desc").onSnapshot((res) => {
            setRooms(res.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return unsubscribe
    }, [])


    return (
        <div>
            {rooms.map(room => <Link key={room.id} to={`/room/${room.id}`}>{room.title}</Link>)}
            <Form className="w-100" onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control onChange={(e) => setTitle(e.target.value)} placeholder="Conversation name" value={title} />
                    <InputGroup.Append>
                        {/* <Form.File onChange={(e) => console.log(e)} accept="image/x-png,image/jpeg,image/gif"/> */}
                        <Button disabled={title.length === 0}>
                            <Icon icon="paper-plane"></Icon>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>
    )
}

export default Rooms