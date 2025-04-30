import React, { useState } from 'react'
import { WiStars } from "react-icons/wi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const navBar = () => {
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
        navigate('/');
    }


    return (
        <div className='bg-white flex items-center justify-between px-3 py-4 drop-shadow fixed top-0 right-0 left-0 z-1 pl-20 pr-20'>
            <div className='text-4xl font-medium text-green-800 py-2 drop-shadow flex'>
                <h1>Cleanify</h1><WiStars />

            </div>
            <div className='md:flex items-center space-x-8 '>
                <ul className='flex space-x-8 text-xl'>
                    <li className='hover:text-green-700 hover:border-b-2'>Home</li>
                    <li className='hover:text-green-700 hover:border-b-2'>Services</li>
                    {isAuthenticated && (
                        <Link to="/mybookings">
                            <li className='hover:text-green-700 hover:border-b-2'>My Bookings</li>
                        </Link>
                    )}

                </ul>
            </div>
            {!isAuthenticated ?
                <button
                    onClick={() => navigate('/')}
                    className='bg-green-700 rounded-2xl text-white px-5 py-2 hover:opacity-44'>
                    Login
                </button>

                :

                <div className='flex'>
                    <p className='p-2 '>Welcome, {username}!</p>
                    <FaUserCircle
                        size={40}
                        className='cursor-pointer'
                        onClick={toggleLogout}
                    />

                </div>
            }
            {Clicked &&
                <div className='absolute  right-0 mt-50 mr-10 bg-white p-10 rounded-2xl drop-shadow-2xl'>
                    <button
                        className='relative bg-green-700 p-3 rounded-2xl text-white hover:opacity-44'
                        onClick={Logout}
                    >Logout
                    </button>
                </div>}

        </div>

    )
}

export default navBar
