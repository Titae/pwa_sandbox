import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Row, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import firebase, { firestore } from '../firebase'


const Rooms = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [rooms, setRooms] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        firestore.collection("rooms").add({
            title,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((doc) => {
            history.push(`/room/${doc.id}`)
        })
    }

    useEffect(() => {
        const unsubscribe = firestore.collection("rooms").orderBy("updatedAt", "desc").onSnapshot((res) => {
            setRooms(res.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return unsubscribe
    }, [])


    return (
        <Container fluid className="m-0 p-0 align-self-stretch d-flex flex-column justify-content-start">
            {rooms.map(room => <Row key={room.id} onClick={() => history.push(`/room/${room.id}`)} className="btn text-left m-0 py-1 pb-2 border-bottom">{room.title}</Row>)}
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
        </Container>
    )
}

export default Rooms