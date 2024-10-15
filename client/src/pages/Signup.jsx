import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

export const Signup=()=>{
    const [user,setUser]=useState({
        username:'',
        email:'',
        password:''
    })

    const {storetoken}=useAuth()
    const navigate=useNavigate();
    const handle=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        console.log(user)
    }
    const submit=async(e)=>{
        e.preventDefault()
        const res=await fetch('http://localhost:200/api/auth/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        if(res.status===200){
            storetoken(await res.json().token)
            toast.success("Successfully Registered!")
            navigate('/home')
        }
        if(res.status==400){
            toast.error("Either Username or Email is already Registered!")
            console.log(await res.json())
        }
    }
    return <>
        <div className="signup">
            <div className="form">
                <div className="inputs">
                    <label htmlFor="username">Username</label>
                    <input value={user.username} onChange={handle} type="text" placeholder='enter username' name='username' />
                    <label htmlFor="email">Email</label>
                    <input value={user.email} onChange={handle} type="text" placeholder='enter email' name='email' />
                    <label htmlFor="password">Password</label>
                    <input value={user.password} onChange={handle} type="password" placeholder='enter password' name='password' /> 
                    <button onClick={submit}>Register</button>
                </div>
            </div>
        </div>  
    </>
}