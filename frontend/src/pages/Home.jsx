import React from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import Condidate from '../components/Condidate'
import Employees from '../components/Employees'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/usercontext'

function Home() {
    
  return (
    <div className='flex w-full'>
        <SideBar/>
        <div className='w-full'>
            <TopBar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home