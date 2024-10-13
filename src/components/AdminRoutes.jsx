// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Route, Routes} from 'react-router-dom'
import UserManagement from './UserManagement'
import MovieManagement from './MovieManagement'
import ScheduleManagement from './ScheduleManagement'
import AdminDashboard from './AdminDashboard'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard/>} />
      <Route path="/users" element={<UserManagement/>} />
      <Route path="/movies" element={<MovieManagement/>} />
      <Route path="/schedule" element={<ScheduleManagement/>} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default AdminRoutes