import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout'

const App = () => {
  return (
    <Router>
       <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<UserLayout />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/currentMovies" element={<CurrentMoviePage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/success" element={<BookingSuccessPage/>} />
            <Route path="bookingHistory" element={<BookingHistoryPage/>} /> */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App