import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { AppLayout } from './Applayout'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Logout } from './pages/Logout'
import { Admin } from './layouts/Admin'
import { Adminusers } from './pages/Adminusers'
import { Admincontacts } from './pages/Admincontacts'
import { Adminupdate } from './pages/Adminupdate'

function App() {
  const router=createBrowserRouter([{
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
       path:"/signup",
       element:<Signup/> 
      },
      {
        path:"/logout",
        element:<Logout/>
      },
    ]
  },
  {
    path:"/admin",
    element:<Admin/>,
    children:[
      {
        path:"/admin/users",
        element:<Adminusers/>
      },
      {
        path:"/admin/contacts",
        element:<Admincontacts/>
      },
      {
        path:"/admin/users/:id",
        element:<Adminupdate/>
      }
    ]
  }
])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
