import { createContext, useState, useEffect } from "react";
import axios from "axios"
import axiosInstance from '../Utils/AxiosInstance'
export const LayoutContext= createContext();

export const LayoutProvider = ({children})=>{
    const [open, setOpen] = useState(false);

    return (
        <LayoutContext.Provider value={{open,setOpen}}>
            {children}
        </LayoutContext.Provider>
    )
}