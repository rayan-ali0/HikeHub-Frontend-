import { createContext, useState, useEffect } from "react";
import axios from "axios"
import axiosInstance from '../Utils/AxiosInstance'
export const UserContext= createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState();
    const [checkUser, setCheckUser] = useState(true);
    const [userUpdated, setUserUpdated]= useState(false)

    useEffect(()=>{
        if (!user || userUpdated) {
            fetchUserData();
          }
          console.log("userrrrrrrrrrrrr",user)
    },[user, userUpdated])

    const fetchUserData= async () => {
        setCheckUser(true)
        try {
            setCheckUser(true)
            const response = await axiosInstance.get(`user/read/logged`)
            // console.log(response.data.user)
            setUser(response.data.user)
            setUserUpdated(false)
        } catch (error) {
            setUser(null);
            console.log(error);
        }
        finally{
            setCheckUser(false)
        }
    }

    return (
        <UserContext.Provider value={{user, setUser,fetchUserData, checkUser}}>
            {children}
        </UserContext.Provider>
    )
}