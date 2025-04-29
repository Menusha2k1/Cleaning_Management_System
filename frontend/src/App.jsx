import { useState } from 'react'
import NavBar from './Components/navBar'
import Login from './Pages/Login'
import Register from './Pages/register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {


  return (

    <div>
      
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>


  )
}

export default App
