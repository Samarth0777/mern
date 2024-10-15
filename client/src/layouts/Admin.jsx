import { Navigate, NavLink, Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Adminusers } from "../pages/Adminusers"
import { Navbar } from "@material-tailwind/react"
import { useAuth } from "../store/auth"

export const Admin=()=>{

    const {_user}=useAuth()
    if(_user.isAdmin==='false')
        return <Navigate to="/" />
    return <>
        <Navbar className="navbar">
            <div>
                <h3>ADMIN PANEL</h3>
            </div>
            <div className="routes">
                <NavLink className="navlink" to="/admin/users">USERS</NavLink>
                <NavLink className="navlink" to="/admin/contacts">CONTACTS</NavLink>
            </div>
        </Navbar>
        <Outlet/>
    </>
}