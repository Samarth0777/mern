import { useEffect, useState } from "react"
import "./Admincontacts.css"
import { toast } from "react-toastify"
export const Admincontacts=()=>{
    const token=localStorage.getItem("token")
    const [contacts,setContacts]=useState([])
    const getallcontacts=async()=>{
        const res=await fetch("http://localhost:200/api/admin/contacts",{
            method:"GET",
            headers:{
            Authorization:token
            }
        })
        const data=await res.json()
        setContacts(data)
        console.log("all contacts "+await JSON.stringify(res))
        
    }

    const del=async(message)=>{
        const res=await fetch(`http://localhost:200/api/admin/contacts/delete/${message}`,{
            method:"DELETE",
            headers:{
                Authorization:token
            }
        })
        const data=await res.json()
        console.log(JSON.stringify(data))
        toast.success("Contact deleted successfully")
        getallcontacts()
    }
    
    useEffect(()=>{
        getallcontacts();
    },[])
    return<>
        <div className="contacts">
        <h1>Admin Contacts</h1>
        {contacts.map((i,index)=>{
            return <>
            <div className="admincontact" key={index}>
                <label htmlFor="username">Username:</label>
                <h2>{i.username}</h2>
                <label htmlFor="message">Message:</label>
                <h2>{i.message}</h2>
                <button onClick={()=>{del(i.message)}}>Delete</button>
            </div>
            </>
        })}
        </div>
    </>
}