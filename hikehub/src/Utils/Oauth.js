import style from "./Oauth.module.css";
// import googleIcon from "../assets/icons/google.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app  from './Firebase';
import {toast} from "react-toastify"
import {  useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from '../Context/UserContext';
import googleIcon from '../assets/icons/google-removebg-preview.png'
import axiosInstance from "./AxiosInstance";


export default function OAuth({ signup }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);


  const handleGoogleButton = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
  
      if (!result) {
        console.error("Google authentication result is undefined");
        return;
      }
        const data = await axiosInstance.post(`google`, {
          name: result.user.displayName.split(" ")[0],
          email: result.user.email,
          phone:result.user.phoneNumber
          },
          {withCredentials:true}
          );
        if (data.data ) {
          setUser(data.data)
          toast.success(`Hello ${data.data.data.name}!!`);
          navigate("/", { replace: true });


        } else {
          toast.error("Can't continue with Googleee",);
        }
      
    } catch (error) {
      toast.error("error loggimnn", error.message)
      console.error("Error during Google authentication:", error);
    }
  };
  
  

  return (
    <div className={style.googleButton} onClick={handleGoogleButton}>
      <img
        src={googleIcon}
        alt="Google Icon"
        className={style.googleIcon}
      />
      {/* <p className={style.slogan}>{signup ? "Signup" : "Login"} with Google</p> */}
    </div>
  )
}