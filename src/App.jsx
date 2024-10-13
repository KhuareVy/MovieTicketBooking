import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout'
import Home from './pages/Home'
import NowShowingMovie from './pages/NowShowingMovie';
import UpcomingMovie from './pages/UpComingMovie';
import Login from './testComponents/Login';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} /> 
          <Route path="/phim-dang-chieu" element={<NowShowingMovie />} />
          <Route path="/phim-sap-chieu" element={<UpcomingMovie />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="*" element={<h1>Not Found</h1>} />
      </Route>



      </Routes>


       {/* <Routes> */}
          {/* <Route path="/" element={<UserLayout />}>
            <Route index element={<UserLayout />} /> */}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/currentMovies" element={<CurrentMoviePage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/success" element={<BookingSuccessPage/>} />
            <Route path="bookingHistory" element={<BookingHistoryPage/>} /> */}
            {/* <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes> */}
    </Router>
  )
}

export default App