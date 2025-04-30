import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditBooking = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        address: '',
        dateTime: '',
        serviceId: ''
    });
    const [services, setServices] = useState([]);
    const [booking, setBooking] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const userId = localStorage.getItem('id');

    // Fetch booking data and services
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch services
                const servicesRes = await axios.get('http://localhost:8000/api/service/all');
                setServices(servicesRes.data.services);

                // Fetch booking
                const bookingRes = await axios.get(`http://localhost:8000/api/booking/${id}`);
                const bookingData = bookingRes.data.bookings[0]; // Assuming single booking
                setBooking(bookingData);
                
                // Pre-fill form
                setFormData({
                    customerName: bookingData.customer_name || '',
                    address: bookingData.address || '',
                    dateTime: bookingData.date_time ? new Date(bookingData.date_time).toISOString().slice(0, 16) : '',
                    serviceId: bookingData.service_id?._id || ''
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const bookingData = {
            customer_name: formData.customerName,
            address: formData.address,
            date_time: formData.dateTime,
            service_id: formData.serviceId,
            user_id: userId
        };

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/booking/update/${id}`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Booking updated successfully!');
        } catch (error) {
            console.error('Update failed:', error);
            setMessage(error.response?.data?.message || 'Update failed. Please try again.');
        }
    };

    if (!booking) return <div>Loading...</div>;

    return (
        <div className='flex space-x-0 p-20'>
            <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-40">
                <h2 className="text-3xl font-bold mb-8">Edit Booking</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                    />
                    
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                    />

                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                    />

                    <select
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                    >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white p-3 rounded-2xl hover:bg-green-700"
                    >
                        Update Booking
                    </button>

                    {message && (
                        <p className={`text-center mt-3 text-sm ${
                            message.includes('success') ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditBooking;