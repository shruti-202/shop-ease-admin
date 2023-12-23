import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Signup from './components/pages/Signup'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import DashboardLayout from './layout/DashboardLayout'
import NotFound from './components/pages/404'
import { getCookie } from './utils/getCookie'
import Banners from './components/pages/Banners'
import Products from './components/pages/Products'
import AddBanner from './components/pages/AddBanner'

export default function AppRoutes() {
  return (
    getCookie('token')?
   <Routes>
     <Route path="/signup" element={<Navigate to ="/dashboard"/>}/>
     <Route path="/login" element={<Navigate to ="/dashboard"/>}/>
     <Route path="*" element={<NotFound/>} />
     <Route path="/" element={<DashboardLayout/>}>
     <Route index element={<Navigate to ="/dashboard"/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/banners" element={<Banners/>}/>
     <Route path="/products" element={<Products/>}/>
     <Route path="/add-banner" element={<AddBanner/>}/>
    </Route>
    </Routes>
    :
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="*" element={<NotFound/>} />
     <Route path="/" element={<DashboardLayout/>}>
     <Route index element={<Navigate to ="/signup"/>}/>
     <Route path="/dashboard" element={<Login/>}/>
     <Route path="/banners" element={<Login/>}/>
     <Route path="/products" element={<Login/>}/>
     <Route path="/add-banner" element={<Login/>}/>
    </Route>

   </Routes>
  )
}
