// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout'
import Home from './pages/Home'
import NowShowingMovie from './pages/NowShowingMovie';
import UpcomingMovie from './pages/UpComingMovie';
import Login from './testComponents/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import MovieManagement from './components/MovieManagement';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} /> 
            <Route path="/phim-dang-chieu" element={<NowShowingMovie />} />
            <Route path="/phim-sap-chieu" element={<UpcomingMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<MovieManagement />} />
          <Route path="*" element={<h1>Admin Not Found</h1>} />
        </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App