import React from 'react'

import { useAuth } from '../contexts/AuthContext'
import styles from './Message.module.css'

const Message = ({msg}) => {
    const { user } = useAuth()

    return <div className={`d-flex flex-column align-items-${msg.uid === user.uid ? "end" : "start"} p-2 m-2 ${styles.msg}`}>
        <label>
            {msg.displayName}
        </label>
        <span>
            {msg.text}
        </span>
    </div>
}

export default Message