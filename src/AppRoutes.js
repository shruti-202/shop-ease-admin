import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Signup from './components/pages/Signup'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import DashboardLayout from './layout/DashboardLayout'
import NotFound from './components/pages/404'
import { getCookie } from './utils/getCookie'

export default function AppRoutes() {
  return (
   <Routes>
     <Route path="*" element={<NotFound/>} />
     <Route path="/" element={<DashboardLayout/>}>
     <Route index element={getCookie('token') ? <Navigate to ="/dashboard"/>: <Navigate to ="/signup"/>}/>
     <Route path="/signup" element={getCookie('token')? <Navigate to ="/dashboard"/>: <Signup/>}/>
     <Route path="/login" element={getCookie('token') ? <Navigate to ="/dashboard"/>:  <Login/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
    </Route>
   </Routes>
  )
}
