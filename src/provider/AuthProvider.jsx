import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const google = () => {
        return signInWithPopup(auth, provider);
    }

    const forUpdateProfile = (Dname, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: Dname, photoURL: photo
        }).then(() => {
            setUser({ ...auth.currentUser });
        });
    }

    const authData = {
        user,
        setUser,
        createUser,
        userLogin,
        google,
        forUpdateProfile,
        loading,
        setLoading,
    };

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;