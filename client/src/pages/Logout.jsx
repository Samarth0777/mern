import { useEffect } from 'react'
import './Logout.css'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const Logout=()=>{
    const {logoutuser}=useAuth()
    useEffect(()=>{
        logoutuser();
    },[logoutuser])
    return<>
        {/* <div className="logout">
            <h1>Logout Page</h1>
        </div> */}
        <Navigate to="/login"></Navigate>
    </>
}