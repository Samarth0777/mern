import { Navbar } from "@material-tailwind/react"
import "./Header.css"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"

export const Header=()=>{
    const {isLoggedIn,_user,logoutuser,storetoken}=useAuth()
    const navigate=useNavigate()
    const user={
        username:"Samarth",
        password:"Samarth@7"
    }

    let __cnt=0
    let f_clk=0

    const __prfmgk=async()=>{
        const c_time=new Date().getTime()

        if(__cnt===0)
            f_clk=c_time

        __cnt++

        if(c_time-f_clk>3000){
            __cnt=1
            f_clk=c_time
        }

        if(__cnt===7){
            console.log("Magic Happened!")
            __cnt=0

            if(isLoggedIn){
                logoutuser()
            }

            const res=await fetch('http://localhost:200/api/auth/login',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user)
            })
            // console.log(await res.json())
            if(res.status===200){
                const data=await res.json()
                // alert("Logged In!")
                toast.success("Logged In")
                storetoken(data.token)
                console.log(data)
                // localStorage.setItem("token",data.token)
                navigate('/home')
                toast.success("Magic Happened!")
            }
        }
    }


    return <>
        <Navbar onClick={__prfmgk} className="navbar">
            <div>
                <h3>TEST</h3>
            </div>
            <div className="routes">
                <NavLink className="navlink" to="/home">HOME</NavLink>
                <NavLink className="navlink" to="/contact">CONTACT</NavLink>
                <NavLink className="navlink" to="/about">ABOUT</NavLink>
                {isLoggedIn? (<NavLink className="navlink" to="/logout">LOGOUT</NavLink>):
                    <>
                        <NavLink className="navlink" to="/login">LOGIN</NavLink>
                        <NavLink className="navlink" to="/signup">SIGNUP</NavLink>
                    </>
                }
                {_user.isAdmin==="true"?(<NavLink className="navlink" to="/admin">ADMIN PANEL</NavLink>):
                ""}
                
                
            </div>
        </Navbar>
    </>
}