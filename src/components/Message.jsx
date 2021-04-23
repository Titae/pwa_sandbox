import React, { useState, useEffect } from 'react'

import { useAuth } from '../contexts/AuthContext'
import { storageRef } from '../firebase'
import styles from './Message.module.css'

const Message = ({msg}) => {
    const { user } = useAuth()
    const [images, setImages] = useState([])

    useEffect(() => {
        
        const loadImages = async () => {
            for (let id of msg.imageIds) {
                const url = await storageRef.child(id + '.jpg').getDownloadURL()
                setImages(prev => ([...prev, url]))
            }
        }

        loadImages()
    }, [])

    return <div className={`d-flex flex-column align-items-${msg.uid === user.uid ? "end" : "start"} p-2 m-2 ${styles.msg}`}>
        <label>
            {msg.displayName}
        </label>
        <span>
            {msg.text}
            <br/>
            {images.map(url => <img className={"p-2"} alt="message" key={url} src={url} height="125px" width="200px"></img>)}
        </span>
    </div>
}

export default Message