import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getSelectorsByUserAgent } from "react-device-detect";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Setting up auth state listener");

        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log("User from Firebase:", user);

            setCurrentUser(user);
            setLoading(false);
        });
        console.log("Cleaning up auth listener");

        return unsubscribe;
    }, []);

    return(
        <AuthContext.Provider value={{currentUser, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );

};