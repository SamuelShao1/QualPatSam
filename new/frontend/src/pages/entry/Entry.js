import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import SignUp from './SignUp';
import HeaderBar from "../../components/HeaderBar";
import '../../App.css';
import Login from "./Login";

const Entry = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("./profile");
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    }

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            console.log("gerwwe");

            await signInWithPopup(auth, provider);
            navigate("./profile");
        } catch (error) {
            console.log("gere");
            setNotice("Failed to sign in with Google: " + error.message);
        }
    };

    return(
    <div className="relative h-screen w-screen pb-[15vh] overflow-hidden no-scroll">
        <HeaderBar className=''/>
        <div className = "h-screen w-screen">
            <div className = "flex items-center justify-center">
            <form className = "shadow-lg rounded-3xl border pt-[10vh] px-[10vh] pb-[8vh] bg-white">
                <Routes className='relative z-10'>
                    <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<SignUp />} />
                </Routes>
            </form>
            </div>
        </div>
           

        
    </div>
    )
}

export default Entry