import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../../utility/BackButton";

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    return(
        <div className = "container">
            <div className = "row justify-content-center">
                <div className = "flex-col items-center justify-center">
                    <p className="flex">Hi <p className = "ml-[0.3rem]">{ currentUser.displayName }</p>! You are logged in!</p>
                    <div className = "flex justify-center mt-5">
                        <button type = "submit" className = "bg-blue-300 px-4 py-2 border shadow-md rounded-full flex gap-2 text-black hover:bg-brand-200 hover:text-gray-900 hover:shadow transition duration-150" onClick = {(e) => logoutUser(e)}>Logout</button>
                    </div>
                    <div className="flex justify-center pt-3">
                    <   BackButton /> 
                    </div>               
                </div>
            </div>
        </div>       
    )    
}

export default Profile