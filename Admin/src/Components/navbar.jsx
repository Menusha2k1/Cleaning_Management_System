import React, { useState } from 'react'
import { WiStars } from "react-icons/wi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const navbar = () => {
    const [Clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const toggleLogout = () => {
        setClicked(prev => !prev);
    }

    const Logout = () => {
        localStorage.removeItem('token');
        setClicked(false); 
        navigate('/login');
    }


    return (
        <div className='bg-white flex items-center justify-between px-3 py-4 drop-shadow fixed top-0 right-0 left-0 z-1 pl-20 pr-20'>
            <div className='text-4xl font-medium text-green-800 py-2 drop-shadow flex'>
                <h1>Cleanify</h1><WiStars />
                <p className='text-xl mt-2'>Admin Panel</p>
            </div>
       
 

                <div className='flex'>
                    
                    <FaUserCircle
                        size={40}
                        className='cursor-pointer'
                        onClick={toggleLogout}
                    />

                </div>
        

        </div>

    )
}

export default navbar
