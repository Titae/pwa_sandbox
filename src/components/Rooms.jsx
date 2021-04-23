import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Modal, Container, Row, Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import firebase, { firestore } from '../firebase'


const Rooms = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [rooms, setRooms] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
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
        <Container fluid className="m-0 p-0 align-self-stretch d-flex flex-column justify-content-start fill">
            {rooms.map(room => <Row key={room.id} onClick={() => history.push(`/room/${room.id}`)} className="btn text-left m-0 py-1 pb-2 border-bottom">{room.title}</Row>)}
            <Button type="button" className="btn" variant="outline-primary" onClick={() => setShowModal(true)}>
                <Icon icon="plus"></Icon>
            </Button>
                <Modal show={showModal} onHide={() => setTitle("")}>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            New Chat Room
                        </Modal.Header>
                        <Modal.Body>
                                <Form.Control onChange={(e) => setTitle(e.target.value)} placeholder="Room title" value={title} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" variant="outline-secondary" onClick={() => {setShowModal(false); setTitle("")}}>Cancel</Button>
                            <Button type="submit">Ok</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
        </Container>
    )
}

export default Rooms