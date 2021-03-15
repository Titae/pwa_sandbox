import React, { useState, useContext, useEffect } from 'react'

import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password, username) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const signin = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const value = {
        user,
        signup,
        signin,
        logout,
        resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}