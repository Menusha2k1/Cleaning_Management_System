import React from 'react'
import { WiStars } from "react-icons/wi";


const navBar = () => {
    return (
        <div className='bg-white flex items-center justify-between px-3 py-4 drop-shadow fixed top-0 right-0 left-0 z-1 pl-20 pr-20'>
            <div className='text-4xl font-medium text-green-800 py-2 drop-shadow flex'>
                <h1>Cleanify</h1><WiStars />

            </div>
            <div className='md:flex items-center space-x-8 '>
                <ul className='flex space-x-8 text-xl'>
                    <li className='hover:text-green-700 hover:border-b-2'>Home</li>
                    <li className='hover:text-green-700 hover:border-b-2'>Services</li>
                    <li className='hover:text-green-700 hover:border-b-2'>My Bookings</li>
                </ul>
            </div>
            <button className='bg-green-700 rounded-2xl text-white px-5 py-2 te'>Login</button>
        </div>

    )
}

export default navBar
