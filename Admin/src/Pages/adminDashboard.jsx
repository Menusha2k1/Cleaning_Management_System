import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [filterDate, setFilterDate] = useState('');
    const [filterService, setFilterService] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

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
            const ChangeStatus = window.confirm("Are you sure you want to change the Status?");
            if (ChangeStatus) {
                const token = localStorage.getItem('token');
                await axios.put(
                    `http://localhost:8000/api/booking/${id}/status`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                fetchBookings(); // Refresh bookings after update
            }
        } catch (error) {
            console.error(`Failed to update booking ${id} status:`, error);
        }
    };

    // Filter logic
    const filteredBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date_time).toISOString().split('T')[0];
        const matchesDate = !filterDate || bookingDate === filterDate;
        const matchesService = !filterService || booking.service_id?.name?.toLowerCase().includes(filterService.toLowerCase());
        const matchesLocation = !filterLocation || booking.address?.toLowerCase().includes(filterLocation.toLowerCase());

        return matchesDate && matchesService && matchesLocation;
    });

    return (
        <div className="mt-8 p-4 px-40">
            <div className="text-center mt-20 text-4xl mb-8 font-bold">
                <h1>Bookings</h1>
            </div>

            {/* Filters */}
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-8 items-center justify-center">
                <div>
                    <label className="block mb-1 text-gray-700">Date</label>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="px-4 py-2 border rounded shadow-md"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700">Service Type</label>
                    <input
                        type="text"
                        placeholder="e.g. Cleaning"
                        value={filterService}
                        onChange={(e) => setFilterService(e.target.value)}
                        className="px-4 py-2 border rounded shadow-md"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700">Location</label>
                    <input
                        type="text"
                        placeholder="e.g. Colombo"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="px-4 py-2 border rounded shadow-md"
                    />
                </div>
                <div>
                    <button
                        onClick={() => {
                            setFilterDate('');
                            setFilterService('');
                            setFilterLocation('');
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow-md"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Bookings Display */}
            {loading ? (
                <div className="text-center mt-60">Loading...</div>
            ) : error ? (
                <div className="text-center mt-60 text-red-500">{error}</div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center mt-60">No bookings found</div>
            ) : (
                <div className="grid gap-4 lg:grid-cols-3">
                    {filteredBookings.map((booking) => (
                        <div key={booking._id} className="bg-green-200 relative rounded-lg p-6 shadow-2xl">
                            <label htmlFor="customer name">Customer:</label>
                            <p className="text-3xl font-semibold">{booking.customer_name}</p>
                            <hr />
                            <label>Address:</label>
                            <p className="text-xl mb-1">{booking.address}</p>
                            <label>Service:</label>
                            <p className="text-xl mb-1">{booking.service_id?.name || 'No service'}</p>
                            <p className="text-xl mb-1">Date: {new Date(booking.date_time).toLocaleDateString()}</p>
                            <p className="text-xl mb-1">Time: {new Date(booking.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
