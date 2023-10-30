import React from 'react'
import VendorDashboard from '../Vendor'
import { Route, Routes } from 'react-router'
import User from '../User'
import { UserProfile } from '../components/UserProfile'
import Home from '../components/Home'

export const Allroutes = () => {
  return (
    <Routes>
        <Route path='/vendor' element={<VendorDashboard />} />
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/user/profile' element={<UserProfile />} />
    </Routes>
  )
}
