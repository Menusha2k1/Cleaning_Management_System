import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [message, setMessage] = useState('');

    const userId = localStorage.getItem('id');

    // Fetch available services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/service/all');
                setServices(res.data.services);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            customer_name: customerName,
            address,
            date_time: dateTime,
            service_id: selectedService,
            user_id: userId 
        };
       console.log(userId);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:8000/api/booking/create', bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Booking successful!');
        } catch (error) {
            console.error('Booking failed:', error);
            const errMsg = error.response?.data?.message || 'Booking failed. Please try again.';
            setMessage(errMsg);
        }
    };

    return (
        <div className='flex space-x-0 p-20 '>
        
             <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-40">
            <h2 className="text-3xl font-bold mb-8">Book a Service</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                />

                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                />

                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                />
          

                <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-400 rounded-2xl outline-0"
                >
                    <option value="">Select a Service</option>
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
                    Submit Booking
                </button>

                {message && <p className="text-center mt-3 text-sm text-blue-600">{message}</p>}
            </form>
        </div>
        </div>
       
    );
};

export default BookingForm;
