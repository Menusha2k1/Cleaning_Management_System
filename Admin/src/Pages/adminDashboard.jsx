import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/booking/all`);
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id, newStatus) => {
        try {
            const ChangeStatus = window.confirm("Are you sure you want to change the Status ?");
            if(ChangeStatus){ 
                const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/booking/${id}/status`, 
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchBookings();}
            // refresh bookings after update
        } catch (error) {
            console.error(`Failed to update booking ${id} status:`, error);
        }
    };

    return (
        <div className="mt-8 p-4 px-40">
            <div className="text-center mt-20 text-4xl mb-8 font-bold">
                <h1>Bookings</h1>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center mt-60">No bookings found</div>
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-green-200 relative rounded-lg p-6 shadow-2xl">
                            <label htmlFor="customer name">Customer:</label>
                            <p className="text-3xl font-semibold">{booking.customer_name}</p>
                            <hr />
                            <label htmlFor="customer name">Address:</label>
                            <p className="text-3xl font-semibold">Address: {booking.address}</p>
                            <hr />
                            <label htmlFor="customer name">Service:</label>
                            <p className="text-3xl font-semibold">Service: {booking.service_id?.name || 'No service'}</p>
                            <hr />
                            <p className="text-3xl font-semibold mt-6">Date: {new Date(booking.date_time).toLocaleDateString()}</p>
                            <p className="text-3xl font-semibold">Time: {new Date(booking.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className={`mt-2 text-xl font-medium ${
                                booking.status === 'confirmed' ? 'text-green-600' :
                                booking.status === 'pending' ? 'text-yellow-600' :
                                booking.status === 'completed' ? 'text-blue-600' :
                                booking.status === 'cancelled' ? 'text-red-600' :
                                'text-gray-600'
                            }`}>
                                Status: {booking.status}
                            </p>

                            <div className="flex space-x-4 mt-5">
                                <button
                                    className='p-3 bg-yellow-700 rounded text-white'
                                    onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                >
                                    Confirm
                                </button>
                                <button
                                    className='p-3 bg-green-700 rounded text-white'
                                    onClick={() => updateBookingStatus(booking._id, 'completed')}
                                >
                                    Mark as Completed
                                </button>
                                <button
                                    className='p-3 bg-red-700 rounded text-white'
                                    onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
