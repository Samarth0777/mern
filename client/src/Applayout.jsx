import { Outlet } from "react-router-dom"
import { Header } from "./layouts/Header"
import { Footer } from "./layouts/Footer"

export const AppLayout=()=>{
    return<>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}