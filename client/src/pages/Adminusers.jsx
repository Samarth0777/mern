import { useEffect, useState } from "react"
import "./Adminusers.css"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export const Adminusers=()=>{
    const authtoken=localStorage.getItem("token")
    const [user,setUser]=useState([])
    const getallusers=async()=>{
        try {
            const res=await fetch("http://localhost:200/api/admin/users",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${authtoken}`
                }
            })
            const data=await res.json()
            setUser(data)
            console.log("users token"+ data)

        } catch (error) {
            console.log(error)
        }
}
    useEffect(()=>{
        getallusers()
    },[])

    const del=async(username,admin)=>{
        if(admin==="true"){
            toast.error("Cannot Delete an Admin")
            console.log("Cannot Delete an Admin")
            return;
        }
        
        console.log(username)
        const res=await fetch(`http://localhost:200/api/admin/users/delete/:${username}`,{
            method:"DELETE",
            headers:{
                Authorization:authtoken
            }
        })
        const data=await res.json()
        console.log(data)
        getallusers()
        toast.success("User Deleted Successfully")
    }

    return<>
        <div className="admin">
        <h1>All Users</h1>
        <div className="users">
            <div className="heading">
                <h2>Name</h2>
                <h2>email</h2>
                <h2>isAdmin</h2>
                <h2>Update</h2>
                <h2>Delete</h2>
            </div>
            {user.map((i,index)=>{
                return <div className="user" key={i.username}>
                    {/* <div className="name">
                        <h2>{i.username}</h2>
                    </div>
                    <div className="email">
                        <h2>{i.email}</h2>
                    </div>
                    <div className="admin">
                        <h2>{i.isAdmin}</h2>
                    </div>
                    <div className="edit">
                        <button>Edit</button>
                    </div>
                    <div className="delete">
                    <button onClick={del} >Delete</button>
                    </div> */}
                    <h2>{i.username}</h2>
                    <h2>{i.email}</h2>
                    <h2>{i.isAdmin}</h2>
                    <Link to={`/admin/users/${i._id}`} ><button>Edit</button></Link>
                    <button onClick={()=>{del(i.username,i.isAdmin)}}>Delete</button>
                </div>
            })}
        </div>
        </div>
    </>
}