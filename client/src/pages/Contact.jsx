import { useState } from 'react'
import './Contact.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
export const Contact=()=>{
    const [user,setUser]=useState({
        username:'',
        email:'',
        message:''
    })

    const [userdata,setUserData]=useState(true)

    const {_user}=useAuth()

    if(userdata && _user){
        setUser({username:_user.username,email:_user.email,message:""})
        setUserData(false)
    }

    const handle=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        console.log(user)
    }
    const submit=async(e)=>{
        e.preventDefault()
        console.log(user)

        const res=await fetch('http://localhost:200/api/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        console.log(res)
        if(!res.ok){
            toast.error("Message length must be at least 10 characters long")
        }
        if(res.status==200){
            toast.success("Successfully Submitted")
            setUser({message:""})
        }

    }
    return<>
        <div className="contact">
            <div className="form">
                <div className="inputs">
                    <label htmlFor="username">Username</label>
                    <input value={user.username} onChange={handle} type="text" placeholder='enter username' name='username' />
                    <label htmlFor="email">Email</label>
                    <input value={user.email} onChange={handle} type="text" placeholder='enter email' name='email' />
                    <label htmlFor="password">Message</label>
                    <textarea value={user.message} onChange={handle} type="textbox" placeholder='message...' name='message' />
                    <button onClick={submit}>Send</button>
                </div>
            </div>
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9988.733618954595!2d73.69620980727755!3d18.58697612450601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb726a3cb965%3A0xdf2bf7ab2ac426b2!2sTECH%20MAHINDRA%2C%20Phase%203%2C%20Hinjawadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411057!5e1!3m2!1sen!2sin!4v1728322528326!5m2!1sen!2sin" width="600" height="450"   loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>  
    </>
}