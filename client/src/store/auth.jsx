import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext=createContext()

export const Authprovider=({children})=>{

    const [Token,setToken]=useState(localStorage.getItem("token"))
    const [_user,setUser]=useState({
        username:"Guest",
        email:"",
        
    })

    const logoutuser=()=>{
        setToken("")
        // setUser()
        // toast.success("Logged Out!")
        return localStorage.removeItem("token")
    }

    let isLoggedIn=!!Token

    const storetoken=(token)=>{
        setToken(token)
        return localStorage.setItem("token",token)
    }

    const authentication=async()=>{
        try {
            // console.log("token "+Token)
            const res=await fetch('http://localhost:200/api/auth/user',{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${Token}`
                }
            })
            if(res.ok){
                const data=await res.json()
                console.log("login data "+JSON.stringify(data.userdata))
                setUser(data.userdata)
                console.log("Login "+_user)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        authentication();
    },[])

    return <AuthContext.Provider value={{storetoken,logoutuser,isLoggedIn,_user}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext)
}