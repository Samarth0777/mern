import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/auth'
import './Signup.css'
import { toast } from 'react-toastify'
export const Login=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        username:'',
        password:'',
    })

    const {storetoken}=useAuth()

    const handle=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        console.log(user)
    }
    const submit=async(e)=>{
        e.preventDefault()
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
        }
        else{
            toast.error("Either Password or Email is Incorrect!")
        }
    } 
    return<>
        <div className="signup">
            <div className="form">
                <div className="inputs">
                    <label htmlFor="username">Username</label>
                    <input value={user.username} onChange={handle} type="text" placeholder='enter username' name='username' />
                    <label htmlFor="password">Password</label>
                    <input value={user.password} onChange={handle} type="password" placeholder='enter password' name='password' />
                    <button onClick={submit}>Login</button>
                </div>
            </div>
        </div>  
    </>
}