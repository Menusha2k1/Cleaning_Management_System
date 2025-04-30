import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';




const Bookings = () => {
    const userId = localStorage.getItem('id');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        if (!userId) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }
        const fetchBookings = async () =>{
            axios.get(`http://localhost:8000/api/booking/booking/${userId}`)
            .then(response => {
                // Make sure we're using the bookings array from the response
                setBookings(response.data.bookings);
            })
             .catch(error => {
                console.error('Error fetching bookings:', error);
                setError('Failed to load bookings');
            })
            .finally(() => {
                setLoading(false);
                
            });  
        };

        fetchBookings();
           
    }, [userId]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Booking?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8000/api/booking/booking/${id}`)
                .then(res => {
                    console.log(res);                   
                })
                .catch(err => console.error(err));
        }
    };

    if (loading) return <div className="text-center mt-30">Loading bookings...</div>;
    if (error) return <div className="text-center mt-30 text-red-500">{error}</div>;



    return (
        <div className="mt-8 p-4 px-40">
            <div className="text-center mt-20 text-4xl mb-8 font-bold">
                <h1>My Bookings</h1>
            </div>

            <div>
                <Link to={'/add'}>
                    <button className='absolute bg-green-700 p-6 text-white rounded-full right-20 bottom-20 drop-shadow-2xl hover:p-7'>
                        <FaPlus
                            size={30} />

                    </button>
                </Link>
            </div>
            {bookings.length === 0 ? <div className="text-center mt-60">No bookings found</div> :

                <div className="grid gap-4  lg:grid-cols-4 ">


                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-green-200 relative rounded-lg p-6 shadow-2xl hover:shadow-lg dropshadow-2xl">


                            <p className="text-balck text-3xl mb-1 font-semibold">
                                {booking.service_id?.name || 'No service specified'}

                            </p>
                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Date:</span>
                                {new Date(booking.date_time).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Time:</span>
                                {new Date(booking.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className={`mt-2 font-medium ${booking.status === 'confirmed' ? 'text-green-600' :
                                booking.status === 'pending' ? 'text-yellow-600' :
                                    'text-gray-600'
                                }`}>
                                Status: {booking.status}
                            </p>

                            <div className='flex space-x-2 mt-5'>
                                <MdEditSquare
                                className='text-green-700'
                                    size={30}
                                    onClick={() => navigate(`/edit/${booking._id}`)} />
                                <MdDelete
                                className='text-red-800'
                                    size={30}
                                    onClick={() => handleDelete(booking._id)} />

                            </div>


                        </div>

                    ))}
                </div>}

        </div>
    );
};

export default Bookings;