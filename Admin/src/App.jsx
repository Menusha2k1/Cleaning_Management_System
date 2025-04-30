import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from './Pages/adminDashboard'
import NavBar from './Components/navbar';

function App() {

  return (

    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Admin />} />

        </Routes>
      </Router>

    </div>


  )
}

export default App
