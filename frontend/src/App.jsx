import { useState } from 'react'
import NavBar from './Components/navBar'
import Login from './Pages/Login'
import Register from './Pages/register'
import Bookings from './Pages/Bookings'
import AddBooking from './Pages/addBooking'
import EditBooking from './Pages/editBooking'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {


  return (

    <div>
      
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/mybookings" exact element={<Bookings />} />
          <Route path="/add" exact element={<AddBooking />} />
          <Route path="/edit/:id" exact element={<EditBooking />} />
        </Routes>
      </Router>
    </div>


  )
}

export default App
