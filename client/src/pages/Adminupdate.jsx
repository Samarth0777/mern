import { useParams } from "react-router-dom"
import "./Adminupdate.css"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
export const Adminupdate=()=>{
    const {id}=useParams()
    const [user,setUser]=useState({
        // _id:{id},
        // username:"",
        // email:"",
        // isAdmin:""
    })
    const token=localStorage.getItem("token")
    // console.log(id)

    const handle=async()=>{

        if(user.isAdmin==="true" || user.isAdmin==="false"){

        

        const res=await fetch(`http://localhost:200/api/admin/users/update/:${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:token
            },
            // body:{
            //     "_id":user._id, 
            //     "username":user.username,
            //     "email":user.email,
            //     "isAdmin":user.isAdmin
            // }
            body:JSON.stringify(user)
        })
        const data=await res.json()
        console.log(JSON.stringify(data))
    }
    else{
        toast.error("Not a valid isAdmin type: "+"isAdmin must be either true or false")
    }
    }

    const handleinput=(e)=>{
        let name=e.target.name
        let value=e.target.value
        

        setUser({
            ...user,
            [name]:value
        })
    }

    const fetchdetails=async()=>{
        const res=await fetch(`http://localhost:200/api/admin/users/${id}`,{
            method:"GET",
            headers:{
            Authorization:token,
            }
        })
        const data=await res.json()
        setUser(data)
        console.log("data from admin update "+JSON.stringify(data))
    }

    useEffect(()=>{
        fetchdetails()
    },[])
    return<>
        <div className="update">
            <h1>Admin Update</h1>
            <div className="updateform">
                <label htmlFor="username">Username</label>
                <input onChange={handleinput} type="text" name="username" placeholder="Enter Username" value={user.username} />
                <label htmlFor="username">Email</label>
                <input onChange={handleinput} type="text" name="email" placeholder="email" value={user.email} />
                <label htmlFor="username">isAdmin</label>
                <input onChange={handleinput} type="text" name="isAdmin" placeholder="isAdmin" value={user.isAdmin} />
                <button onClick={handle}>Update</button>
            </div>
        </div>
    </>
}