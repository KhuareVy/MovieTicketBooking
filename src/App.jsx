// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout'
import Home from './pages/Home'
import UpcomingMovie from './pages/UpComingMovie';
import Login from './testComponents/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import MovieManagement from './components/MovieManagement';
import ScheduleManagement from './components/ScheduleManagement';
import UserManagement from './components/UserManagement';
import Registration from './testComponents/Registration';
import { AuthProvider } from './contextAPI/AuthContext';
import { RequiredAuth } from './utils/RequiredAuth';
import MovieWithShowtime from './components/MovieWithShowtime';
import MovieDetail from './components/MovieDetail';
import SeatSelection from './components/Booking';
import Cinemas from './components/Cinemas';
import BookingSuccess from './components/BookingSuccess';
import BookingHistory from './components/BookingHistory';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} /> 
              <Route path="phim-dang-chieu" element={<MovieWithShowtime />} />
              <Route path="phim-sap-chieu" element={<UpcomingMovie />} />
              <Route path="phim-dang-chieu/:id" element={<MovieDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration/>} />
              <Route path="dat-ve/:showtimeid/:movieid" element={<RequiredAuth>
                <SeatSelection/>
              </RequiredAuth>} />
              <Route path="dat-ve-thanh-cong" element={<BookingSuccess/>}/>
              <Route path="lich-su-dat-ve" element={<RequiredAuth>
                <BookingHistory/>
              </RequiredAuth>}/>
              <Route path="rap/:cinemaid" element={<Cinemas/>}/>
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<RequiredAuth>
                <AdminDashboard />
              </RequiredAuth>} />
              <Route path="movies" element={<RequiredAuth>
                <MovieManagement />
              </RequiredAuth>} />
              <Route path="schedule" element={<RequiredAuth>
                <ScheduleManagement />
              </RequiredAuth>} />
              <Route path="users" element={<RequiredAuth>
                <UserManagement/>
              </RequiredAuth>} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App