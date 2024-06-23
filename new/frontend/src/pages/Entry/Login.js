
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
            await signInWithPopup(auth, provider);
            navigate("./profile");
        } catch (error) {
            console.log("gere");
            setNotice("Failed to sign in with Google: " + error.message);
        }
    };
    return (
        <div className = "">
            <div className = "row justify-content-center">
            <form className = "">
                    { "" !== notice &&
                        <div className="flex justify-center">
                            <div className = "alert alert-warning text-red-500" role = "alert">
                                { notice }    
                            </div>
                        </div>
                    }                  
                     <span className="text-4xl flex justify-center p-2 pb-5">
                        Welcome to 
                        <p className='ml-[.4rem] bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                            QualPat
                        </p>
                    </span>
                    <div className = "form-floating mb-3 flex-col">
                        <label htmlFor = "exampleInputEmail1" className = "block form-label text-xs pb-2 text-brand-300">Email</label>
                        <input type = "email" className = "form-control w-full border rounded-full  px-3 py-2" id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                    </div>
                    <div className = "form-floating mb-3 flex-col">
                        <label htmlFor = "exampleInputPassword1" className = "block form-label text-xs pb-2 text-brand-300">Password</label>
                        <input type = "password" className = "form-control w-full border rounded-full  px-3 py-2" id = "exampleInputPassword1" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                    </div>
                    <div className="justify-center flex">
                        <div className = "d-grid ">
                        <button type = "submit" className = "text-white bg-gradient-to-br from-[#1b8f53]  via-[#4285f4] to-[#1b8f53] shadow-xl rounded-full px-10 py-2 btn btn-primary pt-3 pb-3" onClick = {(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-center my-4">
                        <div class="flex-grow border-t border-gray-300"></div>
                        <span class="px-4 text-sm text-gray-600">or</span>
                        <div class="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="flex justify-center pb-5">
                        <button onClick={signInWithGoogle} class="px-4 py-2 border shadow-md rounded-full bg-white flex gap-2 text-brand-300 hover:bg-brand-200 hover:text-gray-900 hover:shadow transition duration-150">
                            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <span ><Link className = "px-4 py-2 border shadow-md rounded-full bg-white flex gap-2 text-brand-300 hover:bg-brand-200 hover:text-gray-900 hover:shadow transition duration-150" to = "./signup">Need to sign up for an account? </Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login