import { useAuth } from '../store/auth'
import './About.css'
import {ToastContainer,toast} from 'react-toastify'
export const About=()=>{

    const notify=()=>{
        toast.success("A Toast!")
        return (
            <div>
                <button onClick={notify}>Notify</button>
                <ToastContainer/>
             </div> 
        )
    }

    const {_user}=useAuth()
    return<>
        <div className="about">
            <h1>Hi {_user.username}! </h1>
            <ToastContainer/>
        </div>
    </>
}